
import { IUser, IRoomForUser } from '../';

export interface IUserState {
  user: IUser | null;
  userRooms: IRoomForUser[];
  users: IUser[];
  contacts: IUser[];
  selectContacts: {[key: string]: IUser};
  blocks: string[];
}
