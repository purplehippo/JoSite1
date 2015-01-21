/**
 * 
 */

function GamePlay(size, kbInput, displayer) {
	this.startTiles = 2;
	this.winScore = 1024;

	this.size = size;
	this.kbInput = kbInput;
	this.displayer = displayer;
	this.isRunning = false;
	this.isGameOver = false;
	this.isGameWon = false;
	this.movementVector = this.getMovementVector();
	
	this.kbInput.bind("move", this.move.bind(this));
	
	this.configureBoard();
}

GamePlay.prototype.configureBoard = function() {
	if (this.isRunning) {
		this.grid = new Grid(size, this.grid.cells);
	} else {
		this.grid = new Grid(this.size);
		this.addStartTiles();
		this.score = 0;
		this.isRunning = true;
	}
	this.display();
};

GamePlay.prototype.display = function() {
	this.displayer.display(this.grid, { 
		score: this.score,
		won: this.isGameWon,
		over: this.isGameOver });
};
GamePlay.prototype.addStartTiles = function() {
	// for each startTile, add it randomly to the grid
	for (var i = 0; i < this.startTiles; i++) {
		this.addTile();
	}
};
GamePlay.prototype.addTile = function(tile) {
	// check cell is empty
	// randomly choose 2 or 4 (90% vs 10%, resp)
	// add a tile object via setting tile-container and css
	if (!tile) {
		var value = Math.random() < 0.9 ? 2 : 4;
		tile = new Tile(this.grid.getRandomEmptyCell(), value);
	}
	this.grid.addToGrid(tile);	
};
GamePlay.prototype.configureTiles = function() {
	this.grid.forEachCell(function(x, y, tile) {
		if (tile) {
			tile.merged = false;
		}
	});
};
// move the tiles in the user requested direction...
// all tiles go in the direction as far as they can.
GamePlay.prototype.move = function(direction) {
	if (!this.isGameOver && !this.isGameWon) {
		var self = this; // makes 'this' available within functions
		//alert(direction);
		var cell, tile, merged;
		var moved = false;
		var positions;	// moved to and adjacent cell positions
		var adjacentTile;
		
		// update tile merged detail
		this.configureTiles();
	
		// setup direction to handle row/cols - r-l if right; l-r left; b-t down; t-b up...
		var xy = this.setupXYDirection(this.movementVector[direction]);
		
		xy.x.forEach(function(x) {
			xy.y.forEach(function(y) {
				cell = {x: x, y: y};
				tile = self.grid.getCellContents(cell);
				
				if (tile) {
					positions = self.getNextPosition(cell, self.movementVector[direction]);
					// get the tile in the next position to check for merge
					adjacentTile = self.grid.getCellContents(positions.adjacent);
					
					if (adjacentTile && adjacentTile.value === tile.value && !adjacentTile.merged) {
						// remove merging tile, add merged tile (replaces current)
						// change score, check if we've won
						self.grid.removeFromGrid(tile);
						merged = new Tile(positions.adjacent, tile.value * 2);
						merged.updateMerged(true);
						self.addTile(merged);
						self.score += merged.value;
						if (merged.value === self.winScore) self.isGameWon = true;
						moved = true;
					} else {
						self.grid.moveTile(tile, positions.current);
						if (self.hasMoved(tile, cell)) moved = true;
					}				
				}
			});	
		});
	
		if (moved && !this.isGameWon) {
			this.addTile();
			if (!this.movesAvailable() && !this.mergeAvailable()) this.isGameOver = true;
		}

		this.display();
	}
};

GamePlay.prototype.movesAvailable = function() {
	return this.grid.getAvailableCells().length > 0;
};
/***
 * check pairs of tiles for a possible merge
 */
GamePlay.prototype.mergeAvailable = function() {
	// iterate the grid; check top, right, bottom, left for value match
	// only need to do alternate cells
	var tile;
	var vector = this.movementVector;

	for (var x = 0; x < this.grid.size; x++) {
		for (var y = 0; y < this.grid.size; y++) {
			tile = this.grid.getCellContents({x: x, y: y});
			// use our movement vector to check l/r/t/b tiles
			if (tile) {
				for (var v = 0; v < vector.length; v++) {
					nextTile = this.grid.getCellContents({x: x + vector[v].x, y: y + vector[v].y});
					if (nextTile && tile.value === nextTile.value) return true;
				}
			}
//			y += 1;
		}
	}
	return false;
};
GamePlay.prototype.getNextPosition = function(cell, movement) {
	// use vector to 'move' in right direction
	// check if we're on an edge
	// check if 'next' tile is same value
	// 'merge' and 'move' tile
	var prevPosition;
	do {
		prevPosition = cell;
		cell = {x: prevPosition.x + movement.x, y: prevPosition.y + movement.y};
	} while (this.grid.isOnGrid(cell) && this.grid.isCellAvailable(cell));
	
	return {current: prevPosition, adjacent: cell};
};
GamePlay.prototype.getMovementVector = function() {
	var vector = [];
	vector.push({ x: 0, y: -1});
	vector.push({ x: -1, y: 0});
	vector.push({ x: 0, y: 1});
	vector.push({ x: 1, y: 0});
	return vector;
	
//	return { 
//		0: { x: 0, y: -1},	// left
//		1: { x: -1, y: 0},	// up
//		2: { x: 0, y: 1},	// right
//		3: { x: 1, y: 0}	// down
//	};
};
GamePlay.prototype.setupXYDirection = function(vector) {
	var xy = {x: [], y: []};
	for (var i = 0; i < this.size; i++) {
		xy.x.push(i);
		xy.y.push(i);
	}
	if (vector.x === 1) xy.x = xy.x.reverse();
	if (vector.y === 1) xy.y = xy.y.reverse();
	return xy;
};
GamePlay.prototype.hasMoved = function(pos1, pos2) {
	return !(pos1.x === pos2.x && pos1.y === pos2.y);
};
