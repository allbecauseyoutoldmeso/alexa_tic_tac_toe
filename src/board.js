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
    return this.anyRowWin(symbol);
  };


  Board.prototype.anyRowWin = function(symbol) {
    return this.grid().some(function checkRow(row) {
      return row.every(function checkCell(cell) {
        return cell === symbol;
      });
    });
  };

  Board.prototype.anyColumnWin = function(symbol, grid) {
    return this.columns().some(function checkColumn(column) {
      return grid.every(function checkRow(row) {
        return row[column] === symbol;
      });
    });
  };

  Board.prototype.columns = function() {
    var columns = [];
    for(k = 0; k < this._size; k++) {
      columns.push(k);
    }
    return columns;
  };

  // Board.prototype.singleColumnWin = function(column, symbol) {
  //   return this.grid().every(function checkRow(row) { return row[column] === symbol; });
  // };

  // Board.prototype.anyRowWin = function(symbol) {
  //   return this._grid.some(function checkRow(row) { return this.singleRowWin(row, symbol); });
  // };

  // Board.prototype.singleRowWin = function(row, symbol) {
  //   return row.every(function checkCell(cell) { return cell === symbol; });
  // };

  exports.Board = Board;
})(this);
