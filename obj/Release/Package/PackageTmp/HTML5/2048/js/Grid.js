/**
 * Handles grid related functions
 */
function Grid(size, currentGrid) {
	this.size = size;
	// here is our grid, full of cells..
	this.cells = this.buildGrid(currentGrid);
}

/***
 * if grid is not defined, create a new n x n grid of empty cells
 * if grid is defined, create a new Tile
 * XXXXXXXXXXXXXXXXXXX
 * @param grid
 */
Grid.prototype.buildGrid = function(grid) {
	var cells = [];
	var tile;
	
	for (var x = 0; x < this.size; x++) {
		cells[x] = [];
		for (var y = 0; y < this.size; y++) {
			if (grid) {
				tile = grid[x][y];
				cells[x].push(tile ? new Tile(tile.position, tile.value) : null);			
			} else {
				cells[x].push(null);
			}
		}
	}
	return cells;
};
Grid.prototype.addToGrid = function(tile) {
	this.cells[tile.x][tile.y] = tile;
};
Grid.prototype.removeFromGrid = function(tile) {
	this.cells[tile.x][tile.y] = null;
};
/***
 * 
 * @returns an available, random tile
 */
Grid.prototype.getRandomEmptyCell = function() {
	var available = this.getAvailableCells();
	if (available.length) {
		return available[Math.floor(Math.random() * available.length)];
	}
};
Grid.prototype.getAvailableCells = function() {
	var cells = [];
	for (var x = 0; x < this.size; x++) {
		for (var y = 0; y < this.size; y++) {
			if (!this.cells[x][y]) 
				cells.push({x: x, y: y});
		}
	}
	return cells;
};
/***
 * as size is not available everywhere, do a for-each method here
 * @param callback
 */
Grid.prototype.forEachCell = function(callback) {
	for (var x = 0; x < this.size; x++) {
		for (var y = 0; y < this.size; y++) {
			callback(x, y, this.cells[x][y]);
		}
	}
};
Grid.prototype.isOnGrid = function(position) {
	return position.x >= 0 && position.x < this.size 
		&& position.y >= 0 && position.y < this.size;
};
Grid.prototype.isCellAvailable = function(cell) {
	if (this.getCellContents(cell) === null)
		return true;
	return false;
};
Grid.prototype.getCellContents = function(cell) {
	if (this.isOnGrid(cell)) {
		return this.cells[cell.x][cell.y];
	} else { 
		return null;
	}
};


/***
 * remove 'old' tile from grid, add 'new' tile, update tile's x and y to new position
 * @param tile
 * @param position
 * @returns {Boolean}
 */
Grid.prototype.moveTile = function(tile, position) {
	this.cells[tile.x][tile.y] = null;
	this.cells[position.x][position.y] = tile;
	tile.updatePosition(position);
};