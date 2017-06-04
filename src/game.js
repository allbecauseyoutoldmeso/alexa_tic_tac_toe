(function(exports) {

  function Game(boardSize) {
    this._boardSize = boardSize;
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

  Game.prototype.playerPlay = function(row, column) {
    this._board.take(row, column, this._player.symbol());
  };

  Game.prototype.robotPlay = function() {
    this._board.take(this._robot.choice(this._boardSize), this._robot.choice(this._boardSize), this._robot.symbol());
  };

  exports.Game = Game;
})(this);
