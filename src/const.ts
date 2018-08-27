export { UserRoomsFilter } from 'swagchat-protobuf/userMessage_pb';
export { RoomType } from 'swagchat-protobuf/roomMessage_pb';
export { EventType } from 'swagchat-protobuf/eventMessage_pb';
export { Platform } from 'swagchat-protobuf/deviceMessage_pb';

export enum UpdateRoomMessagesReason {
  PAGING = 'paging',
  RECEIVE = 'receive',
}
export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  FILE = 'file',
  INDICATOR_START = 'indicator-start',
  INDICATOR_END = 'indicator-end',
  UPDATE_ROOM_USER = 'updateRoomUser',
}

export enum MessageActionType {
  POSTBACK = 'postback',
  MESSAGE = 'message',
  URI = 'uri',
  DATETIME_PICKER = 'datetimepicker',
}

export enum RoleType {
	General = 1,
	Guest = 2,
	Operator = 3,
  External = 4,
  Bot = 5,
}

export enum SpeechMode {
  WAKEUP_WEB_TO_WEB = 1,
  WAKEUP_WEB_TO_CLOUD = 2,
  WAKEUP_CLOUD_TO_CLOUD = 3,
  ALWAYS = 4,
  MANUAL = 5, // default
}

export enum Speech2Text {
  BROWSER = 1,
  WATSON = 2,
  GOOGLE = 3,
}

export const cookieUserIdKey = 'sc_user_id';
export const cookieRoomIdKey = 'sc_room_id';