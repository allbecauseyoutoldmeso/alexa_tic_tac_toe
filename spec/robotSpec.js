describe('Robot', function() {

  var robot;
  beforeEach(function() {
    robot = new Robot();
  });

  it('is initialized with zero points', function() {
    expect(robot.points()).toEqual(0);
  });

  describe('#addPoints', function() {
    it('increases robot points', function() {
      robot.addPoints(1);
      expect(robot.points()).toEqual(1);
    });
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
