import {
    AddBlockUsersRequest, AddDeviceRequest, AddRoomUsersRequest, CreateRoomRequest,
    CreateUserRequest, DeleteBlockUsersRequest, DeleteDeviceRequest, DeleteRoomUsersRequest,
    Device as pbDevice, ErrorResponse as pbIErrorResponse, EventData as pbEventData, InvalidParam,
    Message as pbMessage, MiniRoom as pbMiniRoom, MiniUser as pbMiniUser,
    RetrieveRoomMessagesRequest as pbRetrieveRoomMessagesRequest, RetrieveRoomRequest,
    RetrieveUserRequest, RetrieveUserRoomsRequest, Room as pbRoom,
    RoomMessagesResponse as pbRoomMessagesResponse, RoomUser as pbRoomUser, SendMessageRequest,
    UpdateRoomRequest, UpdateUserRequest, User as pbUser,
    RoomEventPayload as pbRoomEventPayload, UserRoomsResponse as pbUserRoomsResponse
} from 'swagchat-protobuf';

import { Room } from './Room';
import { User } from './User';

export interface IErrorResponse extends pbIErrorResponse.AsObject {
  invalidParams: Array<InvalidParam.AsObject>;
}

// user
export interface IUser extends pbUser.AsObject {}
export interface IMiniRoom extends pbMiniRoom.AsObject {
  users: IMiniUser[];
}
export interface ICreateUserRequest extends CreateUserRequest.AsObject {
  metaDataObj?: object;
}
export interface IRetrieveUserRequest extends RetrieveUserRequest.AsObject {}
export interface IRetrieveUserRoomsRequest extends RetrieveUserRoomsRequest.AsObject {}
export interface IUpdateUserRequest extends UpdateUserRequest.AsObject {
  metaDataObj?: object;
}
export interface IUserRoomsResponse extends pbUserRoomsResponse.AsObject {
  rooms: IMiniRoom[];
  allCount: number;
}

// room
export interface IRoom extends pbRoom.AsObject {
  users: Array<IMiniUser>;
}
export interface IMiniUser extends pbMiniUser.AsObject {}
export interface ICreateRoomRequest extends CreateRoomRequest.AsObject {
  metaDataObj?: object;
}
export interface IRetrieveRoomRequest extends RetrieveRoomRequest.AsObject {}
export interface IUpdateRoomRequest extends UpdateRoomRequest.AsObject {
  metaDataObj?: object;
}
export interface IRetrieveRoomMessagesRequest extends pbRetrieveRoomMessagesRequest.AsObject {}
export interface IRoomMessagesResponse extends pbRoomMessagesResponse.AsObject {
  allCount: number;
  messages: IMessage[];
}

// device
export interface IDevice extends pbDevice.AsObject {}
export interface IAddDeviceRequest extends AddDeviceRequest.AsObject {}
export interface IDeleteDeviceRequest extends DeleteDeviceRequest.AsObject {}

// blockUser
export interface IAddBlockUsersRequest extends AddBlockUsersRequest.AsObject {}
export interface IDeleteBlockUsersRequest extends DeleteBlockUsersRequest.AsObject {}

// roomUser
export interface IRoomUser extends pbRoomUser.AsObject {}
export interface IAddRoomUsersRequest extends AddRoomUsersRequest.AsObject {}
export interface IDeleteRoomUsersRequest extends DeleteRoomUsersRequest.AsObject {}

// message
export interface IMessage extends pbMessage.AsObject {
  payloadObj?: object;
}
export interface ISendMessageRequest extends SendMessageRequest.AsObject {
  payloadObj?: object;
}

export interface IMessages {
  allCount: number;
  messages: IMessage[];
}

export interface ISendMessageResponse {
  error: IErrorResponse | null;
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

export interface IAsset {
  assetId: string;
  mime: string;
  size: number;
  extension: string;
  url: string;
  width?: number;
  height?: number;
}

// event

export interface IEventData extends pbEventData.AsObject {
  user_ids: Array<string>;
}
export interface IRoomEventPayload extends pbRoomEventPayload.AsObject {}

export interface ICloseEvent extends Event {
  code: number;
  reason: string;
}

export interface IMessageEvent extends Event {
  data: (String|Buffer|ArrayBuffer|Buffer[]|Blob);
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

// user
export interface ICreateUserResponse {
  user: User | null;
  error: IErrorResponse | null;
}

export interface IFetchUsersResponse {
  users: IUser[];
  error: IErrorResponse | null;
}

export interface IFetchUserResponse {
  user: User | null;
  error: IErrorResponse | null;
}

export interface IRetrieveUserRoomsResponse {
  userRoomsResponse: IUserRoomsResponse | null;
  error: IErrorResponse | null;
}

export interface IUpdateUserResponse {
  error: IErrorResponse | null;
}

export interface IFetchProfileResponse {
  user: IUser | null;
  error: IErrorResponse | null;
}

// device
export interface IAddDeviceResponse {
  device: IDevice | null;
  error: IErrorResponse | null;
}

export interface IDeleteDeviceResponse {
  error: IErrorResponse | null;
}

// room
export interface ICreateRoomResponse {
  room: Room | null;
  error: IErrorResponse | null;
}

export interface IFetchRoomsResponse {
  rooms: IRoom[];
  error: IErrorResponse | null;
}

export interface IFetchRoomResponse {
  room: Room | null;
  error: IErrorResponse | null;
}

export interface IUpdateRoomResponse {
  error: IErrorResponse | null;
}

export interface IDeleteRoomResponse {
  error: IErrorResponse | null;
}

// roomUser
export interface IAddRoomUsersResponse {
  error: IErrorResponse | null;
}

export interface IFetchRoomUsersResponse {
  roomUsers: IRoomUser[] | null;
  error: IErrorResponse | null;
}

export interface IDeleteRoomUsersResponse {
  error: IErrorResponse | null;
}

export interface IMarkAsReadResponse {
  error: IErrorResponse | null;
}

// blockUsers
export interface IAddBlockUsersResponse {
  error: IErrorResponse | null;
}

export interface IFetchBlockUsersResponse {
  blockUsers: string[] | null;
  error: IErrorResponse | null;
}

export interface IDeleteBlockUsersResponse {
  error: IErrorResponse | null;
}

// message
export interface IRetrieveRoomMessagesResponse {
  roomMessagesResponse: IRoomMessagesResponse | null;
  error: IErrorResponse | null;
}

// asset
export interface IPostAssetResponse {
  asset: IAsset | null;
  error: IErrorResponse | null;
}

export interface IAddonMessage {
  addonName: string;
  // messageListMarginBottom: number;
  item: React.ComponentType<IAddonMessageItemProps>;
  interaction: React.ComponentType<IAddonMessageInteractionProps> | null;
  // menu: React.ComponentClass<IAddonMessageMenuProps>;
  // position: 'top' | 'bottom';
  // isAlwaysDisplay: boolean;
}

export interface IAddonMessageItemProps {
  index: number;
  message?: IMessage;
  user?: IMiniUser | IUser;
  myUserId?: string;
  onRenderComplete?: () => {};
  isLast?: boolean;
  isSearchResult?: boolean;
  opponentUser?: IMiniUser;
  calcHeight?: (index: number, height: number) => void;
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
  user?: pbUser;
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
  userRoom: IMiniRoom;
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
  error: IErrorResponse | null;
}

export interface IHeadAssetResponse {
  size: number;
  width: number;
  height: number;
  error: IErrorResponse | null;
}