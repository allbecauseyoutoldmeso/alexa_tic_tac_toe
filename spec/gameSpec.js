describe('Game', function() {

  var game;
  beforeEach(function() {
    game = new Game(3);
  });

  it('is initialized with a board and two players', function() {
    expect(game._board).toEqual(jasmine.any(Board));    
  });


});
