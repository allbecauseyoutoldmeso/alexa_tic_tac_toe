describe('Board', function() {

  var board;
  beforeEach(function() {
    board = new Board(3);
  });

  it('is initialized with a specified number of empty columns and rows', function() {
    expect(board.grid()).toEqual([['', '', ''],
                                  ['', '', ''],
                                  ['', '', '']]);
  });

  describe('#take', function() {
    it('is a function for marking a cell', function() {
      board.take(0,1,'x');
      expect(board.grid()).toEqual([['', 'x', ''],
                                    ['', '', ''],
                                    ['', '', '']]);
    });
    it('raises an error if a cell is already taken', function() {
      board.take(2,2,'x');
      expect(function() { board.take(2,2,'o'); }).toThrow('that cell is already taken');
    });
  });

  describe('#hasWon', function() {
    it('returns true if player has a row', function() {
      spyOn(board, 'grid').and.returnValue([['o', 'o', 'x'],
                                            ['x', 'x', 'x'],
                                            ['0', 'o', '']]);
      expect(board.hasWon('x')).toBeTruthy();
    });
  });

});
