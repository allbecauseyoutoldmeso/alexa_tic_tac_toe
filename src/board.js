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
    for(var k = 0; k < this._size; k++) {
      if(this.rowWin(this._grid[k]), symbol) {
        return true;
      } else {
        return false;
      }
    }
  };

  Board.prototype.rowWin = function(row, symbol) {
    for(var l = 0; l < this._size; l++) {
      if(row[l] !== symbol) {
        return false;
      } else {
        return true;
      }
    }
  };

  exports.Board = Board;
})(this);
