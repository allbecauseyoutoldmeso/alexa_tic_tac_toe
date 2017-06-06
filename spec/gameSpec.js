describe('Game', function() {

  var game;
  beforeEach(function() {
    game = new Game(3);
  });

  it('is initialized with a board', function() {
    expect(game.board()).toEqual(jasmine.any(Board));
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
      game.playerPlay('top', 'right', function callback(x,y,z) { function dummyCallback(x,y,z) { } });
      expect(game._board.grid()[0][2]).toEqual('x');
    });
    it('does a different thing if the cell is already taken', function() {
      spyOn(game, 'explainMistake');
      game.playerPlay(0,0);
      game.playerPlay(0,0);
      expect(game.explainMistake).toHaveBeenCalled();
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
    it('continues looping until it locates a free cell', function() {
      game.playerPlay(0,0);
      game.playerPlay(0,1);
      game.playerPlay(0,2);
      game.playerPlay(1,0);
      game.playerPlay(1,1);
      game.playerPlay(1,2);
      game.playerPlay(2,0);
      game.playerPlay(2,1);
      game.robotPlay();
      expect(game._board.grid()).toEqual([['x', 'x', 'x'],
                                          ['x', 'x', 'x'],
                                          ['x', 'x', 'o']]);
    });
  });

});
