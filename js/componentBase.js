/*
* @Author: fjz
* @Date:   2018-08-06 16:46:58
* @Last Modified by:   fjz
* @Last Modified time: 2018-08-06 20:31:17
*/
var componentBase = function(name,config) {
	var config = config || {},
		id = ('h5_' + Math.random()).replace('.', '_'),
		cls = 'h5_component_' + config.type + ' h5_component_name_' + name;

	var component = $('<div class="h5_component '+ cls+'" id="' + id +'">');
	
	config.text && component.text(config.text);
	config.width && component.width(config.width/2);
	config.height && component.height(config.height/2);
	config.css && component.css(config.css)

	config.bg && component.css('backgroundImage', 'url('+ config.bg +')');

	if (config.center === true) {
		component.css({
			marginLeft: (config.width/4 * -1) + 'px',
			left: '50%'
		})
	}

	component.on('onLoad', function(){
		component.addClass(cls + ' _load').removeClass(' _leave');
		config.animateIn && component.animate(config.animateIn);

		return false;
	});
	component.on('onLeave',function(){
		component.addClass(cls + ' _leave').removeClass(' _load');
		config.animateOut && component.animate(config.animateOut);

		return false;
	});
	

	return component;
}