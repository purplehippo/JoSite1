/**
 * Offers the following "Creating Coding" functions:
 * 		ColourStripes (diagonal coloured stripes)
 * 		Curves (multicoloured, moving, curves)
 * 		Cobwebs (particle-based, proximity lines)
 * 
 */

var canvas, context, width, height, interval;

function ColourStripes() {
	var imageData, offset;
	
	imageData = context.createImageData(canvas.width, canvas.height);
	for (var y = 0; y < imageData.height; y++) {
		for (var x = 0; x < imageData.width; x++) {
			offset = x * 4 + y * 4 * imageData.width;
			imageData.data[offset] = Math.sin(x * 0.01) * 127 + 128;
			imageData.data[offset + 1] = Math.sin(y * 0.02) * 127 + 128;
			imageData.data[offset + 2] = Math.cos(x * 0.04 + y * 0.03) * 127 + 128;
			imageData.data[offset + 3] = 255;
		}					
	}
	context.putImageData(imageData, 0, 0);
}

function Curves() {
	var points = [], numLines = 10, color, x1, y1, x2, y2, x3, y3;

//	context.fillStyle = "rgba(0, 0, 0, 1)";
//	context.fillRect(0, 0, width, height);
	context.lineWidth = 0.1;
	for (var i = 0; i < 4 * numLines; i++) {
		points.push({x: Math.random() * width, y: Math.random() * height, vx: Math.random() * 4 - 2, vy: Math.random() * 4 - 2});
	}
	
	interval = setInterval(function() {
		for (var j = 0; j < numLines; j++) {
			context.beginPath();
			context.moveTo(points[j * 4].x, points[j * 4].y);

			x1 = points[j * 4 + 1].x;
			y1 = points[j * 4 + 1].y;
			x2 = points[j * 4 + 2].x;
			y2 = points[j * 4 + 2].y;
			x3 = points[j * 4 + 3].x;
			y3 = points[j * 4 + 3].y;
			
//			if ((x1 < 0 || x1 > width) &&
//					(x2 < 0 || x2 > width) &&
//					(x3 < 0 || x3 > width) &&
//					(y1 < 0 || y1 > height) &&
//					(y2 < 0 || y2 > height) &&
//					(y3 < 0 || y3 > height)) {
//						clearInterval(interval);
//						Curves();
//					}

//			if (x1 < 0) x1 = width; if (x1 > width) x1 = 0;
//			if (x2 < 0) x2 = width; if (x2 > width) x2 = 0;
//			if (x3 < 0) x3 = width; if (x3 > width) x3 = 0;
//
//			if (y1 < 0) y1 = width; if (y1 > width) y1 = 0;
//			if (y2 < 0) y2 = width; if (y2 > width) y2 = 0;
//			if (y3 < 0) y3 = width; if (y3 > width) y3 = 0;

			context.bezierCurveTo(x1, y1, x2, y2, x3, y3);
			context.strokeStyle = chooseColour(j, 4);
			context.stroke();
		}
		for (var i = 0; i < points.length; i++) {
			points[i].x += points[i].vx;
			points[i].y += points[i].vy;
		}
	}, 1000 / 15);
}

function Cobwebs() {
	var points = [], numPoints = 30, speed = 3, maxSize = 100, frames = 0, distance = 0;

	context.lineWidth = 0.1;
	for (var i = 0; i < numPoints; i++) {
		points.push({x: Math.random() * width, y: Math.random() * height, vx: Math.random() * speed - (speed / 2), vy: Math.random() * speed - (speed / 2), size: Math.random() * maxSize});
	}

	interval = setInterval(function() {
		frames++;
		if (frames % 10 == 0) {
			context.fillStyle = "rgba(0, 0, 0, 0.01)";
			context.fillRect(0, 0, width, height);
			frames = 0;
		}
		for (var i = 0; i < numPoints; i++) {
			points[i].x += points[i].vx;
			points[i].y += points[i].vy;
			
			if (points[i].x < 0) points[i].x = width;
			if (points[i].x > width) points[i].x = 0;
			if (points[i].y < 0) points[i].y = height;
			if (points[i].y > height) points[i].y = 0;
		}
		
		for (var i = 0; i < numPoints; i++) {
			for (var j = 0; j < i; j++) {
				distance = Math.sqrt(Math.pow(points[i].x - points[j].x, 2) + Math.pow(points[i].y - points[j].y, 2));
				if (distance < 150) { // Math.min(points[i].size, points[j].size)) {
					context.beginPath();
					context.strokeStyle = chooseColour(i, 5);
					context.moveTo(points[i].x, points[i].y);
					context.lineTo(points[j].x, points[j].y);
					context.stroke();
				}
			}
		}
	}, 1000/24);
}


function chooseColour(i, mod) {
	var colour;
	switch (i % mod) {
	case 0:
		colour = "#15CB7A";
		break;
	case 1: 
		colour = "#CBCB15";
		break;
	case 2:
		colour = "#CB157A";
		break;
	case 3:
		colour = "#157ACB";
		break;
	case 4:
		colour = "#FFFFFF";
		break;
	default:
		colour = "#000000";
		break;
	}
	return colour;
}