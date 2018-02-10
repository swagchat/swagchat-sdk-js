import { User, IUser, IRoomForUser } from '../';

export interface UserState {
  user: User | null;
  userRooms: {[key: string]: IRoomForUser} | null;
  users: IUser[];
  contacts: IUser[];
  selectContacts: {[key: string]: IUser};
  blocks: string[];
}
