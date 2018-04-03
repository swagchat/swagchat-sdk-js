import { Room, IRoom, IUserForRoom, IProblemDetail } from '../';

export interface RoomState {
  currentRoomId: string;
  currentRoomName: string;
  room: Room | null;
  roomUsers: {[key: string]: IUserForRoom} | null;
  roomsAllCount: number;
  roomsLimit: number;
  roomsOffset: number;
  rooms: {[key: string]: IRoom} | null;
  problemDetail: IProblemDetail | null;
}