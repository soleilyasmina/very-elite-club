const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const PORT = process.env.PORT || 3030;

app.get('/', (req, res) => {
  res.send('Hello!');
});

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(message);
    ws.send(`${message} sent.`);
  });

  console.log('Connection successful!');
  ws.send('Successful connection!');
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
