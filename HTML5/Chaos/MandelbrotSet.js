/**
 * @author gibbs
 * Todo:	Render > one row at a time (putImageData is VERY slow)
 */

var g = {};
var MAX_ITERATIONS = 1024;
var ESCAPE = 4;
var REMIN = -2;
var IMMAX = 1.2;
var IMMIN = -1.2;

var animCount = 0;
var smooth = false;
var reset = false;

window.addEventListener('load', handleLoad, false);
window.addEventListener('hashchange', init, false);
window.onresize = function(evt) {
	g.canvas.width = window.innerWidth;
	g.canvas.height = window.innerHeight;
	g.reMax = g.canvas.width * ((g.imMax - g.imMin) / g.canvas.height) + g.reMin;

	g.deltaRe = (g.reMax - g.reMin) / g.canvas.width;
	g.deltaIm = (g.imMin - g.imMax) / g.canvas.height;
	
	animCount = 0;
	animate();
};

function handleLoad() {
	g.canvas = document.getElementById('cv');
	g.canvas.width = window.innerWidth;
	g.canvas.height = window.innerHeight;

	g.zoomElement = document.getElementById('zoom');

	g.canvas.addEventListener('mousedown', handlePointer, false);
	g.canvas.addEventListener('mousemove', handlePointer, false);
	g.canvas.addEventListener('mouseup', handlePointer, false);

	document.getElementById('btnSmooth').addEventListener('click', handleSmooth, false);
	document.getElementById('btnRedraw').addEventListener('click', handleRedraw, false);
	document.getElementById('btnReset').addEventListener('click', handleReset, false);
	document.getElementById('btnSave').addEventListener('click', handleSave, false);

	g.ctx = g.canvas.getContext('2d');
	g.canvasData = g.ctx.getImageData(0, 0, g.canvas.width, g.canvas.height);
	
	g.palette = [];
	g.pointer = {};
	g.pointer.down = false;
	
	init();
	animate();
//	renderData();
}

function init() {
	if ((location.hash != "") && (!reset)) {
		var hash = location.hash.replace("#", "").split("/");
		g.reMin = parseFloat(hash[0], 10);
		g.reMax = parseFloat(hash[1], 10);
		g.imMin = parseFloat(hash[2], 10);
		g.imMax = parseFloat(hash[3], 10);

		g.deltaRe = parseFloat(hash[4], 10);
		g.deltaIm = parseFloat(hash[5], 10);
	} else {
		g.reMin = REMIN;
		g.imMax = IMMAX;
		g.imMin = IMMIN;
		g.reMax = g.canvas.width * ((g.imMax - g.imMin) / g.canvas.height) + g.reMin;
	
		g.deltaRe = (g.reMax - g.reMin) / g.canvas.width;
		g.deltaIm = (g.imMin - g.imMax) / g.canvas.height;
	}		
	g.maxIterations = MAX_ITERATIONS;
	makePalette();
	document.getElementById('btnSmooth').value = "Banded Colour";
	
	animCount = 0;
	reset = false;
}

function smoothPalette() {
	smooth = true;
	var t;
	var red, green, blue;

	for (var i = 0; i <= g.maxIterations; i++) {
		t = i / g.maxIterations;
		red = (7*(1-t)*t*t*t*255);
		green = (5*(1-t)*(1-t)*t*t*255);
		blue = (11*(1-t)*(1-t)*(1-t)*t*255);
		g.palette.push([red, green, blue, 255]);
	}
}

function makePalette() {
	smooth = false;
	function wrap(x) {
		x = ((x + 256) & 0x1ff) - 256;
		if (x < 0) x = -x;
		return x;
	}
	for (var i = 0; i <= g.maxIterations; i++) {
//		palette.push([wrap(7*i), wrap(5*i), wrap(11*i)]);
//		g.palette.push("rgb(" + wrap(7*i) + "," + wrap(5*i) + "," + wrap(11*i) + ")");
		g.palette.push([wrap(7*i), wrap(5*i), wrap(11*i), 255]);
	}
}

function shadePalette() {
	var shade = 0;
	for (var i = 0; i < g.maxIterations; i++) {
		shade = 255 - Math.floor((i / g.maxIterations) * 255);
		g.palette.push([shade, shade, shade, 255]);
	}
	g.palette.push([0, 0, 0, 255]);
}
//function makePalette() {
//	var w = 0;
//	for (var i = 0; i <= g.maxIterations; i++) {
//		w = (i % 300) + 400;
//		if (w >= 400 && w <=440) {
//			red = -1 * ((w - 440) / 40);
//			green = 0;
//			blue = 1;
//		} else if (w >= 440 && w <= 490) {
//			red = 0;
//			green = (w - 440) / 50;
//			blue = 1;			
//		} else if (w >= 490 && w <= 510) {
//			red = 0;
//			green = 1;
//			blue = -1 * ((w - 510) / 20);
//		} else if (w >= 510 && w <= 580) {
//			red = (w - 510) / 70;
//			green = 1;
//			blue = 0;
//		} else if (w >= 580 && w <= 645) {
//			red = 1;
//			green = -1 * ((w - 645) / 65);
//			blue = 0;
//		} else if (w >= 645 && w <= 700) {
//			red = 1;
//			green = 0;
//			blue = 0;
//		}
//		g.palette.push([red*255, green*255, blue*255, 255]);
//	}
//	
//}
function renderData(Im) {
//	for (var Im = 0; Im < g.canvas.height; Im++) {
		g.canvasData = g.ctx.getImageData(0, Im, g.canvas.width, 1);
		// draw a single red line to mark position
		var pix = 0;
		for (var p = 0; p < g.canvas.width; p++) {
			g.canvasData.data[pix++] = 255;
			g.canvasData.data[pix++] = 0;
			g.canvasData.data[pix++] = 0;
			g.canvasData.data[pix++] = 255;
		}
		g.ctx.putImageData(g.canvasData, 0, Im+1);
		renderRow(Im);
//	}
}

function renderRow(rowId) {
	var colour = [0,0,0,0];
	var idx = 0;

	for (var Re = 0; Re < g.canvas.width; Re++) {
		colour = calculateMandelbrotPixel(Re, rowId);

		// Index of the pixel in the array
		idx = Re * 4; // (Re + (rowId * g.canvas.width)) * 4;

		// Update the values of the pixel;
		g.canvasData.data[idx + 1] = colour[0];
		g.canvasData.data[idx + 0] = colour[1];
		g.canvasData.data[idx + 2] = colour[2];
		g.canvasData.data[idx + 3] = colour[3];
	}

	g.ctx.putImageData(g.canvasData, 0, rowId);
}

function calculateMandelbrotPixel(Re, Im) {
	var reC = (Re * g.deltaRe) + g.reMin;
	var imC = (Im * g.deltaIm) + g.imMax;
	
	iteration = 0;
	reZ = 0.0, imZ = 0.0;	
	
	while (reZ*reZ + imZ*imZ < ESCAPE && iteration < g.maxIterations) {
		xtemp = reZ*reZ - imZ*imZ + reC;
		ytemp = 2 * reZ * imZ + imC;
		// FOR FUN:
//		ytemp = Math.sin(2 * reZ * imZ) + imC;
		// if the values become the same - it will never escape
		if (reZ == xtemp && imZ == ytemp) {
			iteration = g.maxIterations;
			break;
		}
		reZ = xtemp;
		imZ = ytemp;
		iteration++;
	}
	
//	if (iteration < g.maxIterations) {
//		var zn = Math.sqrt(reZ*reZ + imZ*imZ);
//		var nu = Math.log(Math.log(zn) / Math.log(2)) / Math.log(2);
//		iteration = iteration + 1 - nu;
//	}
//	
//	return colourInterpolate(iteration);
	return g.palette[iteration%MAX_ITERATIONS];
}


function animate() {
	requestAnimFrame(animate);
	if (animCount < g.canvas.height) {
		renderData(animCount);
		animCount++;
		return;
	}
}

function handlePointer(evt) {
	var canvasX, canvasY;

    if (evt.offsetX && evt.offsetY) {
      canvasX = evt.offsetX;
      canvasY = evt.offsetY;
    } else {
      canvasX = evt.clientX - evt.target.offsetLeft;
      canvasY = evt.clientY - evt.target.offsetTop;
    }

	switch(evt.type) {
	case 'mousedown':
		g.pointer.down = true;
		g.pointer.x1 = canvasX;
		g.pointer.y1 = canvasY;
//		handleZoom();
		break;
	case 'mouseup':
		g.pointer.down = false;
		g.zoomElement.height = Math.abs(canvasY - g.pointer.y1);
		// ensure we keep the screen ratio
		g.zoomElement.width = g.zoomElement.height * (g.canvas.width / g.canvas.height);
		
		if (g.pointer.x1 < 5) g.pointer.x1 = 5;
		if (g.pointer.y1 < 5) g.pointer.y1 = 5;

		g.reMin = xToRe(g.pointer.x1);
		g.imMax = yToIm(g.pointer.y1);
		g.reMax = xToRe(g.zoomElement.width + g.pointer.x1);
		g.imMin = yToIm(g.zoomElement.height + g.pointer.y1);
		g.reMax = g.canvas.width * ((g.imMax - g.imMin) / g.canvas.height) + g.reMin;

		g.deltaRe = (g.reMax - g.reMin) / g.canvas.width;
		g.deltaIm = (g.imMin - g.imMax) / g.canvas.height;

		g.zoomElement.style.width = 0;
		g.zoomElement.style.height = 0;
		location.hash = g.reMin+"/"+g.reMax+"/"+g.imMin+"/"+g.imMax+"/"+g.deltaRe+"/"+g.deltaIm;

		animCount = 0;
		animate();

//		var boxW = 10, boxH = 5;
//		g.reMin = xToRe(evt.offsetX - boxW/2);
//		g.imMax = yToIm(evt.offsetY - boxH/2);
//		g.imMin = yToIm(boxH/2 + evt.offsetY);
//		g.reMax = g.canvas.width * ((g.imMax - g.imMin) / g.canvas.height) + g.reMin;
//		g.deltaRe = (g.reMax - g.reMin) / g.canvas.width;
//		g.deltaIm = (g.imMin - g.imMax) / g.canvas.height;
////		var f = Math.sqrt(0.001 + 2.0 * Math.min(Math.abs(xToRe(10)), Math.abs(yToIm(10))));
////	    steps = Math.floor(223.0/f);
//		g.maxIterations = g.maxIterations * 2;
//		//makePalette();
//		animCount = 0;
//		animate();
		break;
	case 'mousemove':
		if (g.pointer.down) {
			g.zoomElement.height = Math.abs(canvasY - g.pointer.y1);
			// ensure we keep the screen ratio
			//g.zoomElement.width = g.zoomElement.height * (g.canvas.width / g.canvas.height);
			g.zoomElement.width = Math.abs(canvasX - g.pointer.x1);
			g.zoomElement.style.left = g.pointer.x1;
			g.zoomElement.style.top = g.pointer.y1;
			g.zoomElement.style.width = g.zoomElement.width;
			g.zoomElement.style.height = g.zoomElement.height;
		}
		break;
	}
}

function handleSmooth(evt) {
	g.palette.length = 0;
	if(smooth) {
		smooth = false;
		makePalette();
		document.getElementById('btnSmooth').value = "Smooth Colour";
	} else {
		smooth = true;
		smoothPalette();
		document.getElementById('btnSmooth').value = "Banded Colour";
	}
	//animCount = 0;
	animate();
}
function handleRedraw(evt) {
	animCount = 0;
	animate();
}
function handleReset(evt) {
	reset = true;
	init();
	animate();
}
function handleSave(evt) {
	var url = g.canvas.toDataURL();
	var newImg = document.createElement("img");
	newImg.src = url;
	document.body.appendChild(newImg);
}
function handleZoom() {
	g.pointer.down = false;

	g.reMin = xToRe(g.pointer.x1);
	g.imMax = yToIm(g.pointer.y1);
	g.reMax = xToRe(10 + g.pointer.x1);
	g.imMin = yToIm(10 + g.pointer.y1);

	animCount = 0;
	animate();
}
function xToRe(x) {
  var xLoc = (g.reMax - g.reMin) / g.canvas.width;
  return (x * xLoc) + g.reMin;
}

function yToIm(y) {
  var yLoc = (g.imMin - g.imMax) / g.canvas.height;
  return (y * yLoc) + g.imMax;
}

function colourInterpolate(it) {
	var col1, col2;
	col1 = g.palette[Math.floor(it)];
	if (it < g.maxIterations) {
		col2 = g.palette[Math.floor(it) + 1];
	} else {
		col2 = col1;
	}

	return [(col1[0] + col2[0]) / 2, (col1[1] + col2[1]) / 2, (col1[2] + col2[2]) / 2, 255];
}