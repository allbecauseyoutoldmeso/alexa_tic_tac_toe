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
});

describe('#welcome', function() {
  it('returns a greeting', function() {
    var callback = jasmine.createSpy('callback');
    welcome(callback);
    expect(callback).toHaveBeenCalledWith(buildSpeechResponse('welcome to tic tac toe', 'select a cell by row and column .  for example top left or middle right or bottom middle', false));
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
    expect(self.buildSpeechResponse).toHaveBeenCalledWith('that cell is already taken', '', 'false');
  });
  it('generates a win message if the player has won', function() {
    self.game = new Game(3);
    self.game._board._grid = [['','',''], ['','x',''], ['','','x']];
    spyOn(self, 'buildSpeechResponse');
    eventHandler(topLeftEvent(), alexaContext());
    expect(self.buildSpeechResponse).toHaveBeenCalledWith('you played top left.  you won.', '', 'true');
  });
  it('generates a draw message if the board is full', function() {
    self.game = new Game(3);
    self.game._board._grid = [['','o','x'], ['x','x','o'], ['o','x','o']];
    spyOn(self, 'buildSpeechResponse');
    eventHandler(topLeftEvent(), alexaContext());
    expect(self.buildSpeechResponse).toHaveBeenCalledWith('you played top left.  the game is a draw.', '', 'true');
  });
  it('generates a lose message if the computer won', function() {
    self.game = new Game(3);
    self.game._board._grid = [['','o','x'], ['x','o','o'], ['o','','x']];
    spyOn(self, 'buildSpeechResponse');
    eventHandler(topLeftEvent(), alexaContext());
    expect(self.buildSpeechResponse).toHaveBeenCalledWith('you played top left.  the computer played 2 1.  the computer won.', '', 'true');
  });
});
