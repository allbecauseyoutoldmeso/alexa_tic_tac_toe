(function(exports) {

  function Game(boardSize) {
    this._boardSize = boardSize;
    this._board = new Board(boardSize);
    this._player = new Player();
    this._robot = new Robot();
    this._currentPlayer = this._player;
  }

  Game.prototype.board = function() {
    return this._board;
  };

  Game.prototype.switchPlayer = function() {
    this._currentPlayer === this._player ? this._currentPlayer = this._robot : this._currentPlayer = this._player;
  };

  Game.prototype.playerPlay = function(row, column) {
    if(this._board.grid()[row][column] !== '') {
      this.explainMistake();
    } else {
      this._board.take(row, column, this._player.symbol());
    }
  };

  Game.prototype.robotPlay = function() {
    var row = this._robot.choice(this._boardSize);
    var column = this._robot.choice(this._boardSize);
    if(this._board.grid()[row][column] !== '') {
      this.robotPlay();
    } else {
      this._board.take(row, column, this._robot.symbol());
    }
  };

  Game.prototype.explainMistake = function() {

  };

  exports.Game = Game;
})(this);
