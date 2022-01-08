import { Room } from "./room";

export interface ClientToServerEvents {
  roomCreate: (name: string, isPrivate: boolean) => void;
  roomJoin: (name: string, password: string, code: string) => void;
  roomStartTyping: (code: string, name: string) => void;
  roomStopTyping: (code: string, name: string) => void;
  roomMessage: (code: string, content: string, name: string) => void;
  roomTTL: (room: Room) => void;
  disconnect: () => void;
}

export interface ServerToClientEvents {
  roomClosed: (res: any) => void;
  roomCreated: (res: Room) => void;
  roomJoined: (res: Room) => void;
  roomUpdated: (res: Room) => void;
  serverError: (res: string) => void;
  disconnect: (reason: string) => void;
}