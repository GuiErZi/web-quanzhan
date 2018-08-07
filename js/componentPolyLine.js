/*
* @Author: fjz
* @Date:   2018-08-07 08:18:21
* @Last Modified by:   fjz
* @Last Modified time: 2018-08-07 11:01:17
*/
var componentPolyLine = function(name,config) {

	var component = new componentBase(name,config);
	
	var w = config.width;
	var h = config.height;
	// 创建一个canvas元素并加入一个画布
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;	
	cns.height = ctx.height = h;	

	// 水平网格线分为10份
	var step = 10;
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#aaa";

	window.ctx = ctx;
	for (var i = 0;i<step+1;i++) {
		var y = (h/step)*i;
		ctx.moveTo(0,y);
		ctx.lineTo(w,y)
	}
	// 垂直网格线
	step = config.data.length+1;
	var text_w = w/step>>0;
	for(var j = 0;j<step+1;j++) {
		var z = (w/step)*j;
		ctx.moveTo(z,0);
		ctx.lineTo(z,h);

		if (config.data[j]) {
			var text = $('<div class="text">');
			text.text(config.data[j][0]);
			text.css({
				'width':text_w,
				'left':z/2
				})
		component.append(text)
		}
		
	}

	ctx.stroke();


	// 绘制折线数据
	var cns1 = document.createElement('canvas');
	var ctx = cns1.getContext('2d');
	cns1.width = ctx.width = w;	
	cns1.height = ctx.height = h;
	component.append(cns);

var drawLine = function(per) {
	ctx.clearRect(0,0,w,h);

	ctx.beginPath();
	ctx.lineWidth = 5;
	ctx.strokeStyle = "#f00";
	component.append(cns1);
	var x = 0,
		y = 0,
		row = (w/ (config.data.length+1));


	for (var i = 0,len = config.data.length;i<len;i++) {
		var item = config.data[i];
		x =  row * (i+1);
		y = h-h*item[1]*per;

		ctx.moveTo(x,y);
		ctx.arc(x,y,5,0,2*Math.PI);
		// ctx.lineTo()
	}

	// 连线
	ctx.moveTo(row,h-h*config.data[0][1]*per);

	for (var i = 0;i<config.data.length;i++) {
		var item = config.data[i];

		x =  row * (i+1);
		y = h-h*item[1]*per;
		
		ctx.lineTo(x,y);
	}
	ctx.stroke();
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'rgba(255,136,128,0)';
	//绘制阴影
	ctx.lineTo(x,h);
	ctx.lineTo(row,h);
	ctx.fillStyle = 'rgba(255,136,128,.2)';
	ctx.fill();

	//写数据
for (var i = 0,len = config.data.length;i<len;i++) {
		var item = config.data[i];
		x =  row * (i+1);
		y = h-h*item[1]*per;
		
		if (item[2]) {
			ctx.fillStyle = item[2];
		} else {
			ctx.fillStyle = "#595959"
		}
		ctx.moveTo(x,y);
		ctx.fillText(((item[1]*100)>>0)+'%',x-10 ,y-10)
	}


	ctx.stroke();
}
	drawLine(0);
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