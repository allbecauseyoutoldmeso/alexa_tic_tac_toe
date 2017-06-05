(function(exports) {

  function topLeftEvent() {
    return {
    "session": {
      "sessionId": "SessionId.0eb366f1-1897-4ebe-ae15-99fb018150c0",
      "application": {
        "applicationId": "amzn1.ask.skill.4cce1f39-0aa7-48e6-9394-47587cfc5545"
      },
      "attributes": {},
      "user": {
        "userId": "amzn1.ask.account.AEGV4ENEZT5WM7XHI32TL2CCTFD4WIMAZCDZ6FNUFJGZE6N2PLM4LIGXVQQEXHNNE6YEDLGMEXLCYNVTXTGBVPRYADXEJZPCPH2G6FXRAJQOTNNIYRW5AK5XOQZWQZPQKLA7W2WN5J34FODG4RPRRJWZRGFLPWYCWTFANHS2YYK5PZA3FOWW6522SZP24D3MB6BU6RBWY47756Q"
      },
      "new": true
    },
    "request": {
      "type": "IntentRequest",
      "requestId": "EdwRequestId.d05c76f0-7580-48a9-afc7-c1d24736e2df",
      "locale": "en-US",
      "timestamp": "2017-06-05T13:55:49Z",
      "intent": {
        "name": "PlayIntent",
        "slots": {
          "column": {
            "name": "column",
            "value": "left"
          },
          "row": {
            "name": "row",
            "value": "top"
          }
        }
      }
    },
    "version": "1.0"
    };
  }

  exports.topLeftEvent = topLeftEvent;
})(this);
