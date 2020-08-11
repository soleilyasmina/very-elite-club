const { createRoom } = require('./create-room');

module.exports = async (message, ws, wss) => {
  const payload = JSON.parse(message);
  switch (payload.type) {
    case 'createRoom':
      await createRoom(payload, ws);
      break;
    default:
      ws.send({ error: 'No luck!' });
  }
};
