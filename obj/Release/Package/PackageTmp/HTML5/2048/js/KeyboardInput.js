function KeyboardInput(bindings) {
	this.callbacks = {};
	if (bindings) {
		for(name in bindings)
			this.bind(name, bindings[name]);
	}
	this.install(document);
}

KeyboardInput.prototype.bind = function(event, func) {
	if (!this.callbacks[event])
		this.callbacks[event] = [];
	this.callbacks[event].push(func);
};
KeyboardInput.prototype.unbind = function(event) {
	if (!this.callbacks[event])
		return;
	delete this.callbacks[event];
};
KeyboardInput.prototype.install = function(element) {
	var keyMap = this;
	function handler(event) {return keyMap.dispatch(event, element);}
	if (element.addEventListener)
		element.addEventListener("keydown", handler, false);
	else if (element.attachEvent)
		element.attachEvent("onkeydown", handler);
};
KeyboardInput.prototype.dispatch = function(event, element) {
	var modifiers = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;

	if (!modifiers) {		
		var keyId = event.which;
		var handler = this.keyMap[keyId];
		if (handler !== undefined) {
			//var retVal = handler.call(element, event, keyId);
			var retVal = this.call("move", handler);
			if (retVal === false) {
				if (event.stopPropagation) event.stopPropagation();
				else event.cancelBubble = true;
				if (event.preventDefault) event.preventDefault();
				else event.returnValue = false;
			}
			return retVal;
		}
	}
};
KeyboardInput.prototype.call = function(func, data) {
	var callbacks = this.callbacks[func];
	if (callbacks) {
		callbacks.forEach(function(callback) {
			callback(data);
		});
	}
};

KeyboardInput.prototype.keyMap = {
	37: 0,	// left
	38: 1,	// up
	39: 2,	// right
	40: 3,	// down
	65: 0,	// A
	87: 1,	// W
	68: 2,	// D
	83: 3,	// S
    72: 0,	// Vim left
    74: 3,	// Vim down
    75: 1,	// Vim up
    76: 2,	// Vim right
	82: 4,	// R - reset
	85: 5	// U - undo	
};

////The legacy keyCode property of the keydown event object is not standardized
////But the following values seem to work for most browsers and OSes.
//Keymap.keyCodeToKeyName = {
//
//// Keys with words or arrows on them
//8:"Backspace", 9:"Tab", 13:"Enter", 16:"Shift", 17:"Control", 18:"Alt",
//19:"Pause", 20:"CapsLock", 27:"Esc", 32:"Spacebar", 33:"PageUp", 
//34:"PageDown", 35:"End", 36:"Home", 37:"Left", 38:"Up", 39:"Right",
//40:"Down", 45:"Insert", 46:"Del",
//
//// Number keys on main keyboard (not keypad)
//48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",
//
//// Letter keys. Note that we don't distinguish upper and lower case
//65:"A", 66:"B", 67:"C", 68:"D", 69:"E", 70:"F", 71:"G", 72:"H", 73:"I",
//74:"J", 75:"K", 76:"L", 77:"M", 78:"N", 79:"O", 80:"P", 81:"Q", 82:"R",
//83:"S", 84:"T", 85:"U", 86:"V", 87:"W", 88:"X", 89:"Y", 90:"Z",
//
//// Keypad numbers and punctuation keys. (Opera does not support these.)
//96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9",
//106:"Multiply", 107:"Add", 109:"Subtract", 110:"Decimal", 111:"Divide",
//
//// Function keys
//112:"F1", 113:"F2", 114:"F3", 115:"F4", 116:"F5", 117:"F6",
//118:"F7", 119:"F8", 120:"F9", 121:"F10", 122:"F11", 123:"F12",
//124:"F13", 125:"F14", 126:"F15", 127:"F16", 128:"F17", 129:"F18",
//130:"F19", 131:"F20", 132:"F21", 133:"F22", 134:"F23", 135:"F24",
//
//// Punctuation keys that don't require holding down Shift
//// Hyphen is nonportable: FF returns same code as Subtract
//59:";", 61:"=", 186:";", 187:"=",
//
//// Firefox and Opera return 59,61 
//188:",", 190:".", 191:"/", 192:"`", 219:"[", 220:"\\", 221:"]", 222:"'"
//};


/**
 * 
 */
//var Key = {
//		_pressed: {},
//		LEFT: 37,
//		UP: 38,
//		RIGHT: 39,
//		DOWN: 40,
//		
//		isDown: function(keyCode) {
//			return this._pressed[keyCode];
//		},
//		onKeydown: function(event) {
//			this._pressed[event.keyCode] = true;
//		},
//		onKeyup: function(event) {
//			delete this._pressed[event.keyCode];
//		}
//};
//
//window.addEventListener('keyup', function(event){Key.onKeyup(event); }, false);
//window.addEventListener('keydown', function(event){Key.onKeydown(event); }, false);
