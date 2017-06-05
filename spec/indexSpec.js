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
});
