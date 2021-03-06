// exports.handler = function(event, context) { eventHandler(event, context) };

function eventHandler(event, context) {
  try {
    if (event.request.type === 'LaunchRequest') {
      welcome(function callback(speechResponse) {
        context.succeed(buildResponse(event.session.attributes, speechResponse));
      });
    } else if (event.request.type === 'IntentRequest') {
      intentHandler(event.request, function callback(speechResponse) {
        context.succeed(buildResponse(event.session.attributes, speechResponse));
      });
    }
  } catch (e) {
    context.fail('Exception: ' + e);
  }
}

function welcome(callback) {
  this.game = new Game(3);
  callback(buildSpeechResponse('welcome to tic tac toe. to play the game select a cell by row and column. for example say top left or bottom middle. you can ask for help if you need more information, or say stop to exit.', 'select a cell by row and column. for example say top left or middle right or bottom middle.', false));
}

function support(callback) {
  callback(buildSpeechResponse('tic tac toe is usually played with a pencil and paper. two players take turns marking the cells in a three by three grid. the first player to place three of their marks in a horizontal, vertical, or diagonal line wins. to play the game with alexa select a cell by row and then column. for example you can say middle right or bottom middle. which cell would you like to select?', 'select a cell by row and column. for example say top left or middle right or bottom middle', false));
}

function notASlot(callback) {
  callback(buildSpeechResponse('that is not a valid cell.  select a cell by row and column.  for example say top right or bottom middle.', 'which cell would you like to select?', false));
}

function goodbye(callback) {
  callback(buildSpeechResponse('goodbye', '', true));
}

function intentHandler(intentRequest, callback) {
  var intentName = intentRequest.intent.name;
  if (intentName === 'AMAZON.HelpIntent') {
    support(callback);
  } else if (intentName === 'AMAZON.StopIntent') {
    goodbye(callback);
  } else if (intentName === 'PlayIntent') {
    this.game.playerPlay(intentRequest.intent.slots.row.value, intentRequest.intent.slots.column.value, callback);
  } else {
    throw 'Invalid intent';
  }
}

function Game(boardSize) {
  this._boardSize = boardSize;
  this._board = new Board(boardSize);
  this._player = new Player();
  this._robot = new Robot();
}

Game.prototype.board = function() {
  return this._board;
};

Game.prototype.playerPlay = function(row, column, callback) {
  var rows = {'top': 0, 'middle': 1, 'bottom': 2};
  var columns = {'left': 0, 'middle': 1, 'right': 2};
  if(! ['top','middle','bottom'].includes(row) || ! ['left','middle','right'].includes(column)) {
    notASlot(callback);
  } else if(this._board.grid()[rows[row]][columns[column]] !== '') {
    callback(buildSpeechResponse('that cell is already taken', 'select another cell', 'false'));
  } else {
    this._board.take(rows[row], columns[column], this._player.symbol());
    this.playerPlayOutcomes(row, column, callback);
  }
};

Game.prototype.playerPlayOutcomes = function(row, column, callback) {
  if(this._board.hasWon(this._player.symbol())) {
    callback(buildSpeechResponse('you played ' + row + ' ' + column + '. you won.', '', 'true'));
  } else if(this._board.isFull()) {
    callback(buildSpeechResponse('you played ' + row + ' ' + column + '. there are no cells left. the game is a draw.', '', 'true'));
  } else {
    this.robotPlay(row, column, callback);
  }
};

Game.prototype.robotPlay = function(playerRow, playerColumn, callback) {
  var robotRow = this._robot.choice(this._boardSize);
  var robotColumn = this._robot.choice(this._boardSize);
  if(this._board.grid()[robotRow][robotColumn] !== '') {
    this.robotPlay(playerRow, playerColumn, callback);
  } else {
    this._board.take(robotRow, robotColumn, this._robot.symbol());
    this.robotPlayOutcomes(playerRow, playerColumn, robotRow, robotColumn, callback);
  }
};

Game.prototype.robotPlayOutcomes = function(playerRow, playerColumn, robotRow, robotColumn, callback) {
  var rows = ['top', 'middle', 'bottom'];
  var columns = ['left', 'middle', 'right'];
  if(this._board.hasWon(this._robot.symbol())) {
    callback(buildSpeechResponse('you played ' + playerRow + ' ' + playerColumn + '. the computer played ' + rows[robotRow] + ' ' + columns[robotColumn] + '. the computer won.', '', 'true'));
  } else {
    callback(buildSpeechResponse('you played ' + playerRow + ' ' + playerColumn + '. the computer played ' + rows[robotRow] + ' ' + columns[robotColumn], 'select another cell by row and column', 'false'));
  }
};

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

Board.prototype.isFull = function() {
  return this.grid().every(function checkRow(row) {
    return row.every(function checkCell(cell) {
      return cell !== '';
    });
  });
};

function Player() {
}

Player.prototype.symbol = function() {
  return 'x';
};

function Robot() {
}

Robot.prototype.symbol = function() {
  return 'o';
};

Robot.prototype.choice = function(size) {
  return Math.floor(Math.random() * size);
};

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

function buildResponse(sessionAttributes, speechResponse) {
    return {
        version: '1.0',
        sessionAttributes: sessionAttributes,
        response: speechResponse
    };
}
