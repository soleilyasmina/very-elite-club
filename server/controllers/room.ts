import Room from "../models/room";
import { RoomMember } from "../types";
import { randomCode } from "../utils";
import { Socket } from "socket.io";

const create = async (socket: Socket , data: any) => {
  const allCodesQuery = await Room.find({}, { code: 1 }).lean();
  const allCodes = Array.from(allCodesQuery);
  let code = randomCode(4);
  while (allCodes.includes(code)) {
    code = randomCode(4);
  }
  const roomInfo: any = {
    code,
    members: [
      {
        name: data.name,
        socketId: socket.id,
        host: true,
        connected: true,
        wins: 0,
      },
    ],
    typing: [],

  };
  if (data.isPrivate) {
    roomInfo.password = randomCode(6);
  }
  const room = await Room.create(roomInfo);
  socket.join(room.code);
  socket.emit("roomCreated", room);
};

const join = async (socket: Socket, data: any) => {
  const { code, password, name } = data;
  const [room] = await Room.find({ code }).lean();
  if (!room || (room.password && room.password !== password)) {
    socket.emit("serverError", {
      message: "No room found!",
    });
    return;
  }
  let { members } = room;
  if (!members.find((m: RoomMember) => m.name === name)) {
    members.push({
      host: false,
      socketId: socket.id,
      name: data.name,
      connected: true,
    });
  } else if (members.find((m: RoomMember) => m.name === name).connected) {
    socket.emit("invalidJoin", {
      message: "bad",
    });
    return;
  } else {
    members = members.map((m: RoomMember) =>
      m.name === name ? { ...m, socketId: socket.id, connected: true } : m
    );
  }
  Room.findOneAndUpdate(
    { code },
    { members },
    { new: true },
    (err, updatedRoom) => {
      if (err) {
        socket.emit("error", err);
      } else {
        socket.emit("roomJoined", updatedRoom);
        socket.to(code).emit("roomUpdated", updatedRoom);
        socket.join(code);
      }
    }
  );
};

const ttl = async (socket: Socket, data: any) => {
  if (!data) return;
  const { code } = data;
  const rooms = await Room.find({ code });
  if (!rooms.length) {
    socket.leave(code);
    socket.emit("roomClosed", {
      message: "Room automatically closed after 6 hours.",
    });
  }
};

const message = async (socket: Socket, data: any) => {
  if (!data) return;
  const { code, content, name } = data;
  const newMessage = {
    name,
    content,
  };
  const room = await Room.findOne({ code });
  Room.findOneAndUpdate(
    { code },
    {
      messages: [...room.messages, newMessage],
      typing: room.typing.filter((t: string) => t !== name),
    },
    { new: true },
    (err, newRoom) => {
      if (err) {
        socket.emit("messageError", { error: err.message });
        return;
      }
      socket.emit("roomUpdated", newRoom);
      socket.to(code).emit("roomUpdated", newRoom);
    }
  );
};

const startTyping = async (socket: Socket, data: any) => {
  const { code, name } = data;
  const room = await Room.findOne({ code });
  Room.findOneAndUpdate(
    { code },
    { typing: [...room.typing, name] },
    { new: true },
    (err, newRoom) => {
      if (err) {
        socket.emit("serverError", {
          error: err.message,
        });
        return;
      }
      socket.to(code).emit("roomUpdated", newRoom);
    }
  );
};

const stopTyping = async (socket: Socket, data: any) => {
  const { code, name } = data;
  const room = await Room.findOne({ code });
  Room.findOneAndUpdate(
    { code },
    { typing: room.typing.filter((t: string) => t !== name) },
    { new: true },
    (err, newRoom) => {
      if (err) {
        socket.emit("serverError", {
          error: err.message,
        });
        return;
      }
      socket.to(code).emit("roomUpdated", newRoom);
    }
  );
};

const disconnect = async (socket: Socket) => {
  const code = Array.from(socket.rooms).find((room) => room.length === 4);
  const room = await Room.findOne({ code }).lean();
  if (!code && !room) return;
  console.log(room, socket.id);
  const newMembers = room.members.map((mem: RoomMember) =>
    mem.socketId === socket.id ? { ...mem, connected: false } : mem
  );
  const { name } = room.members.find((mem: RoomMember) => mem.socketId === socket.id);
  Room.findOneAndUpdate(
    { code },
    {
      members: newMembers,
      typing: room.typing.filter((t: string) => t !== name),
    },
    { new: true },
    (err, newRoom) => {
      if (err) {
        socket.emit("serverError", {
          error: err.message,
        });
        return;
      }
      // @ts-ignore
      socket.to(code).emit("roomUpdated", newRoom);
    }
  );
};

export default {
  create,
  join,
  ttl,
  message,
  startTyping,
  stopTyping,
  disconnect,
};
