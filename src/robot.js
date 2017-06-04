(function(exports) {

  function Robot() {
    this._points = 0;
  }

  Robot.prototype.points = function() {
    return this._points;
  };

  Robot.prototype.addPoints = function(points) {
    this._points += points;
  };

  Robot.prototype.symbol = function() {
    return 'o';
  };

  exports.Robot = Robot;
})(this);
