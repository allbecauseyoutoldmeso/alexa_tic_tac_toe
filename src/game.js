(function(exports) {

  function Game(boardSize) {
    this._board = new Board(boardSize);
  }

  exports.Game = Game;
})(this);
