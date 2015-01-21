/**
 * 
 */
var particleCount = 25;
var particleRadius = 0;
var particleSpeed = 3;

var canvas, ctx;
var w, h;
var particles = [];
var r, g, b, a;

var Particles = (function() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	w = window.innerWidth;
	h = window.innerHeight;
	
	canvas.width = w;
	canvas.height = h;
	
	//
	for (var i=0; i<this.particleCount; i++) {
		particles.push(new particle());
	}
	
	return {
		animate: function() {
//			setInterval(draw, 30);
			requestAnimFrame(Particles.animate);
			draw();
		}
	};
}());

function particle() {
	this.location = {x: Math.random() * w, y:Math.random() * h};
	this.angle = Math.random() * 360;
	this.speed = particleSpeed;
	
	r = Math.round(Math.random() * 255);
	g = Math.round(Math.random() * 255);
	b = Math.round(Math.random() * 255);
	a = Math.round(Math.random());
	this.rgba = "rgba("+r+","+g+","+b+","+a+")";
}

function draw() {
	ctx.globalCompositeOperation = "source-over";
	ctx.fillStyle="rgba(0, 0, 0, 0.02)";
	ctx.fillRect(0, 0, w, h);
	ctx.globalCompositeOperation = "lighter";
	
	for (var j=0; j<particleCount; j++) {
		var p = particles[j];
		ctx.fillStyle = "white";
		ctx.fillRect(p.location.x, p.location.y, p.radius, p.radius);
		
		// move the little fellas
		for (var m=0; m<particleCount; m++) {
			var p2 = particles[m];
			var dx = p2.location.x - p.location.x;
			var dy = p2.location.y - p.location.y;
			var d = Math.sqrt(dx*dx + dy*dy);
			
			// draw a line if distance is short
			if (d < 200) {
				ctx.beginPath();
				ctx.lineWidth = 1;
				ctx.moveTo(p.location.x, p.location.y);
				ctx.lineTo(p2.location.x, p2.location.y);
				ctx.strokeStyle = p.rgba;
				ctx.stroke();
			}
		}
		
		// setup new particle location
		p.location.x = p.location.x + p.speed*Math.cos(p.angle * Math.PI / 180);
		p.location.y = p.location.y + p.speed*Math.sin(p.angle * Math.PI / 180);
		
		// check bounds
		if (p.location.x < 0) p.location.x = w;
		if (p.location.y < 0) p.location.y = h;
		if (p.location.x > w) p.location.x = 0;
		if (p.location.y > h) p.location.y = 0;
	}
}
