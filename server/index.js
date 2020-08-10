const express = require('express');
const http = require('http');
const path = require('path');
const WebSocket = require('ws');

const guide = require('./controllers');
require('./db');

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(wss, ws);
    guide(message);
  });

  console.log('Connection successful!');
  ws.send('Successful connection!');
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
