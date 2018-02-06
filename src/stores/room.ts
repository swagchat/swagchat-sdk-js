import { IRoom, IUserForRoom } from '../';

export interface IRoomState {
  roomId: string;
  room: IRoom | null;
  roomUsers: {[key: string]: IUserForRoom} | null;
  updateName: string;
  updatePicture: Blob | null;
  updatePictureUrl: string;
  updateType: number;
}
