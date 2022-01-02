import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import Home from "screens/Home";
import Lobby from "screens/Room";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  Room,
  RoomMember,
} from "types";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<
    Socket<ServerToClientEvents, ClientToServerEvents> | any
  >(null);
  const [user, updateUser] = useState<RoomMember | any>(null);
  const [room, updateRoom] = useState<Room | null>(null);
  const [expires, updateExpires] = useState<NodeJS.Timeout | any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
    const newSocket = io();
    newSocket.on("roomClosed", (res) => {
      console.log(res.message);
      navigate("/");
      updateRoom(null);
      updateUser(null);
    });
    newSocket.on("roomCreated", (res: Room) => {
      updateRoom(res);
      updateUser(res.members[0]);
      navigate(`/room/${res.code}`);
    });
    newSocket.on("roomJoined", (res: Room) => {
      updateRoom(res);
      updateUser(
        res.members.find((m: RoomMember) => m.socketId === newSocket.id)
      );
      navigate(`/room/${res.code}`);
    });
    newSocket.on("roomUpdated", (res: Room) => {
      updateRoom(res);
    });
    newSocket.on("serverError", (res) => {
      console.log(res);
    });
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    clearInterval(expires);
    if (room) {
      updateExpires(
        setInterval(() => {
          socket.emit("roomTTL", room);
        }, 60000)
      );
    }
  }, [room]);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="room">
          <Route
            path=":room_code"
            element={<Lobby room={room} socket={socket} user={user} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
