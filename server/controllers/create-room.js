const Room = require('../models/room');
const { randomCode } = require('../helpers');

const createRoom = async (payload, ws) => {
  const { data } = payload;
  let code = randomCode(4);
  const allCodes = await Room.find({}, { code: 1 }).lean();
  while (allCodes.includes(code)) {
    code = randomCode(4);
  }
  const roomInfo = {
    code,
    host: data.username,
    members: [
      {
        name: data.username,
      },
    ],
  };
  if (data.isPrivate) {
    roomInfo.password = randomCode(6);
  }
  const room = await Room.create(roomInfo);
  const response = {
    type: 'createRoom',
    data: {
      room,
      user: room.members[0],
    },
  };
  const roomJSON = JSON.stringify(response);
  ws.send(roomJSON);
};

module.exports = {
  createRoom,
};
