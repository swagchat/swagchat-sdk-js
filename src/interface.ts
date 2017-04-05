import { Client } from "./Client";

export interface IClientConfig {
  apiKey: string;
  apiEndpoint: string;
  realtime?: IRealtimeConfig;
}

export interface IRealtimeConfig {
  endpoint: string;
}

export interface IUserConfig {
  client: Client;
  userObj: IUser;
}

export interface IUser {
  userId: string;
  name: string;
  pictureUrl?: string;
  informationUrl?: string;
  unreadCount: number;
  metaData: {[key: string]: string | number | boolean};
  created: number;
  modified: number;
  rooms: IRoomForUser[];
  blockedUsers?: string[];
  mutedRooms?: string[];
}

export interface IRoomForUser {
  roomId: string;
  name: string;
  pictureUrl?: string;
  informationUrl?: string;
  metaData: {[key: string]: string | number | boolean};
  created: number;
  modified: number;
  ruUnreadCount: number;
  ruMetaData: {[key: string]: string | number | boolean};
  ruCreated: number;
  ruModified: number;
}

export interface IRoomConfig {
  client: Client;
  roomObj: IRoom;
}

export interface IRoom {
  roomId: string;
  name: string;
  pictureUrl?: string;
  informationUrl?: string;
  metaData: {[key: string]: string | number | boolean};
  isPublic: boolean;
  lastMessage?: string;
  lastMessageUpdated?: number;
  created: number;
  modified: number;
  users: IUserForRoom[];
}

export interface IUserForRoom {
  userId: string;
  name: string;
  pictureUrl?: string;
  informationUrl?: string;
  metaData?: {[key: string]: string | number | boolean};
  created: number;
  modified: number;
  ruUnreadCount: number;
  ruMetaData?: {[key: string]: string | number | boolean};
  ruCreated: number;
  ruModified: number;
}

export interface IMessage {
  roomId: string;
  userId: string;
  type: string;
  eventName: string;
  payload: Object;
}

export interface ICloseEvent extends Event {
  code: number;
  reason: string;
}

export interface IMessageEvent extends Event {
  data: (String|Buffer|ArrayBuffer|Buffer[]);
  isBinary: boolean;
  target: WebSocket;
}