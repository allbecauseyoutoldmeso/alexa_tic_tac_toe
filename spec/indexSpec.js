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
