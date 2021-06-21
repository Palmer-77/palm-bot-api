'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: "l/bYa0rCwnTt+C1bffmn5jVGr3TLNhGdOJOd9l7d/2mdGjFaK9tyR3brrqLKo0r3AX/duIiyJ17Ioj0amJN0gyqdSuIlw9Mjx3/Ghn0SzQE5RTwGWkKWs3IBqwJu49cujEj3YNgnThnzmmAzW+/DUwdB04t89/1O/w1cDnyilFU=",
  channelSecret: "4a29127e9167281f3de947c921116f88",
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  else if (event.message.type === 'text' || event.message.type === 'หวัดดี' ) {
    const payload = {
      "type": "bubble",
      "direction": "ltr",
      "header": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "ทดสอบอยู่",
            "align": "center",
            "contents": []
          }
        ]
      },
      "hero": {
        "type": "image",
        "url": "https://scontent.fphs2-1.fna.fbcdn.net/v/t1.6435-9/203691700_3035539753340898_5356628347126557590_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeEyVyD3pprWJaDUFmxw3hiY9BanzE1svXD0FqfMTWy9cALfv0cK3kioC17Qnfh2Ec5DRtR3lEQ45_LxvH0Afagf&_nc_ohc=h6FR3F1bK2QAX8CCDU_&tn=30ea5gGN8jOV0ffP&_nc_ht=scontent.fphs2-1.fna&oh=e6ea5dcb22a928aece23f1f09f9bf3be&oe=60D68156",
        "align": "center",
        "gravity": "center",
        "size": "full",
        "aspectRatio": "1.51:1",
        "aspectMode": "cover"
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "เมนู",
            "align": "center",
            "contents": []
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "button",
            "action": {
              "type": "uri",
              "label": "อยยากรู้จัก",
              "uri": "https://linecorp.com"
            }
          }
        ]
      }
    };
    return client.replyMessage(event.replyToken, payload);
  }
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
