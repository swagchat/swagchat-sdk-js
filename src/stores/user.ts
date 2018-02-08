import { IUser, IRoomForUser } from '../';

export interface UserState {
  user: IUser | null;
  userRooms: {[key: string]: IRoomForUser} | null;
  users: IUser[];
  contacts: IUser[];
  selectContacts: {[key: string]: IUser};
  blocks: string[];
}
