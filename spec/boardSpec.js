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
                                            ['', 'o', '']]);
      expect(board.hasWon('x')).toBeTruthy();
    });
    it('returns true if player has a column', function() {
      spyOn(board, 'grid').and.returnValue([['x', 'o', ''],
                                            ['x', 'o', 'o'],
                                            ['x', 'x', '']]);
      expect(board.hasWon('x')).toBeTruthy();
    });
  });


  describe('#anyRowWin', function() {
    it('returns true if player has a row', function() {
      spyOn(board, 'grid').and.returnValue([['o', 'o', 'x'],
                                            ['x', 'x', 'x'],
                                            ['', 'o', '']]);
      expect(board.anyRowWin('x')).toBeTruthy();
    });
    it('returns false if player has no row', function() {
      spyOn(board, 'grid').and.returnValue([['o', 'o', 'x'],
                                            ['x', 'x', 'x'],
                                            ['', 'o', '']]);
      expect(board.anyRowWin('o')).toBeFalsy();
    });
  });

  describe('#anyColumnWin', function() {
    it('returns true if player has a column', function() {
      spyOn(board, 'grid').and.returnValue([['x', 'o', ''],
                                            ['x', 'x', 'o'],
                                            ['x', 'o', '']]);
      expect(board.anyColumnWin('x', board.grid())).toBeTruthy();
    });
    it('returns false if player has no column', function() {
      spyOn(board, 'grid').and.returnValue([['x', 'o', ''],
                                            ['x', 'x', 'o'],
                                            ['x', 'o', '']]);
      expect(board.anyColumnWin('o', board.grid())).toBeFalsy();
    });
  });

  describe('#anyDiagonalWin', function() {
    it('returns true if player has a diagonal', function() {
      spyOn(board, 'grid').and.returnValue([['x', 'o', ''],
                                            ['x', 'x', 'o'],
                                            ['o', 'o', 'x']]);
      expect(board.anyDiagonalWin('x', board.grid())).toBeTruthy();
    });
    it('returns false if player has no diagonal', function() {
      spyOn(board, 'grid').and.returnValue([['x', 'o', ''],
                                            ['x', 'x', 'o'],
                                            ['o', 'o', 'x']]);
      expect(board.anyDiagonalWin('o', board.grid())).toBeFalsy();
    });
  });

  describe('#dimensions', function() {
    it('returns an array of columns', function() {
      expect(board.dimensions()).toEqual([0, 1, 2]);
    });
  });

});
