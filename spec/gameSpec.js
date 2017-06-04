describe('Game', function() {

  var game;
  beforeEach(function() {
    game = new Game(3);
  });

  it('is initialized with a board', function() {
    expect(game._board).toEqual(jasmine.any(Board));
  });

  it('is initialized with a player', function() {
    expect(game._player).toEqual(jasmine.any(Player));
  });


});
