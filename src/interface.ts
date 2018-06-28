import { Room, RoleType, MessageType, MessageActionType } from './';

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
  public?: boolean;
  canBlock?: boolean;
  lang?: string;
  accessToken?: string;
  lastAccessRoomId?: string;
  lastAccessed?: string;
  created?: string;
  modified?: string;
  rooms?: IRoomForUser[];
  devices?: IDevice[];
  blocks?: string[];
  roles?: number[];
  mutedRooms?: string[];
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
  canLeft: boolean;
  created: string;
  modified: string;
  users: IUserForRoom[];
  ruUnreadCount: number;
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
  canLeft?: boolean;
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
  lastAccessed?: string;
  created?: string;
  modified?: string;
  ruDisplay?: boolean;
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
  suggestMessageId?: string;
  roomId: string;
  userId: string;
  type: MessageType;
  eventName?: string;
  payload: Object;
  role?: RoleType;
  created?: string | number;
  modified?: string | number;
}

export interface ISendMessagesResponse {
  messageIds: string[] | null;
  error: IProblemDetail | null;
}

export interface IPayloadText {
  text: string;
  score?: number;
  replyMessageId?: string;
}

export interface IPayloadImage {
  thumbnailUrl: string;
  sourceUrl: string;
  dataUrl?: string;
  mime?: string;
  size: string;
  width?: number;
  height?: number;
}

export interface IPayloadFile {
  sourceUrl: string;
  filename: string;
  mime: string;
  size: number;
}

export interface IPayloadButtons {
  thumbnailImageUrl: string;
  imageAspectRatio: 'rectangle' | 'square';
  imageSize: 'cover' | 'contain';
  imageBackgroundColor: string;
  title: string;
  text: string;
  defaultAction: BotAction;
  actions: BotAction[];
}

export interface IPayloadConfirm {
  text: string;
  actions: BotAction[];
}

export interface IPayloadList {
  text: string;
  actions: BotAction[];
}

export interface IPayloadCarousel {
  columns: ICarousel[];
  imageAspectRatio: 'rectangle' | 'square';
  imageSize: 'cover' | 'contain';
}

export interface ICarousel {
  thumbnailImageUrl: string;
  imageBackgroundColor: string;
  title: string;
  text: string;
  defaultAction: BotAction;
  actions: BotAction[];
}

export interface IPayloadImageCarousel {
  columns: IImageColumn[];
}

export interface IImageColumn {
  imageUrl: string;
  action: BotAction;
}

export interface IBotActionPostback {
  type: MessageActionType.POSTBACK;
  label: string;
  data: string;
  displayText: string;
  text: string;
}

export interface IBotActionMessage {
  type: MessageActionType.MESSAGE;
  label: string;
  text: string;
}

export interface IBotActionUri {
  type: MessageActionType.URI;
  label: string;
  uri: string;
}

export interface IBotActionDatetime {
  type: MessageActionType.DATETIME_PICKER;
  label: string;
  data: string;
  mode: 'date' | 'time' | 'datetime';
  initial: string;
  max: string;
  min: string;
}

export type BotAction = IBotActionPostback | IBotActionMessage | IBotActionUri | IBotActionDatetime;

export interface IAsset {
  assetId: string;
  mime: string;
  size: number;
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
  // messageListMarginBottom: number;
  item: React.ComponentClass<IAddonMessageItemProps> | null;
  interaction: React.ComponentClass<IAddonMessageInteractionProps> | null;
  // menu: React.ComponentClass<IAddonMessageMenuProps>;
  // position: 'top' | 'bottom';
  // isAlwaysDisplay: boolean;
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
  animation?: boolean;
  onSendListener?: (message: IMessage) => void;
  suggest?: boolean;
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

export interface IHeadAssetResponse {
  size: number;
  width: number;
  height: number;
  error: IProblemDetail | null;
}