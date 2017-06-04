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

  it('currentPlayer is initially the real player', function() {
    expect(game._currentPlayer).toEqual(jasmine.any(Player));
  });

  describe('#switchPlayer', function() {
    it('switches the current player', function() {
      game.switchPlayer();
      expect(game._currentPlayer).toEqual(jasmine.any(Robot));
    });
  });

  describe('#playerPlay', function() {
    it('marks the board with an x', function() {
      game.playerPlay(0,2);
      expect(game._board.grid()).toEqual([['', '', 'x'],
                                         ['', '', ''],
                                         ['', '', '']]);
    });
  });

  describe('#robotPlay', function() {
    it('marks the board with a o', function() {
      spyOn(game._robot, 'choice').and.returnValue(0);
      game.robotPlay();
      expect(game._board.grid()).toEqual([['o', '', ''],
                                         ['', '', ''],
                                         ['', '', '']]);
    });
  });


});
