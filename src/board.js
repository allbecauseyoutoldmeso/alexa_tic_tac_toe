(function(exports) {

  function Board() {
    this._grid = [['', '', ''],
                  ['', '', ''],
                  ['', '', '']]
  }

  Board.prototype.grid = function() {
    return this._grid
  }

  Board.prototype.take = function(row, column, symbol) {
    this._grid[row][column] = symbol
  }

  exports.Board = Board;
})(this);
