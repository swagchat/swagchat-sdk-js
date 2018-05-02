import { Room } from './';
export interface IDevice {
  userId: string;
  platform: number;
  token: string;
  notificationDeviceId: string;
}


export interface IUser {
  userId: string;
  name: string;
  pictureUrl?: string;
  informationUrl?: string;
  unreadCount?: number;
  metaData?: {[key: string]: string | number | boolean | Object};
  isPublic?: boolean;
  isCanBlock?: boolean;
  isShowUsers?: boolean;
  lang?: string;
  accessToken?: string;
  lastAccessRoomId?: string;
  lastAccessed?: string;
  created?: string;
  modified?: string;
  rooms?: IRoomForUser[];
  devices?: IDevice[];
  blocks?: string[];
  mutedRooms?: string[];
}

export interface IUserMini {
  roomId: string;
  userId: string;
  name: string;
  pictureUrl: string;
  lastAccessed: string;
}

export interface IRoomForUser {
  roomId: string;
  userId: string;
  name: string;
  pictureUrl: string;
  informationUrl: string;
  metaData: {[key: string]: string | number | boolean | Object};
  type: number;
  lastMessage: string;
  lastMessageUpdated: string;
  isCanLeft: boolean;
  created: string;
  modified: string;
  users: IUserMini[];
  ruUnreadCount: number;
  ruMetaData: {[key: string]: string | number | boolean | Object};
  ruCreated: string;
  ruModified: string;
}

export interface IRoom {
  roomId?: string;
  userId?: string;
  name?: string;
  pictureUrl?: string;
  informationUrl?: string;
  metaData?: {[key: string]: string | number | boolean | Object};
  availableMessageTypes?: string[];
  type?: number;
  lastMessage?: string;
  lastMessageUpdated?: string;
  messageCount?: number;
  isCanLeft?: boolean;
  isShowUsers?: boolean;
  speechMode?: number;
  created?: string;
  modified?: string;
  users?: IUserForRoom[];
  userIds?: string[];
}

export interface IUserForRoom {
  userId: string;
  name: string;
  pictureUrl: string;
  informationUrl?: string;
  metaData?: {[key: string]: string | number | boolean | Object};
  isCanBlock?: boolean;
  isShowUsers?: boolean;
  lastAccessed?: string;
  created?: string;
  modified?: string;
  ruUnreadCount?: number;
  ruMetaData?: {[key: string]: string | number | boolean | Object};
  ruCreated?: string;
  ruModified?: string;
}

export interface IRoomUser {
  roomId: string;
  userId: string;
  unreadCount: number;
  metaData?: {[key: string]: string | number | boolean | Object};
  created: string;
  modified: string;
}

// export interface IBlockUser {
//   userId: string;
//   blockUserId: string;
//   created: string;
// }

export interface IMessages {
  allCount: number;
  messages: IMessage[];
}

export interface IMessage {
  messageId?: string;
  roomId: string;
  userId: string;
  type: string;
  eventName?: string;
  payload: Object;
  created?: string;
  modified?: string;
}

export interface ISendMessagesResponse {
  messageIds: string[] | null;
  error: IProblemDetail | null;
}

export interface ITextPayload {
  text: string;
}

export interface IImagePayload {
  thumbnailUrl: string;
  sourceUrl: string;
  dataUrl?: string;
  mime?: string;
  size: string;
  width?: number;
  height?: number;
}

export interface IFilePayload {
  sourceUrl: string;
  filename: string;
  mime: string;
  size: number;
}

export interface IAsset {
  assetId: string;
  mime: string;
  size: string;
  extension: string;
  url: string;
  width?: number;
  height?: number;
}

export interface ICloseEvent extends Event {
  code: number;
  reason: string;
}

export interface IMessageEvent extends Event {
  data: (String|Buffer|ArrayBuffer|Buffer[]);
  isBinary: boolean;
  target: WebSocket;
}

export interface IUISettings {
  menuHeight: number;
  textInteractionFontSize: number;
}

export interface IInvalidParam {
  name: string;
  reason: string;
}

export interface IProblemDetail {
  type?: string;
  title: string;
  status?: number;
  detail?: string;
  instance?: string;
  errorName?: string;
  invalidParams?: IInvalidParam[];
}

export interface IFetchUsersResponse {
  users: IUser[];
  error: IProblemDetail | null;
}

export interface IFetchUserResponse {
  user: IUser | null;
  error: IProblemDetail | null;
}

export interface IFetchUserDeviceResponse {
  device: IDevice | null;
  error: IProblemDetail | null;
}

export interface IFetchRoomsResponse {
  rooms: IRoom[] | null;
  error: IProblemDetail | null;
}

export interface IFetchRoomResponse {
  room: Room | null;
  error: IProblemDetail | null;
}

export interface IFetchRoomUsersResponse {
  roomUsers: IRoomUser[] | null;
  error: IProblemDetail | null;
}

export interface IFetchBlockUsersResponse {
  blockUsers: string[] | null;
  error: IProblemDetail | null;
}

export interface IFetchMessagesResponse {
  messages: IMessages | null;
  error: IProblemDetail | null;
}

export interface IPostAssetResponse {
  asset: IAsset | null;
  error: IProblemDetail | null;
}

export interface IErrorResponse {
  error: IProblemDetail | null;
}

export interface IAddonMessage {
  name: string;
  messageListMarginBottom: number;
  // item: React.ComponentClass<IAddonMessageItemProps>;
  // interaction: React.ComponentClass<IAddonMessageInteractionProps>;
  // menu: React.ComponentClass<IAddonMessageMenuProps>;
  position: 'top' | 'bottom';
  isAlwaysDisplay: boolean;
}

export interface IAddonMessageItemProps {
  message?: IMessage;
  user?: IUserForRoom;
  myUserId?: string;
  onRenderComplete?: () => {};
  isLast?: boolean;
  isSearchResult?: boolean;
  opponentUser?: IUserForRoom;
  calcHeight?: (height: number) => void;
  text?: string;
}

export interface IAddonMessageInteractionProps {
  // settingState: ISettingState;
  position: 'top' | 'bottom';
  isAlwaysDisplay: boolean;
  onSendListener?: (message: IMessage) => void;
}

export interface IAddonMessageMenuProps {
  user?: IUser;
  room?: IRoom;
  ownMenuIndex: number;
  currentMenuIndex: number;
}

export interface IAddonRoomListItem {
  name: string;
  // item: React.ComponentClass<IAddonRoomListItemProps>;
}

export interface IAddonRoomListItemProps {
  myUserId: string;
  userRoom: IRoomForUser;
  noAvatarImages: string[];
  onClick?: Function;
}

export interface ISetting {
  values: {
    roomListTitle: string;
    noRoomListText: string;
    noRoomListImage: string;
    noMessageText: string;
    noMessageImage: string;
    inputMessagePlaceholderText: string;
    roomSettingTitle: string;
    roomMembersTitle: string;
    selectContactTitle: string;
    noContactListText: string;
    noContactListImage: string;
    noAvatarImages: string[];
    blockUser: string;
    doYouWantToBlockUser: string;
    unblockUser: string;
    doYouWantToUnblockUser: string;
    editGroup: string;
    leftRoom: string;
    doYouWantToLeftRoom: string;
    speechMode: number;
    speechToText: number;
  };
  created: string;
  modified: string;
  expired: string;
}

export interface IFetchSettingResponse {
  setting: ISetting | null;
  error: IProblemDetail | null;
}