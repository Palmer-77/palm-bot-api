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
  else if (event.message.type === 'สวัสดี' || event.message.type === 'หวัดดี' ) {
    const payload = {
      type : "text",
      text : "ก็มาดิครับ"
    };
    return client.replyMessage(event.replyToken, payload);
  }
  else if (event.message.type === 'ปาล์ม' || event.message.type === 'palm' ) {
    const payload = {
      type : "text",
      text : "https://www.facebook.com/BSPHOTOSHOT"
    };
    return client.replyMessage(event.replyToken, payload);
  }
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
