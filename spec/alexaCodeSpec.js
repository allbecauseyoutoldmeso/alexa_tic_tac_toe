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
  it('recognises a help request and triggers a help message', function() {
    spyOn(self, 'support');
    eventHandler(helpIntentEvent(), alexaContext());
    expect(self.support).toHaveBeenCalled();
  });
});

describe('#welcome', function() {
  it('returns a greeting', function() {
    var callback = jasmine.createSpy('callback');
    welcome(callback);
    expect(callback).toHaveBeenCalledWith(buildSpeechResponse('welcome to tic tac toe. to play the game select a cell by row and column. for example say top left or bottom middle. you can ask for help if you need more information, or say stop to exit.', 'select a cell by row and column. for example say top left or middle right or bottom middle.', false));
  });
  it('initiates a game', function() {
    var callback = jasmine.createSpy('callback');
    expect(self.game).toEqual(jasmine.any(Game));
  });
});

describe('#sequence of a playIntent', function() {
  it('a playIntent changes the requested cell on the board', function() {
    eventHandler(launchIntentEvent(), alexaContext());
    eventHandler(topLeftEvent(), alexaContext());
    expect(self.game.board().grid()[0][0]).toEqual('x');
  });
  it('the player gets a confirmation message', function() {
    spyOn(self, 'buildSpeechResponse');
    eventHandler(launchIntentEvent(), alexaContext());
    eventHandler(topLeftEvent(), alexaContext());
    expect(self.buildSpeechResponse).toHaveBeenCalled();
  });
  it('the robot also plays', function() {
    eventHandler(launchIntentEvent(), alexaContext());
    eventHandler(topLeftEvent(), alexaContext());
    expect(self.game.board().grid().some(function checkRow(row) {
      return row.some(function checkCell(cell) {
        return cell === 'o';
      });
    })).toBeTruthy();
  });
  it('an error is raised if the player tries to take a cell that is not free', function() {
    spyOn(self, 'buildSpeechResponse');
    eventHandler(launchIntentEvent(), alexaContext());
    eventHandler(topLeftEvent(), alexaContext());
    eventHandler(topLeftEvent(), alexaContext());
    expect(self.buildSpeechResponse).toHaveBeenCalledWith('that cell is already taken', 'select another cell', 'false');
  });
  it('generates a win message if the player has won', function() {
    self.game = new Game(3);
    self.game._board._grid = [['','',''], ['','x',''], ['','','x']];
    spyOn(self, 'buildSpeechResponse');
    eventHandler(topLeftEvent(), alexaContext());
    expect(self.buildSpeechResponse).toHaveBeenCalledWith('you played top left. you won.', '', 'true');
  });
  it('generates a draw message if the board is full', function() {
    self.game = new Game(3);
    self.game._board._grid = [['','o','x'], ['x','x','o'], ['o','x','o']];
    spyOn(self, 'buildSpeechResponse');
    eventHandler(topLeftEvent(), alexaContext());
    expect(self.buildSpeechResponse).toHaveBeenCalledWith('you played top left. there are no cells left. the game is a draw.', '', 'true');
  });
  it('generates a lose message if the computer won', function() {
    self.game = new Game(3);
    self.game._board._grid = [['','o','x'], ['x','o','o'], ['o','','x']];
    spyOn(self, 'buildSpeechResponse');
    eventHandler(topLeftEvent(), alexaContext());
    expect(self.buildSpeechResponse).toHaveBeenCalledWith('you played top left. the computer played bottom middle. the computer won.', '', 'true');
  });
});

describe('#support', function() {
  it('provides the user with useful information', function() {
    var callback = jasmine.createSpy('callback');
    support(callback);
    expect(callback).toHaveBeenCalledWith(buildSpeechResponse('tic tac toe is usually played with a pencil and paper. two players take turns marking the cells in a three by three grid. the first player to place three of their marks in a horizontal, vertical, or diagonal line wins. to play the game with alexa select a cell by row and then column. for example you can say middle right or bottom middle. which cell would you like to select?', 'select a cell by row and column. for example say top left or middle right or bottom middle', false));
  });
});

describe('#goodbye', function() {
  it('generates a goodbye message and ends the session', function() {
    var callback = jasmine.createSpy('callback');
    goodbye(callback);
    expect(callback).toHaveBeenCalledWith(buildSpeechResponse('goodbye', '', true));
  });
});
