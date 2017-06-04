describe('Board', function() {

  var board;
  beforeEach(function() {
    board = new Board()
  });

  it('is initialized with an array of empty cells', function() {
    expect(board.grid()).toEqual([['', '', ''],
                                   ['', '', ''],
                                   ['', '', '']])
  });


});
