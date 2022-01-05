export interface RoomMessage {
  name: string;
  content: string;
  createdAt: String;
}

export interface RoomMember {
  name: string;
  wins: number;
  host: boolean;
  socketId: string;
  connected: boolean;
}

export interface Room {
  code: string;
  password?: string;
  members: RoomMember[];
  messages: RoomMessage[];
  typing: string[];
  createdAt: string;
  updatedAt: string;
}