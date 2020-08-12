const { randomCode } = require('../helpers');
const Room = require('../models/room');

const create = async (socket, data) => {
  const allCodes = await Room.find({}, { code: 1 }).lean();
  let code = randomCode(4);
  while (allCodes.includes(code)) {
    code = randomCode(4);
  }
  const roomInfo = {
    code,
    members: [{
      name: data.name,
      socketId: socket.id,
      host: true,
    }],
  };
  if (data.isPrivate) {
    roomInfo.password = randomCode(6);
  }
  const room = await Room.create(roomInfo);
  socket.join(room.code);
  socket.emit('room created', room);
  console.log(socket.rooms);
};

const join = async (socket, data) => {
  const { code, password, name } = data;
  const [room] = await Room.find({ code }).lean();
  if (!room || (room.password && room.password !== password)) {
    socket.emit('error message', {
      message: 'No room found!',
    });
    return;
  }
  let { members } = room;
  if (!members.find((m) => m.name === name)) {
    members.push({
      host: false,
      socketId: socket.id,
      name: data.name,
    });
  } else {
    members = members.map((m) => (m.name === name ? { ...m, socketId: socket.id } : m));
  }
  await Room.findOneAndUpdate({ code }, { members }, { new: true }, (err, updatedRoom) => {
    if (err) {
      socket.emit('error', err);
    } else {
      socket.emit('room joined', updatedRoom);
      socket.to(code).emit('room updated', updatedRoom);
      socket.join(code);
    }
  });
};

module.exports = {
  create,
  join,
};
