(function(exports) {

  function Board(size) {
    this._grid = [];
    for(i = 0; i < size; i++) {
      this._grid.push(makeRow(size));
    }

  }

  function makeRow(length) {
      var row = [];
      for(j = 0; j < length; j++) {
        row.push('');
      }
      return row;
    }

  Board.prototype.grid = function() {
    return this._grid;
  };

  Board.prototype.take = function(row, column, symbol) {
    if(this._grid[row][column] !== '') {
      throw('that cell is already taken');
    }
    this._grid[row][column] = symbol;
  };

  exports.Board = Board;
})(this);
