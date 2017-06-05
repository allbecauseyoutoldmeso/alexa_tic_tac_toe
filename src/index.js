exports.handler = function (event, context) {
    try {
        if (event.request.type === 'LaunchRequest') {
            onLaunch(function callback(speechletResponse) {
              context.succeed(buildResponse(event.session.attributes, speechletResponse));
            });
        } else if (event.request.type === 'IntentRequest') {
            onIntent(event.request, function callback(speechletResponse) {
              context.succeed(buildResponse(event.session.attributes, speechletResponse));
            });
        }
    } catch (e) {
        context.fail('Exception: ' + e);
    }
};


function onLaunch(callback) {
    callback(buildSpeechResponse('welcome to tic tac toe', 'select a cell.  for example top left or middle right or bottom middle', true));
}

function onIntent(intentRequest, callback) {
  var intentName = intentRequest.intent.name;
  if (intentName == 'PlayIntent') {
    play(callback);
  } else {
    throw 'Invalid intent';
  }
}

function play(callback) {
  callback(buildSpeechResponse('you made a move', '', 'true'));
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
