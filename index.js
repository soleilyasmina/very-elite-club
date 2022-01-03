const express = require('express');
const http = require('http');
const path = require('path');

require('./server/db');
const control = require('./server/controllers');

const PORT = process.env.PORT || 3030;

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('Connection established!');
  socket.on('roomCreate', (data) => control.room.create(socket, data));
  socket.on('roomJoin', (data) => control.room.join(socket, data));
  socket.on('roomTTL', (data) => control.room.ttl(socket, data));
  socket.on('roomMessage', (data) => control.room.message(socket, data));
  socket.on('roomStartTyping', (data) => control.room.startTyping(socket, data));
  socket.on('roomStopTyping', (data) => control.room.stopTyping(socket, data));
  socket.on('disconnecting', (reason) => control.room.disconnect(socket, reason));
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
