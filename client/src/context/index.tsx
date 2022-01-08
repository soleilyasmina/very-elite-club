import { createContext, FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  Room,
  RoomMember,
} from "types";
import { setLocalStorage } from "utils/localStorage";

export interface AppContextType {
  room?: Room | any;
  socket?: Socket<ServerToClientEvents, ClientToServerEvents> | any;
  user?: RoomMember | any;
}

export const AppContext = createContext<AppContextType>({
  room: null,
  socket: null,
  user: null,
});
AppContext.displayName = "AppContext";

export const Provider: FC = ({ children }) => {
  const [socket, setSocket] = useState<
    Socket<ServerToClientEvents, ClientToServerEvents> | any
  >(io());
  const [user, updateUser] = useState<RoomMember | any>(null);
  const [room, updateRoom] = useState<Room | any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if ((!room || !user) && !location.pathname.match(/create|join/))
      navigate("/");
  }, [location.pathname, navigate, user, room]);

  useEffect(() => {
    setSocket(
      (newSocket: Socket<ServerToClientEvents, ClientToServerEvents>) => {
        newSocket.on("roomClosed", (res: any) => {
          console.log(res.message);
          navigate("/");
          updateRoom(null);
          updateUser(null);
        });
        newSocket.on("roomCreated", (res: Room) => {
          updateRoom(res);
          updateUser(res.members[0]);
          setLocalStorage(res.members[0].name, res.code);
          navigate(`/room/${res.code}`);
        });
        newSocket.on("roomJoined", (res: Room) => {
          const newUser = res.members.find(
            (m: RoomMember) => m.socketId === newSocket.id
          );
          updateRoom(res);
          updateUser(newUser);
          setLocalStorage(
            newUser?.name || "",
            res.code
          );
          navigate(`/room/${res.code}`);
        });
        newSocket.on("roomUpdated", (res: Room) => {
          updateRoom(res);
        });
        newSocket.on("serverError", (res: string) => {
          console.log(res);
        });
        newSocket.on("disconnect", (reason: string) => {
          if (reason === "io server disconnect") {
            newSocket.connect();
          }
        });
        return newSocket;
      }
    );
  }, [navigate]);

  useEffect(() => {
    let expires: NodeJS.Timeout | any;
    if (room) {
      expires = setInterval(() => {
        socket.emit("roomTTL", room);
      }, 60000);
    }
    return () => {
      if (expires) {
        clearInterval(expires);
      }
    };
  }, [room, socket]);

  const contextValue = {
    room,
    socket,
    user,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
