// exports.handler = function(event, context) { eventHandler(event, context) };

function eventHandler(event, context) {
    try {
        if (event.request.type === 'LaunchRequest') {
            welcome(function callback(speechletResponse) {
              context.succeed(buildResponse(event.session.attributes, speechletResponse));
            });
        } else if (event.request.type === 'IntentRequest') {
            intentHandler(event.request, function callback(speechletResponse) {
              context.succeed(buildResponse(event.session.attributes, speechletResponse));
            });
        }
    } catch (e) {
        context.fail('Exception: ' + e);
    }
}


function welcome(callback) {
    self.game = new Game(3);
    callback(buildSpeechResponse('welcome to tic tac toe', 'select a cell by row and column .  for example top left or middle right or bottom middle', false));
}

function intentHandler(intentRequest, callback) {
  console.log('i was called');
  console.log(intentRequest);
  console.log(intentRequest.intent.name);
  var intentName = intentRequest.intent.name;
  console.log(intentName);
  console.log(intentRequest.intent.slots.row.value);
  var row = intentRequest.intent.slots.row.value;
  console.log(row);
  console.log(intentRequest.intent.slots.column.value);
  var column = intentRequest.intent.slots.column.value;
  console.log(column);
  if (intentName == 'PlayIntent') {
    play(row, column, callback);
  } else {
    throw 'Invalid intent';
  }
}

function play(row, column, callback) {
  console.log('play...')
  console.log('column ' + column)
  console.log('row ' + row)
  var rows = {top: 0, middle: 1, bottom: 2};
  var columns = {left: 0, middle: 1, right: 2};
  console.log(rows[row]);
  console.log(columns[column]);
  self.game.playerPlay(rows[row], columns[column]);
  callback(buildSpeechResponse('you played' + row + column, '', 'false'));
}

function buildSpeechResponse(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: 'PlainText',
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: 'PlainText',
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: '1.0',
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}

function Board(size) {
  this._grid = [];
  for(i = 0; i < size; i++) {
    this._grid.push(makeRow(size));
  }
  this._size = size;
}

function makeRow(length) {
    var row = [];
    for(j = 0; j < length; j++) {
      row.push('');
    }
    return row;
  }

Board.prototype.grid = function() {
  return this._grid;
};

Board.prototype.take = function(row, column, symbol) {
  if(this._grid[row][column] !== '') {
    throw('that cell is already taken');
  }
  this._grid[row][column] = symbol;
};

Board.prototype.hasWon = function(symbol) {
  return this.anyRowWin(symbol) || this.anyColumnWin(symbol, this.grid()) || this.anyDiagonalWin(symbol, this.grid());
};


Board.prototype.anyRowWin = function(symbol) {
  return this.grid().some(function checkRow(row) {
    return row.every(function checkCell(cell) {
      return cell === symbol;
    });
  });
};

Board.prototype.anyColumnWin = function(symbol, grid) {
  return this.dimensions().some(function checkColumn(column) {
    return grid.every(function checkRow(row) {
      return row[column] === symbol;
    });
  });
};


Board.prototype.anyDiagonalWin = function(symbol, grid) {
  return this.dimensions().every(function checkCell(cell) {
    return grid[cell][cell] === symbol || grid[cell][(grid.length-1)-cell] === symbol ;
  });
};

Board.prototype.dimensions = function() {
  var dimensions = [];
  for(k = 0; k < this._size; k++) {
    dimensions.push(k);
  }
  return dimensions;
};

function Game(boardSize) {
  this._boardSize = boardSize;
  this._board = new Board(boardSize);
  this._player = new Player();
  this._robot = new Robot();
  this._currentPlayer = this._player;
}

Game.prototype.board = function() {
  return this._board;
};

Game.prototype.switchPlayer = function() {
  this._currentPlayer === this._player ? this._currentPlayer = this._robot : this._currentPlayer = this._player;
};

Game.prototype.playerPlay = function(row, column) {
  if(this._board.grid()[row][column] !== '') {
    this.explainMistake();
  } else {
    this._board.take(row, column, this._player.symbol());
  }
};

Game.prototype.robotPlay = function() {
  var row = this._robot.choice(this._boardSize);
  var column = this._robot.choice(this._boardSize);
  if(this._board.grid()[row][column] !== '') {
    this.robotPlay();
  } else {
    this._board.take(row, column, this._robot.symbol());
  }
};

Game.prototype.explainMistake = function() {

};

function Player() {
  this._points = 0;
}

Player.prototype.points = function() {
  return this._points;
};

Player.prototype.addPoints = function(points) {
  this._points += points;
};

Player.prototype.symbol = function() {
  return 'x';
};

function Robot() {
  this._points = 0;
}

Robot.prototype.points = function() {
  return this._points;
};

Robot.prototype.addPoints = function(points) {
  this._points += points;
};

Robot.prototype.symbol = function() {
  return 'o';
};

Robot.prototype.choice = function(size) {
  return Math.floor(Math.random() * size);
};
