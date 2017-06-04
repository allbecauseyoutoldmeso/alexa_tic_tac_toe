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

  it('has a method for marking a cell', function() {
    board.take(0,1,'x')
    expect(board.grid()).toEqual([['', 'x', ''],
                                  ['', '', ''],
                                  ['', '', '']])
  })


});
