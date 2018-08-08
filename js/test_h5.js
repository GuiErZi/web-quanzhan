/*
* @Author: fjz
* @Date:   2018-08-06 18:58:10
* @Last Modified by:   fjz
* @Last Modified time: 2018-08-08 17:07:28
*/
var H5 = function () {

	//创建根部的包裹元素的id
	this.id = ('h5_' + Math.random()).replace('.','_');
	//创建根部的包裹元素
	this.el = $('<div class="h5" id="'+ this.id +'">').hide();


	this.page = [];

	//把包裹元素添加至body内
	$('body').append(this.el);

	// 新增一个页
	this.addPage = function (name,text) {

		// 创建这个页元素，并赋予其section类，以作用于fullpage
		var page = $('<div class="h5_page section">');

		//只有首页才出现了name，作用是为首页添加一个页面背景图片
		if (name != undefined) {
			page.addClass('h5_page_' + name)
		}

		// 所有页面都没有添加过这个text，但为了保险起见，
		// 事先在h5这里先把逻辑写出来
		if (text != undefined) {
			page.text(text)
		}

		// 把新增的页面添加至根部的包裹元素中
		this.el.append(page);

		// 然后把新增的页面存储进一个数组
		this.page.push(page)

		// 这里的作用：响应index.html中的添加footer。
		// 如果这个函数存在，则触发index.html中的whenAddPage()函数
		if (typeof this.whenAddPage === 'function') {
			this.whenAddPage()
		}
		return this;
	};

	//新增一个组件
	this.addComponent = function(name,config) {


		var config = config || {},
			component,
			page = this.page.slice(-1)[0];

			config = $.extend({
				type : 'base'
			}, config);

		switch(config.type) {
			// 判断传入的组件数据的类型，给对应的类型寻找对应的组件
			// 并且把组件所需要的name和config传递进来
			case 'base':
				component = new componentBase(name,config);//将componentBase组件中的数据传递进来
			break;
			case 'polyLine':
				component = new componentPolyLine(name, config);
			break;
			case 'line':
				component = new componentLine(name, config);
			break;
			case 'rader':
				component = new componentRader(name, config);
			break;
			case 'linev':
				component = new componentLine_v(name, config);
			break;
			case 'pie':
				component = new componentPie(name, config);
			break;
			case 'point':
				component = new componentPoint(name, config);
			break;
		}
		page.append(component)

		return this;
	}
	// 只要增加一个页面便可以触发这个事件
	this.loader = function(firstPage) {

		this.el.fullpage({
			// 页面滚动的时候触发组件的载入事件
			// 也就是说包裹根元素载入的时候，组件同时跟着载入，所以需要触发载入事件
			onLeave: function(index, nextIndex, direction) { //页面消失
			$(this).find('.h5_component').trigger('onLeave');
			},

			afterLoad: function(anchorLink, index) { // 页面载入
			$(this).find('.h5_component').trigger('onLoad');
			}
		})

		// 页面刷新的时候自动载入组件
		this.page[0].find('.h5_component').trigger('onLoad');

		// 将根元素显示
		this.el.show()

		if (firstPage) {
			$.fn.fullpage.moveTo(firstPage)
		}
	}
	return this;
}