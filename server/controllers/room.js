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
      connected: true,
    }],
    typing: [],
  };
  if (data.isPrivate) {
    roomInfo.password = randomCode(6);
  }
  const room = await Room.create(roomInfo);
  socket.join(room.code);
  socket.emit('room created', room);
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
      connected: true,
    });
  } else {
    members = members.map((m) => (m.name === name ? { ...m, socketId: socket.id, connected: true } : m));
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

const ttl = async (socket, data) => {
  if (!data) return;
  const { code } = data;
  const rooms = await Room.find({ code });
  console.log(rooms.length);
  if (!rooms.length) {
    socket.leave(code);
    socket.emit('room closed', {
      message: 'Room automatically closed after 6 hours.',
    });
  }
};

const message = async (socket, data) => {
  if (!data) return;
  const { code, content, name } = data;
  const newMessage = {
    name, content,
  };
  const room = await Room.findOne({ code });
  await Room.findOneAndUpdate({ code }, {
    messages: [...room.messages, newMessage],
    typing: room.typing.filter((t) => t !== name),
  }, { new: true }, (err, newRoom) => {
    if (err) {
      socket.emit('message error', { error: err.message });
      return;
    }
    socket.emit('room updated', newRoom);
    socket.to(code).emit('room updated', newRoom);
  });
};

const startTyping = async (socket, data) => {
  const { code, name } = data;
  const room = await Room.findOne({ code });
  await Room.findOneAndUpdate({ code }, { typing: [...room.typing, name] }, { new: true }, (err, newRoom) => {
    if (err) {
      socket.emit('server error', {
        error: err.message,
      });
      return;
    }
    socket.to(code).emit('room updated', newRoom);
  });
};

const stopTyping = async (socket, data) => {
  const { code, name } = data;
  const room = await Room.findOne({ code });
  await Room.findOneAndUpdate({ code }, { typing: room.typing.filter((t) => t !== name) }, { new: true }, (err, newRoom) => {
    if (err) {
      socket.emit('server error', {
        error: err.message,
      });
      return;
    }
    socket.to(code).emit('room updated', newRoom);
  });
};

const disconnect = async (socket) => {
  const code = Object.keys(socket.rooms).find((room) => room.length === 4);
  const room = await Room.findOne({ code }).lean();
  const newMembers = room.members.map((mem) => (mem.socketId === socket.id ? { ...mem, connected: false } : mem));
  const { name } = room.members.find((mem) => mem.socketId === socket.id);
  await Room.findOneAndUpdate({ code }, {
    members: newMembers,
    typing: room.typing.filter((t) => t !== name),
  }, { new: true }, (err, newRoom) => {
    if (err) {
      socket.emit('server error', {
        error: err.message,
      });
      return;
    }
    socket.to(code).emit('room updated', newRoom);
  });
};

module.exports = {
  create,
  join,
  ttl,
  message,
  startTyping,
  stopTyping,
  disconnect,
};
