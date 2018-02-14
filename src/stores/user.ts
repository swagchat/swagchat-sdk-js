import { User, IUser, IRoomForUser } from '../';

export interface UserState {
  user: User | null;
  userRooms: {[key: string]: IRoomForUser} | null;
  users: {[key: string]: IUser} | null;
  contacts: {[key: string]: IUser} | null;
  selectedContacts: {[key: string]: IUser};
  blocks: string[];
}
