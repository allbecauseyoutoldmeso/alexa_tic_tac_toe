(function(exports) {

  function Game(boardSize) {
    this._board = new Board(boardSize);
    this._player = new Player();
    this._robot = new Robot();
    this._currentPlayer = this._player;
  }

  Game.prototype.switchPlayer = function() {
    if(this._currentPlayer === this._player) {
      this._currentPlayer = this._robot;
    } else {
      this._currentPlayer = this._player;
    }
  };

  exports.Game = Game;
})(this);
