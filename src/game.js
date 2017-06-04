(function(exports) {

  function Game(boardSize) {
    this._board = new Board(boardSize);
    this._player = new Player();
  }

  exports.Game = Game;
})(this);
