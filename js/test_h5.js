/*
* @Author: fjz
* @Date:   2018-08-06 18:58:10
* @Last Modified by:   fjz
* @Last Modified time: 2018-08-08 12:32:35
*/
var H5 = function () {
	this.id = ('h5_' + Math.random()).replace('.','_');
	this.el = $('<div class="h5" id="'+this.id+'">').hide();
	this.page = [];

	$('body').append(this.el);
	// 新增一个页
	this.addPage = function (name,text) {
		var page = $('<div class="h5_page section">');

		if (name != undefined) {
			page.addClass('h5_page_' + name)
		}
		if (text != undefined) {
			page.text(text)
		}
		this.el.append(page);
		this.page.push(page)
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
			case 'base':
				component = new componentBase(name,config);//将componentBase组件中的数据传递进来
			break;
		}
		page.append(component)

		return this;
	}
	this.loader = function(firstPage) {
		this.el.fullpage({
			onLeave: function(index, nextIndex, direction) {
			$(this).find('.h5_component').trigger('onLeave');
			},
			afterLoad: function(anchorLink, index) {
			$(this).find('.h5_component').trigger('onLoad');
			}
		})
		this.page[0].find('.h5_component').trigger('onLoad');
		this.el.show()
		if (firstPage) {
			$.fn.fullpage.moveTo(firstPage)
		}
	}
	return this;
}