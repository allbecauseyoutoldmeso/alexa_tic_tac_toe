(function(exports) {

  function Player(boardSize) {
    this._points = 0;
  }

  Player.prototype.points = function() {
    return this._points;
  };

  Player.prototype.addPoints = function(points) {
    this._points += points;
  };

  exports.Player = Player;
})(this);
