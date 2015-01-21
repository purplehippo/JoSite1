/**
 * 
 */
function Tile(position, value) {
	this.x = position.x;
	this.y = position.y;
	this.value = value || 2; // default to 2
	this.merged = false;
}

Tile.prototype.updatePosition = function(position) {
	this.x = position.x;
	this.y = position.y;
};
Tile.prototype.updateMerged = function(merged) {
	this.merged = merged;
};
