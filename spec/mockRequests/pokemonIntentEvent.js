(function(exports) {

  function pokemonIntentEvent() {
    return {
    "session": {
      "sessionId": "SessionId.5f29272b-432f-4d06-8853-67653d15b54e",
      "application": {
        "applicationId": "amzn1.ask.skill.4cce1f39-0aa7-48e6-9394-47587cfc5545"
      },
      "attributes": {},
      "user": {
        "userId": "amzn1.ask.account.AEGV4ENEZT5WM7XHI32TL2CCTFD4WIMAZCDZ6FNUFJGZE6N2PLM4LIGXVQQEXHNNE6YEDLGMEXLCYNVTXTGBVPRYADXEJZPCPH2G6FXRAJQOTNNIYRW5AK5XOQZWQZPQKLA7W2WN5J34FODG4RPRRJWZRGFLPWYCWTFANHS2YYK5PZA3FOWW6522SZP24D3MB6BU6RBWY47756Q"
      },
      "new": false
    },
    "request": {
      "type": "IntentRequest",
      "requestId": "EdwRequestId.d1fded47-ea1a-4d00-a708-bc73bb8de664",
      "locale": "en-GB",
      "timestamp": "2017-06-11T14:30:38Z",
      "intent": {
        "name": "PlayIntent",
        "slots": {
          "column": {
            "name": "column",
            "value": "Pokémon"
          },
          "row": {
            "name": "row",
            "value": "bottom"
          }
        }
      }
    },
    "version": "1.0"
  };
}

  exports.pokemonIntentEvent = pokemonIntentEvent;
})(this);
