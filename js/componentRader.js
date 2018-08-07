/*
* @Author: fjz
* @Date:   2018-08-07 19:59:27
* @Last Modified by:   fjz
* @Last Modified time: 2018-08-07 21:05:28
*/
var componentRader = function(name,config) {

	var component = new componentBase(name,config);
	
	var w = config.width;
	var h = config.height;
	// 创建一个canvas元素并加入一个画布
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;	
	cns.height = ctx.height = h;	
	component.append(cns);

	var r = w/2,
		step = config.data.length;

	
	// 计算一个圆周上的点坐标

	// 已知：圆心坐标（a,b）、半径r、角度deg；
	// rad = (2*Math.PI / 360) * (360 / step) * i;
	// x = a + Math.sin(rad) * r;
	// y = b + Math.cos(rad) * r;

	//绘制网格背景,分为十份
	var color = false;
	for(var s = 10;s > 0;s--) {



	ctx.beginPath();

	for(var i = 0 ; i < step; i++) {
		var rad = (2*Math.PI / 360) * (360 / step) * i;
		var x = r + Math.sin(rad) * r * (s/10);
		var y = r + Math.cos(rad) * r * (s/10);

		// ctx.arc(x,y,5,0,2*Math.PI);

			ctx.lineTo(x,y);

		}
			ctx.closePath();
			ctx.fillStyle = (color = !color) ? '#ccc' : '#eee'
			ctx.fill();

	}

	//绘制伞谷图
	for (var i = 0;i<step;i++) {
		var rad = (2*Math.PI / 360) * (360 / step) * i;
		var x = r + Math.sin(rad) * r;
		var y = r + Math.cos(rad) * r;
		ctx.moveTo(r,r);
		ctx.lineTo(x,y);

		//输出项目文字
		var text = $('<div class="text">');
		text.text(config.data[i][0]);

		text.css('transition', 'all 0.5s ' + i*0.1 + 's')

		if (x > w/2) {
			text.css({
				left: x/2 + 5
			});
		} else  {
			text.css({
				right: (w-x)/2 + 5
			});
		}

		if (y > h/2) {
			text.css("top",y/2 + 5)
		} else {
			text.css("bottom" , (h-y)/2 +5)
		}

		if (config.data[i][2]) {
			text.css('color',config.data[i][2])
		}

		text.css('opacity',0)
		
		component.append(text)
	}
	ctx.strokeStyle = '#e0e0e0'
	ctx.stroke();

	// 数据层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;	
	cns.height = ctx.height = h;	
	component.append(cns);

	ctx.strokeStyle = '#f00';
	var drawLine = function(per) {
		if (per >= 1) {
			component.find('.text').css('opacity',1)
		}
		if (per < 1) {
			component.find('.text').css('opacity',0)
		}

		ctx.clearRect(0,0,w,h);
		// 输出数据的折线
		for(var i = 0;i<step;i++) {
			var rad = (2*Math.PI / 360) * (360 / step) * i;
			var rate = config.data[i][1] * per;


			var x = r + Math.sin(rad) * r * rate;
			var y = r + Math.cos(rad) * r * rate;
			ctx.lineTo(x,y);
		}
		ctx.closePath();
		ctx.stroke();

		// 输出数据的点
		ctx.fillStyle = '#ff7676';
		for(var i = 0;i<step;i++) {
			var rad = (2*Math.PI / 360) * (360 / step) * i;
			var rate = config.data[i][1] * per;


			var x = r + Math.sin(rad) * r * rate;
			var y = r + Math.cos(rad) * r * rate;
			ctx.beginPath()
			ctx.arc(x,y,5,0,2*Math.PI);
			ctx.fill();
			ctx.closePath()
		}
	};
	drawLine(0.6)

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