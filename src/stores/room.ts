import { Room, IRoom, IUserForRoom, IProblemDetail } from '../';

export interface RoomState {
  room: Room | null;
  roomUsers: {[key: string]: IUserForRoom} | null;
  roomsAllCount: number;
  roomsLimit: number;
  roomsOffset: number;
  rooms: {[key: string]: IRoom} | null;
  updateName: string;
  updatePicture: Blob | null;
  updatePictureUrl: string;
  updateType: number;
  problemDetail: IProblemDetail | null;
}