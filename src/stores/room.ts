import { store } from './';
import { IRoom, IUserForRoom, IProblemDetail } from '../';
import {
  roomUserRemoveFetchRequestActionCreator,
  roomUpdateNameActionCreator,
  roomUpdatePictureActionCreator,
} from '../actions/room';

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

export const roomUserRemoveFetch = function(userIds: string[]) {
  store.dispatch(roomUserRemoveFetchRequestActionCreator(userIds));
};
export const roomUpdateName = function(updateName: string) {
  store.dispatch(roomUpdateNameActionCreator(updateName));
};
export const roomUpdatePicture = function(updatePicture: Blob) {
  store.dispatch(roomUpdatePictureActionCreator(updatePicture));
};