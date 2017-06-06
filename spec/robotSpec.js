describe('Robot', function() {

  var robot;
  beforeEach(function() {
    robot = new Robot();
  });

  describe('#symbol', function() {
    it('returns o', function() {
      expect(robot.symbol()).toEqual('o');
    });
  });

  describe('#choice', function() {
    it('returns a random value given a specified board size', function() {
      expect([0, 1, 2]).toContain(robot.choice(3));
    });
  });


});
