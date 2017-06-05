(function(exports) {

  function Board(size) {
    this._grid = [];
    for(i = 0; i < size; i++) {
      this._grid.push(makeRow(size));
    }
    this._size = size - 1;
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

  Board.prototype.hasWon = function(symbol) {

  };

  Board.prototype.singleRowWin = function(row, symbol) {
    return row.every(function checkCell(cell) { return cell === symbol; });
  };

  exports.Board = Board;
})(this);
