describe('Player', function() {

  var player;
  beforeEach(function() {
    player = new Player();
  });

  describe('#symbol', function() {
    it('returns x', function() {
      expect(player.symbol()).toEqual('x');
    });
  });


});
