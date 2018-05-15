export enum Platform {
  IOS = 1,
  ANDROID = 2,
}

export enum EventName {
  MESSAGE = 'message',
}

export enum RoomType {
  ONE_ON_ONE = 1,
  PRIVATE_ROOM = 2,
  PUBLIC_ROOM = 3,
  NOTICE_ROOM = 4,
  CUSTOMER_ROOM= 5,
}

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  FILE = 'file',
  OPERATOR_MESSAGE = 'operatorMessage',
  INDICATOR = 'indicator',
  UPDATE_ROOM_USER = 'updateRoomUser',
  BUTTONS = 'buttons',
  CONFIRM = 'confirm',
  LIST = 'list',
  CAROUSEL = 'carousel',
  IMAGE_CAROUSEL = 'imageCarousel',
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