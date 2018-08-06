/*
* @Author: fjz
* @Date:   2018-08-06 21:36:51
* @Last Modified by:   fjz
* @Last Modified time: 2018-08-06 22:05:21
*/

var componentLine = function(name,config) {
	var component = new componentBase(name,config);

	$.each(config.data, function(index,item) {
		console.log(item);

		var line = $('<div class="line">'),
			name = $('<div class="name">'),
			rate = $('<div class="rate">'),
			per = $('<div class="per">');
		var width = item[1]*100 + '%';
		var bg;
		if (item[2]) {
			 bg = 'style="background-color:'+item[2]+'"';

		}

		per.text(width);
		rate.html('<div class="bg" '+bg+'></div>')
		rate.css('width', width)
			name.text(item[0]);
			line.append(name).append(rate).append(per);
			component.append(line)
	})

	return component;
}