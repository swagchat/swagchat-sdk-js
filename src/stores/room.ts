import { IRoom, IUserForRoom, IProblemDetail } from '../';

export interface IRoomState {
  roomId: string;
  room: IRoom | null;
  problemDetail: IProblemDetail | null;
  roomUsers: {[key: string]: IUserForRoom} | null;
  updateName: string;
  updatePicture: Blob | null;
  updatePictureUrl: string;
  updateType: number;
}
