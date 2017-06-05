describe('#eventHandler', function() {
  it('recognises a launchIntent and triggers a welcome message', function() {
    spyOn(self, 'welcome');
    eventHandler(launchIntentEvent(), alexaContext());
    expect(self.welcome).toHaveBeenCalled();
  });
});
