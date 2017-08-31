import { store } from './';
import { IUser, IRoomForUser, IProblemDetail } from '../';
import {
  contactsFetchRequestActionCreator,
  updateSelectContactsActionCreator,
  clearSelectContactsActionCreator,
  userBlockFetchRequestActionCreator,
  userUnBlockFetchRequestActionCreator,
} from '../actions/user';

export interface IUserState {
  apiKey: string;
  apiEndpoint: string;
  realtimeEndpoint: string;
  userId: string;
  accessToken: string;
  user: IUser | null;
  userRooms: IRoomForUser[];
  users: IUser[];
  contacts: IUser[];
  selectContacts: {[key: string]: IUser};
  blocks: string[];
  problemDetail: IProblemDetail | null;
}

export const userBlockFetchActionDispatch = function(blockUserIds: string[]) {
  store.dispatch(userBlockFetchRequestActionCreator(blockUserIds));
};
export const userUnBlockFetchActionDispatch = function(blockUserIds: string[]) {
  store.dispatch(userUnBlockFetchRequestActionCreator(blockUserIds));
};
export const contactsFetchRequestActionDispatch = function() {
  store.dispatch(contactsFetchRequestActionCreator());
};
export const updateSelectContactsActionDispatch = function(contact: IUser) {
  store.dispatch(updateSelectContactsActionCreator(contact));
};
export const clearSelectContactsActionDispatch = function() {
  store.dispatch(clearSelectContactsActionCreator());
};