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

describe('#sequence of a playIntent', function() {
  it('a playIntent changes the requested cell on the board', function() {
    eventHandler(launchIntentEvent(), alexaContext());
    eventHandler(topLeftEvent(), alexaContext());
    expect(self.game.board().grid()).toEqual([['x', '', ''],
                                              ['', '', ''],
                                              ['', '', 'o']]);
  });
  it('an error is raised if the player tries to take a cell that is not free', function() {
    spyOn(self, 'buildSpeechResponse');
    eventHandler(launchIntentEvent(), alexaContext());
    eventHandler(topLeftEvent(), alexaContext());
    eventHandler(topLeftEvent(), alexaContext());
    expect(self.buildSpeechResponse).toHaveBeenCalledWith('that cell is already taken', '', 'false');
  });
});
