(function(exports) {

  function Board(size) {
    this._grid = [];
    for(i = 0; i < size; i++) {
      this._grid.push(makeRow(size));
    }
    this._size = size;
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
    return this.anyRowWin(symbol) || this.anyColumnWin(symbol, this.grid()) || this.anyDiagonalWin(symbol, this.grid());
  };


  Board.prototype.anyRowWin = function(symbol) {
    return this.grid().some(function checkRow(row) {
      return row.every(function checkCell(cell) {
        return cell === symbol;
      });
    });
  };

  Board.prototype.anyColumnWin = function(symbol, grid) {
    return this.dimensions().some(function checkColumn(column) {
      return grid.every(function checkRow(row) {
        return row[column] === symbol;
      });
    });
  };


  Board.prototype.anyDiagonalWin = function(symbol, grid) {
    return this.dimensions().every(function checkCell(cell) {
      return grid[cell][cell] === symbol || grid[cell][(grid.length-1)-cell] === symbol ;
    });
  };

  Board.prototype.dimensions = function() {
    var dimensions = [];
    for(k = 0; k < this._size; k++) {
      dimensions.push(k);
    }
    return dimensions;
  };

  exports.Board = Board;
})(this);
