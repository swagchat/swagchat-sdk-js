import { User, IUser, IRoomForUser, IProblemDetail } from '../';

export interface UserState {
  user: User | null;
  userRooms: {[key: string]: IRoomForUser} | null;
  usersAllCount: number;
  usersLimit: number;
  usersOffset: number;
  users: {[key: string]: IUser} | null;
  contacts: {[key: string]: IUser} | null;
  selectedContacts: {[key: string]: IUser};
  blocks: string[];
  problemDetail: IProblemDetail | null;
}
