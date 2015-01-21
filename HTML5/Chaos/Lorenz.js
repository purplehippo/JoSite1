/**
 *	Jo Faircloth	30 March 2014 
 *	Todo:	
 *
 */

var x, y, z, a, b, c, scale = 16;
var i = 0;
var points = [], hues = [];
var numPoints = 25000;
var info;

var Lorenz = (function() {
	this.initLorenz();
	return {
		animate: function() {
			if (i < numPoints) {
				requestAnimFrame(Lorenz.animate);
				chaos.context.beginPath();
				chaos.context.moveTo(x * scale, z * scale);
				lorenz();
				chaos.context.lineTo(x * scale, z * scale);
				chaos.context.strokeStyle = "rgba("+hues[i]+")";
				chaos.context.stroke();
				info.innerText = "Point: " + ++i + " / " + numPoints; // + "<br />x: " + x + ", y: " + y + ", z: " + z;
			}
		}
	};
}());

function initLorenz() {
	chaos.init();
	chaos.context.translate(chaos.width * 0.5, -chaos.height * 0);
	chaos.context.lineWidth = 0.5;
	
	info = document.getElementById("info");

	x = Math.random() - 0.5;
	y = Math.random() - 0.5;
	z = Math.random() - 0.5;
	
	a = 20;
	b = 8/3;
	c = 28; // 15, 18, 50
	
	createHues();
}

function lorenz() {
	var x1, y1, z1;
	var dt = 0.01;
	
	x1 = x + (a * (y - x)) * dt;
	y1 = y + (x * (c - z) - y) * dt;
	z1 = z + ((x * y) - (b * z)) * dt;
	
	x = x1;
	y = y1;
	z = z1;
}

function createHues() {
	var h, hi, hf;
	var a = 255;
	for (var i=0; i<numPoints; i++) {
		h = i / numPoints;
		h = h * 6.0 * 255;
		hi = Math.floor(h);
		hf = Math.floor((h - hi) * 255); 

		switch (hi % 6) {
		case 0:
			hues.push([255, hf, 0, a]);
			break;
		case 1:
			hues.push([255-hf, 255, 0, a]);
			break;
		case 2:
			hues.push([0, 255, hf, a]);
			break;
		case 3:
			hues.push([0, 255 - hf, 255, a]);
			break;
		case 4:
			hues.push([hf, 0, 255, a]);
			break;
		case 5:
			hues.push([255, 0, 255-hf, a]);		
			break;
		}
	}
}