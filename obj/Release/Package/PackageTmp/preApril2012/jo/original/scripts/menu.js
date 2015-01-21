// JS menu file - purley so it can be included in static HTML files :o)
var bIn;
var oStyle;
function fIn(blnIn) {
	bIn = blnIn;
}

function fTrackMove(obj) {
	oStyle = document.getElementById(obj).style;
	oStyle.display = "block";
	oStyle.top = window.event.y + 20;
	oStyle.left = window.event.x + 10;
}

function fShow(obj) {
	oStyle = document.getElementById(obj).style;
	oStyle.display = "block";
}

function fHide(obj) {
	oStyle = document.getElementById(obj).style;
	oStyle.display = "none";
//	setTimeout("fHide2('" + obj + "')", 1000);
}
function fHide2(obj) {
	oStyle = document.getElementById(obj).style;
	oStyle.display = "none";
}

var d = document.write;

document.write('<div class="menuMain" onmousemove="fShow(\'menu1\');" onmouseout="fHide(\'menu1\');">');
document.write('	<a href="#" id="2">About Me</a>');
document.write('	<div class="menuSub" id="menu1" onmouseover="fShow(this.id);" onmouseout="fHide(this.id);">');
document.write('		<h3>About Me</h3>');
document.write('		<a href="ou.htm">The OU</a>');
document.write('		<a href="cv.htm">CV</a>');
document.write('	</div>');
document.write('</div>');
document.write('<div class="menuMain" onmousemove="fShow(\'menu2\');" onmouseout="fHide(\'menu2\');">');
document.write('	<a href="interests.htm" id="A1">Interests</a>');
document.write('	<div id="menu2" class="menuSub" onmouseover="fShow(this.id);" onmouseout="fHide(this.id);">');
document.write('		<h3>Interests</h3>');
document.write('		<a href="interests.htm#ringing">Ringing</a>');
document.write('		<a href="interests.htm#trains">Trains</a>');
document.write('		<a href="interests.htm#other">Other </a>');
document.write('	</div>');
document.write('</div>');
document.write('<div class="menuMain" onmousemove="fShow(\'menu3\');" onmouseout="fHide(\'menu3\');">');
document.write('	<a href="aboutwork.htm" id="A2">Work</a>');
document.write('	<div id="menu3" class="menuSub" onmouseover="fShow(this.id);" onmouseout="fHide(this.id);">');
document.write('		<h3>Work</h3>');
document.write('		<a href="aboutwork.htm">About</a>');
document.write('	</div>');
document.write('</div>');

document.write('<img src="images/thumbs/moz.jpg" width="160" height="280" alt="Sunset, dawn, Matheson Lake in New Zealand, BR Standard 4 motion, bell wheels">');