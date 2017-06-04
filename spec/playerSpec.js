describe('Player', function() {

  var player;
  beforeEach(function() {
    player = new Player();
  });

  it('is initialized with zero points', function() {
    expect(player.points()).toEqual(0);
  });

  describe('#addPoints', function() {
    it('increases player points', function() {
      player.addPoints(1);
      expect(player.points()).toEqual(1);  
    });
  });


});
