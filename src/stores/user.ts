import { User, IUser, IErrorResponse } from '..';

export interface UserState {
  user: User | null;
  blocks: string[];

  // users
  usersAllCount: number;
  usersLimit: number;
  usersOffset: number;
  users: {[key: string]: IUser} | null;

  // contacts
  contacts: {[key: string]: IUser} | null;
  selectedContacts: {[key: string]: IUser};

  profileUserId: string;
  profileUser: IUser | null;

  errorResponse: IErrorResponse | null;
}
