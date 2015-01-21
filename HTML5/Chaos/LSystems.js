/**
 * 
 */
/**
 *	Jo Faircloth	2 April 2014 
 *	Todo:	
 *
 */

var vocab, initiator, string, rules = {}, interval;
var iterations = 0;
var numPoints = 8, i = 0;
var commands = {};
var system, angle, turnAngle, x, y, stack;
var size = 4;	// length of line
var system = dragon;

var info;

var LSystems = (function() {
	this.initLSystem();
	return {
		animate: function() {
			if (i < numPoints) {
				requestAnimFrame(LSystems.animate);
				transform();
				//chaos.context.fillStyle = "rgba("+hues[i]+")";
				//chaos.context.fillRect(x * scale, y * scale, 0.25, 0.25);
				//info.innerText = "Point: " + ++i + " / " + numPoints; // + "<br />x: " + x + ", y: " + y + ", z: " + z;
				i++;
			}
			if (i == numPoints-1)
				render();
		}
	};
}());

function initLSystem() {
	chaos.init();
	
	system = plant;
	stack = [];
	system();
	string = initiator;

//	createHues();
}

function transform() {
	var char, rule;
	var newString = "";
	
	for (var i=0; i<string.length; i++) {
		char = string.charAt(i);
		rule = rules[char];
		if (rule) {
			newString += rule;
		} else {
			newString += char;
		}
	}
	string = newString;
	console.log(string);
	
}
function render() {
	var char, command;
	chaos.clear();
	chaos.context.beginPath();
	chaos.context.moveTo(x, y);
	for (var i=0; i<string.length; i++) {
		char = string.charAt(i);
		command = commands[char];
		if (command) {
			command();
		}
	}
	chaos.context.stroke();
}
function move() {
	x += Math.cos(angle * Math.PI / 180) * size;
	y += Math.sin(angle * Math.PI / 180) * size;
	chaos.context.moveTo(x, y);
}
function draw() {
	x += Math.cos(angle * Math.PI / 180) * size;
	y += Math.sin(angle * Math.PI / 180) * size;
	chaos.context.lineTo(x, y);	
}
function left() {
	angle -= turnAngle;
}
function right() {
	angle += turnAngle;
}
function push() {
	stack.push({x:x, y:y, angle:angle});
}
function pop() {
	var state = stack.pop();
	if (state) {
		x = state.x;
		y = state.y;
		angle = state.angle;
		chaos.context.moveTo(x, y);
	}
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



/**
* LSystems...
* 
*/
function algae() {
	vocab = "AB";
	initiator = "A";
	
	rules["A"] = "AB";
	rules["B"] = "A";
	
	maxIter = 7;
}
function dragon() {
	vocab = "+-FXY";
	initiator = "FX";
	
	rules["X"] = "X+YF+";
	rules["Y"] = "-FX-Y";
	
	commands["F"] = draw;
	commands["+"] = right;
	commands["-"] = left;
	turnAngle = 90;
	
	angle = 0;
	x = chaos.width * 0.5;
	y = chaos.height * 0.5;
	chaos.context.strokeStyle = "#FF0000";
}
function tree() {
	vocab = "AB[]";
	initiator = "A";
	
	rules["A"] = "B[-A]+A";
	rules["B"] = "BB";
	
	commands["A"] = draw;
	commands["B"] = draw;
	commands["["] = push;
	commands["]"] = pop;
	commands["+"] = right;
	commands["-"] = left;
	turnAngle = 45;
	
	angle = -90;
	x = chaos.width * 0.5;
	y = chaos.height;
	chaos.context.strokeStyle = "#FF0000";
}
function sierpinski() {
	vocab = "AB+-";
	initiator = "A-B-B";

	rules["A"] = "A-B+A+B-A";
	rules["B"] = "BB";
	
	commands["A"] = draw;
	commands["B"] = draw;
	commands["+"] = right;
	commands["-"] = left;
	turnAngle = 120;
	
	angle = 0;
	x = chaos.width * 0.333;
	y = chaos.height * 0.1;
	chaos.context.strokeStyle = "#FF0000";
}
function plant() {
	vocab = "XF+-[]";
	initiator = "X";

	rules["X"] = "F-[[X]+X]+F[+FX]-X";
	rules["F"] = "FF";
	
	commands["X"] = draw;
	commands["F"] = draw;
	commands["+"] = right;
	commands["-"] = left;
	commands["["] = push;
	commands["]"] = pop;
	turnAngle = 25;
	
	angle = -90;
	x = chaos.width * 0.5;
	y = chaos.height;	
	chaos.context.strokeStyle = "#33CC33";
}
function koch() {
	vocab = "FX+-";
	initiator = "F++F++F";

	rules["X"] = "F-F++F-F";
	rules["F"] = "FF";
	
	commands["X"] = draw;
	commands["F"] = draw;
	commands["+"] = right;
	commands["-"] = left;
	turnAngle = 60;
	
	angle = 0;
	x = chaos.width * 0.2;
	y = chaos.height * 0.3;
	chaos.context.strokeStyle = "#FF0000";
}
