const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const line = require('@line/bot-sdk');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
app.use(bodyParser.json());
app.use(cors());
app
  .prepare()
  .then(() => {
    const server = express();
    server.post('/register', async (req, res) => {
      console.log('🚀 ~ server.post ~ req', req.body);
      const replyToken = req.body.replyToken ? req.body.replyToken : '';
      const client = new line.Client({
        channelAccessToken: replyToken,
      });
      console.log('🚀 ~ server.post ~ client', client);
      res.status(200).send(true);
    });
    server.get('*', (req, res) => {
      return handle(req, res);
    });
    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
