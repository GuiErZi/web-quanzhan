/*
* @Author: fjz
* @Date:   2018-08-08 09:54:51
* @Last Modified by:   fjz
* @Last Modified time: 2018-08-08 10:29:55
*/
var componentLine_v = function(name,config) {
	var component = new componentLine(name,config),
		width = (100 / config.data.length) >> 0;
		component.find('.line').css('width',width+'%');

	$.each(component.find('.rate'), function(index,item) {
		
		var w = $(this).css('width');

		$(this).height(w).width('');

		});
	$.each(component.find('.per'), function() {
		$(this).appendTo($(this).prev())
	})

	return component;
}