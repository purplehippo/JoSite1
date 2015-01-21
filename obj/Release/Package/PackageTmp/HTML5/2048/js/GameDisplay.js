/**
 * 
 */
function GameDisplay() {
	this.tileContainer = document.querySelector(".tile-container");
	this.scoreContainer = document.querySelector(".score-container");
	this.endGameContainer = document.querySelector(".game-end-container");
}

GameDisplay.prototype.display = function(grid, data) {
	var me = this;
	this.clearContainer(this.tileContainer);
	grid.forEachCell(function(x, y, tile) {
		if (tile) {
			me.addTile(tile);
		}		
	});
	this.scoreContainer.textContent = data.score;
	
	if (data.over || data.won) {
		this.showEndGame(data);
	}
};
GameDisplay.prototype.addTile = function(tile) {
	var divTile = document.createElement("div");
	var position = {x: tile.x, y: tile.y};
	divTile.setAttribute("class", "tile tile-" + tile.value + " " + this.classAtPosition(position));
	divTile.textContent = tile.value;
	this.tileContainer.appendChild(divTile);
};
GameDisplay.prototype.classAtPosition = function(position) {
	return "tile-top-" + position.x + " tile-left-" + position.y;
};
GameDisplay.prototype.showEndGame = function(data) {
	// set class for won/over; update text for won/over
	var style = data.won ? "game-won-message" : "game-over-message";
	var text = data.won ? "Game Won!  :)" : "Game Over :(";
	var pOver = this.endGameContainer.getElementsByTagName("p")[0];
	pOver.textContent = text;
	
	this.endGameContainer.setAttribute("class", "game-end-container " + style);
};
GameDisplay.prototype.clearContainer = function (container) {
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}
};

