describe('#eventHandler', function() {
  it('recognises a launch request and triggers a welcome message', function() {
    spyOn(self, 'welcome');
    eventHandler(launchIntentEvent(), alexaContext());
    expect(self.welcome).toHaveBeenCalled();
  });
  it('recognises an intent request and hands the request to the intentHandler function', function() {
    spyOn(self, 'intentHandler');
    eventHandler(topLeftEvent(), alexaContext());
    expect(self.intentHandler).toHaveBeenCalled();
  });
});

describe('#welcome', function() {
  it('returns a greeting', function() {
    var callback = jasmine.createSpy('callback');
    welcome(callback);
    expect(callback).toHaveBeenCalledWith(buildSpeechResponse('welcome to tic tac toe', 'select a cell by row and column .  for example top left or middle right or bottom middle', false));
  });
  it('initiates a game', function() {
    var callback = jasmine.createSpy('callback');
    expect(self.game).toEqual(jasmine.any(Game));
  });
});

describe('#intentHandler', function() {
  it('recognises a playIntent and triggers a move', function() {
    eventHandler(launchIntentEvent(), alexaContext());
    eventHandler(topLeftEvent(), alexaContext());
    console.log(self.game.board());
    expect(self.game._board._grid).toEqual([['x', '', ''],
                                              ['', '', ''],
                                              ['', '', '']]);
  });
});
