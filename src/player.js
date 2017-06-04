(function(exports) {

  function Player() {
    this._points = 0;
  }

  Player.prototype.points = function() {
    return this._points;
  };

  Player.prototype.addPoints = function(points) {
    this._points += points;
  };

  Player.prototype.symbol = function() {
    return 'x';
  };

  exports.Player = Player;
})(this);
