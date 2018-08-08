/*
* @Author: fjz
* @Date:   2018-08-07 21:29:43
* @Last Modified by:   fjz
* @Last Modified time: 2018-08-08 15:36:29
*/
var componentPie = function(name,config) {

	var component = new componentBase(name,config);
	
	var w = config.width;
	var h = config.height;
	// 创建一个canvas元素并加入一个画布
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;	
	cns.height = ctx.height = h;
	$(cns).css('zIndex',1);

	component.append(cns);

	//加入一个底图层

	var r = w/2;
	ctx.beginPath();
	ctx.fillStyle = '#eee';
	ctx.strokeStyle = '#eee';
	ctx.lineWidth = 1;
	ctx.arc(r,r,r,0,2*Math.PI);
	ctx.fill();
	ctx.stroke();

	//加入一个数据层

	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;	
	cns.height = ctx.height = h;	
	$(cns).css('zIndex',2);

	component.append(cns);

	var colors = ['red','green','yellow','blue','orange'];
	var sangel = 1.5 * Math.PI;
	var eangel = 0;
	var aangel = Math.PI*2;

	// ctx.beginPath();
	// ctx.fillStyle = '#f00';
	// ctx.strokeStyle = '#f00';
	// ctx.lineWidth = 1;
	// ctx.moveTo(r,r)
	// ctx.arc(r,r,r,sangel,eangel);
	// ctx.fill();
	// ctx.stroke();

	var step = config.data.length;
	for (var i = 0;i<step;i++) {
		var item = config.data[i];
		var color = item[2] || (item[2] = colors.pop());
		eangel = sangel + aangel * item[1];
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.lineWidth = .1;

		ctx.moveTo(r,r)
		ctx.arc(r,r,r,sangel,eangel);
		ctx.fill();
		ctx.stroke();

		sangel = eangel;

		//加入项目文本
		var text = $('<div class="text">');
		text.text(config.data[i][0]);
		var per = $('<div class="per">');
		per.text(config.data[i][1]*100 + '%');
		text.append(per)
		var x = r + Math.sin(0.5*Math.PI - sangel) * r;
		var y = r + Math.cos(0.5*Math.PI - sangel) * r;
		text.css('left', x/2);
		text.css('top', y/2);
		text.css('zIndex', 99)
		if (x > w/2) {
			text.css('left',x/2)
		} else {
			text.css('right',(w-x)/2);
		}

		if (y > h/2) {
			text.css('top',y/2);
		} else {
			text.css('bottom',(h-y)/2)
		}

		if (config.data[i][2]) {
			text.css('color',config.data[i][2])
		}

		text.css('opacity',0);
		component.append(text)
	}

	// 创建一个canvas元素并加入一个蒙版层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;	
	cns.height = ctx.height = h;	
	$(cns).css('zIndex',3);
	component.append(cns);

	//加入一个底图层

	
	
	ctx.fillStyle = '#eee';
	ctx.strokeStyle = '#eee';
	ctx.lineWidth = 1;






	var drawLine = function(per) {
		ctx.clearRect(0,0,w,h);
		ctx.beginPath();
		ctx.moveTo(r,r);
		if (per <= 0) {
			ctx.arc(r,r,r,0,2*Math.PI);
			component.find('.text').css('opacity',0)

		}else {
			ctx.arc(r,r,r,sangel,sangel + 2*Math.PI*per,true);
		}
		ctx.fill();
		ctx.stroke();
		if (per >= 1) {
			component.find('.text').css('opacity',1)
		} 
	};
	drawLine(0)

	component.on('onLoad', function() {
		var s = 0;
		for (i = 0;i<100;i++) {
			setTimeout(function() {
				s+=0.01;
				drawLine(s);
			},i*10+500)
		}
	});

	component.on('onLeave', function() {
		var s = 1;
		for (var i = 0;i<100;i++) {
			setTimeout(function() {
				s-=0.01;
				drawLine(s);
			},i*10)
		}
	});

	return component;
}