/*
/*
* @Author: fjz
* @Date:   2018-08-06 16:46:58
* @Last Modified by:   fjz
* @Last Modified time: 2018-08-08 17:04:16
*/
// 这里主要规定了组件的元素、id、class、width、height、css以及组件的载入载出
var componentBase = function(name,config) {

	var config = config || {},
		id = ('h5_' + Math.random()).replace('.', '_'),//创建组件的唯一id值
		cls = 'h5_component_' + config.type + ' h5_component_name_' + name;//根据传递进来的name，创建组件的classname


	// 创建组件
	var component = $('<div class="h5_component '+ cls +'" id="' + id +'">');
	// 如果组件存在text则给该组件添加一个text
	config.text && component.text(config.text);
	// 如果组件传入时事先预定了宽高的值，则把该值赋予组件
	config.width && component.width(config.width/2);
	config.height && component.height(config.height/2);
	// css也与上面的内容一样
	config.css && component.css(config.css)
	// 将传入的背景图信息赋予css背景
	config.bg && component.css('backgroundImage', 'url('+ config.bg +')');

	// 如果组件传入了center参数，则将组件水平居中
	if (config.center === true) {
		component.css({
			// 这里之所以除以4是因为在高清屏幕上，一个元素是当做两个元素使用的

			marginLeft: (config.width/4 * -1) + 'px',
			left: '50%'
		})
	}

	// 如果传入了onclick参数，则在点击这个组件的时候出发传入时的事件
	// 这个事件其实只有最后一个页面的back组件才有用到
	// 这是用jquery的on事件实现的
	if (typeof config.onclick === 'function') {
		component.on('click',config.onclick)
	}


	// 这里的onload事件时自定义的
	// 也就是说需要靠this.onLeave事件去触发，而不能自动执行
	component.on('onLoad', function(){
		setTimeout(function() {

			// 组件被载入的时候给组件添加_load类并且同时移除_leave类
			component.addClass(' _load').removeClass(' _leave');

			// 组件被载入的时候触发组件的动画函数（这是用jquery的animate实现的）
			config.animateIn && component.animate(config.animateIn);

		},config.delay || 0)

		return false;
	});

	
	component.on('onLeave',function(){

		setTimeout( function () {

			component.addClass(' _leave').removeClass(' _load');

			config.animateOut && component.animate(config.animateOut);

		}, config.delay || 0)
		
		return false;
	});

	

	return component;
}