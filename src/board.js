(function(exports) {

  function Board() {
    this._grid = [['', '', ''],
                  ['', '', ''],
                  ['', '', '']]
  }

  Board.prototype.grid = function() {
    return this._grid
  }

  exports.Board = Board;
})(this);
