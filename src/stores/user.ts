import { User, IUser, IErrorResponse, IMiniRoom, IMessage } from '..';

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

  // event listenner
  onMessageReceived: (message: IMessage) => void;
  onRoomReceived: (message: IMiniRoom) => void;
}
