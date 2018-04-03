import { IUser, IRoomForUser, IProblemDetail } from '../';

export interface UserState {
  user: IUser | null;
  userRooms: {[key: string]: IRoomForUser} | null;
  usersAllCount: number;
  usersLimit: number;
  usersOffset: number;
  users: {[key: string]: IUser} | null;
  contacts: {[key: string]: IUser} | null;
  selectedContacts: {[key: string]: IUser};
  blocks: string[];
  profileUserId: string;
  profileUser: IUser | null;
  problemDetail: IProblemDetail | null;
}
