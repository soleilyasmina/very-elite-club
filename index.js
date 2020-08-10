const express = require('express');
const http = require('http');
const path = require('path');
const WebSocket = require('ws');

const guide = require('./server/controllers');
require('./server/db');

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    guide(message, wss, ws);
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
