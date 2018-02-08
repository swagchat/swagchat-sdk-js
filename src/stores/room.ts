import { IRoom, IUserForRoom, IProblemDetail } from '../';

export interface RoomState {
  roomId: string;
  room: IRoom | null;
  roomUsers: {[key: string]: IUserForRoom} | null;
  updateName: string;
  updatePicture: Blob | null;
  updatePictureUrl: string;
  updateType: number;
  problemDetail: IProblemDetail | null;
}