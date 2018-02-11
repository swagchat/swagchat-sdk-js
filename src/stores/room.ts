import { Room, IUserForRoom, IProblemDetail } from '../';

export interface RoomState {
  roomId: string;
  room: Room | null;
  roomUsers: {[key: string]: IUserForRoom} | null;
  updateName: string;
  updatePicture: Blob | null;
  updatePictureUrl: string;
  updateType: number;
  problemDetail: IProblemDetail | null;
}