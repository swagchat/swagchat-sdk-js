import { Room, IRoom, IMiniUser, IErrorResponse } from '..';

export interface RoomState {
  currentRoomId: string;
  currentRoomName: string;
  room: Room | null;
  roomUsers: {[key: string]: IMiniUser} | null;
  roomsAllCount: number;
  roomsLimit: number;
  roomsOffset: number;
  rooms: {[key: string]: IRoom} | null;
  errorResponse: IErrorResponse | null;
}