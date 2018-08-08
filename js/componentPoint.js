/*
* @Author: fjz
* @Date:   2018-08-06 20:39:44
* @Last Modified by:   fjz
* @Last Modified time: 2018-08-08 15:27:01
*/
var componentPoint = function(name,config) {
	var component = new componentBase(name,config);

	var base = config.data[0][1];
	$.each(config.data, function(index,item) {
		var point = $('<div class="point point_'+index+'">')

		var name = $('<div class="name">' + item[0] + '</div>');
		var rate = $('<div class="per">' + (item[1]*100)+'%' + '</div>');
		name.append(rate);
		point.append(name);

		var per = (item[1]/base)*100+'%';

		point.width(per).height(per);

		if (item[2]) {
			point.css('backgroundColor',item[2])
		}

		if (item[3] !== undefined && item[4] !== undefined) {
			point.css({
				'left':item[3],
				'top':item[4],
			})
		}

		component.append(point)
	})

	return component;
}