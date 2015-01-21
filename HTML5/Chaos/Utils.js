/**
 *	Jo Faircloth	29 March 2014 
 *
 *	Notes:
 *	window.onLoad is not the best way to check for load
 *
 */

var chaos = (function() {
	return {
		init: function() {
			this.canvas = document.getElementById("cv");
			this.context = this.canvas.getContext("2d");
			this.setSize(window.innerWidth, window.innerHeight);
			document.body.addEventListener("keyup", handleKeyPress, false);
		},
		setSize: function(w, h) {
			this.width = this.canvas.width = w;
			this.height = this.canvas.height = h;
		},
		/*
		 * Parameters: c - any colour if a colour is required, eg #FFCC99, rgb(255, 0, 0), rgba(255, 0, 0, 255)
		 */
		clear: function(c) {
			if (c) {
				this.context.fillStyle = c;
				this.context.fillRect(0, 0, this.width, this.height);
			} else {
				this.context.clearRect(0, 0, this.width, this.height);
			}
		},
		popImage: function() {
			var win = window.open("", "Rendered Chaos Image");
			var src = this.canvas.toDataURL("image/png");
			win.document.write("<img src='" + src + "' width = '" + this.width + "' height='" + this.height + "'/>");
		}
	};
}());

function handleKeyPress(evt) {
	switch(evt.keyCode) {
	case 32:	// space
		break;
	case 80:	// p
		Chaos.popImage();
		break;
	default:
		break;
	}
}

//window.onresize = (function() {chaos.init();});

/**
 * Try to smooth the animation - JS tries to render at 60fps
 * http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
 * http://creativejs.com/resources/requestanimationframe/
 */
(function() {
	var lastTime = 0;
	var vendors = ['webkit', 'moz', 'ms', 'o'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAmimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] ||
				window[vendors[x]+'CancelRequestAnimationFrame'];
	}
	
	if (!window.requestAmimationFrame) {
		window.requestAmimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() {
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	}
		
	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
	}
	
}());

window.requestAnimFrame = (function() {
	return window.requestAnimationFrame			||
			window.webkitRequestAnimationFrame	||
			window.mozRequestAnimationFrame		||
			function(callback) {
				window.setTimeout(callback, 1000/60);
			};
})();

