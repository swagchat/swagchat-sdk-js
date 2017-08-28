import { Action } from 'redux';

export const SET_SETTING = 'SET_SETTING';
export const SET_ROOM_LIST_TITLE = 'SET_ROOM_LIST_TITLE';
export const SET_ROOM_LIST_TABBAR = 'SET_ROOM_LIST_TABBAR';
export const SET_NO_ROOM_LIST_TEXT = 'SET_NO_ROOM_LIST_TEXT';
export const SET_NO_ROOM_LIST_IMAGE = 'SET_NO_ROOM_LIST_IMAGE';
export const SET_NO_MESSAGE_TEXT = 'SET_NO_MESSAGE_TEXT';
export const SET_NO_MESSAGE_IMAGE = 'SET_NO_MESSAGE_IMAGE';
export const SET_INPUT_MESSAGE_PLACEHOLDER_TEXT = 'SET_INPUT_MESSAGE_PLACEHOLDER_TEXT';
export const SET_ROOM_SETTING_TITLE = 'SET_ROOM_SETTING_TITLE';
export const SET_ROOM_MENBERS_TITLE = 'SET_ROOM_MENBERS_TITLE';
export const SET_SELECT_CONTACT_TITLE = 'SET_SELECT_CONTACT_TITLE';
export const SET_NO_CONTACT_LIST_TEXT = 'SET_NO_CONTACT_LIST_TEXT';
export const SET_NO_CONTACT_LIST_IMAGE = 'SET_NO_CONTACT_LIST_IMAGE';
export const SET_ROOM_LIST_ROUTE_PATH = 'SET_ROOM_LIST_ROUTE_PATH';
export const SET_NO_AVATAR_IMAGES = 'SET_NO_AVATAR_IMAGES';
export const SET_MESSAGE_ROUTE_PATH = 'SET_MESSAGE_ROUTE_PATH';
export const SET_ROOM_SETTING_ROUTE_PATH = 'SET_ROOM_SETTING_ROUTE_PATH';
export const SET_SELECT_CONTACT_ROUTE_PATH = 'SET_SELECT_CONTACT_ROUTE_PATH';

export type SettingActionTypes = typeof SET_SETTING
  | typeof SET_ROOM_LIST_TITLE
  | typeof SET_ROOM_LIST_TABBAR
  | typeof SET_NO_ROOM_LIST_TEXT
  | typeof SET_NO_ROOM_LIST_IMAGE
  | typeof SET_NO_MESSAGE_TEXT
  | typeof SET_NO_MESSAGE_IMAGE
  | typeof SET_INPUT_MESSAGE_PLACEHOLDER_TEXT
  | typeof SET_ROOM_SETTING_TITLE
  | typeof SET_ROOM_MENBERS_TITLE
  | typeof SET_SELECT_CONTACT_TITLE
  | typeof SET_NO_CONTACT_LIST_TEXT
  | typeof SET_NO_CONTACT_LIST_IMAGE
  | typeof SET_NO_AVATAR_IMAGES
  | typeof SET_ROOM_LIST_ROUTE_PATH
  | typeof SET_MESSAGE_ROUTE_PATH
  | typeof SET_ROOM_SETTING_ROUTE_PATH
  | typeof SET_SELECT_CONTACT_ROUTE_PATH
;

export interface ISettingBaseAction extends Action {
  type: SettingActionTypes;
}

export interface ISetSettingAction extends ISettingBaseAction {
  setting: Object;
}
export const setSettingActionCreator = (setting: Object): ISetSettingAction => ({
  type: SET_SETTING,
  setting: setting,
});

export interface ISetRoomListTitleAction extends ISettingBaseAction {
  roomListTitle: string;
}
export const setRoomListTitleActionCreator = (roomListTitle: string): ISetRoomListTitleAction => ({
  type: SET_ROOM_LIST_TITLE,
  roomListTitle: roomListTitle,
});

export interface ISetRoomListTabbarAction extends ISettingBaseAction {
  roomListTabbar: React.ComponentClass<any> | null;
}
export const setRoomListTabbarActionCreator = (roomListTabbar: React.ComponentClass<any>): ISetRoomListTabbarAction => ({
  type: SET_ROOM_LIST_TABBAR,
  roomListTabbar: roomListTabbar,
});

export interface ISetNoRoomListTextAction extends ISettingBaseAction {
  noRoomListText: string;
}
export const setNoRoomListTextActionCreator = (noRoomListText: string): ISetNoRoomListTextAction => ({
  type: SET_NO_ROOM_LIST_TEXT,
  noRoomListText: noRoomListText,
});

export interface ISetNoRoomListImageAction extends ISettingBaseAction {
  noRoomListImage: string;
}
export const setNoRoomListImageActionCreator = (noRoomListImage: string): ISetNoRoomListImageAction => ({
  type: SET_NO_ROOM_LIST_IMAGE,
  noRoomListImage: noRoomListImage,
});

export interface ISetNoMessageTextAction extends ISettingBaseAction {
  noMessageText: string;
}
export const setNoMessageTextActionCreator = (noMessageText: string): ISetNoMessageTextAction => ({
  type: SET_NO_MESSAGE_TEXT,
  noMessageText: noMessageText,
});

export interface ISetNoMessageImageAction extends ISettingBaseAction {
  noMessageImage: string;
}
export const setNoMessageImageActionCreator = (noMessageImage: string): ISetNoMessageImageAction => ({
  type: SET_NO_MESSAGE_IMAGE,
  noMessageImage: noMessageImage,
});

export interface ISetInputMessagePlaceholderTextAction extends ISettingBaseAction {
  inputMessagePlaceholderText: string;
}
export const setInputMessagePlaceholderTextActionCreator = (inputMessagePlaceholderText: string): ISetInputMessagePlaceholderTextAction => ({
  type: SET_INPUT_MESSAGE_PLACEHOLDER_TEXT,
  inputMessagePlaceholderText: inputMessagePlaceholderText,
});

export interface ISetRoomSettingTitleAction extends ISettingBaseAction {
  roomSettingTitle: string;
}
export const setRoomSettingTitleActionCreator = (roomSettingTitle: string): ISetRoomSettingTitleAction => ({
  type: SET_ROOM_SETTING_TITLE,
  roomSettingTitle: roomSettingTitle,
});

export interface ISetRoomMembersTitleAction extends ISettingBaseAction {
  roomMembersTitle: string;
}
export const setRoomMembersTitleActionCreator = (roomMembersTitle: string): ISetRoomMembersTitleAction => ({
  type: SET_ROOM_MENBERS_TITLE,
  roomMembersTitle: roomMembersTitle,
});

export interface ISetSelectContactTitleAction extends ISettingBaseAction {
  selectContactTitle: string;
}
export const setSelectContactTitleActionCreator = (selectContactTitle: string): ISetSelectContactTitleAction => ({
  type: SET_SELECT_CONTACT_TITLE,
  selectContactTitle: selectContactTitle,
});

export interface ISetNoContactListTextAction extends ISettingBaseAction {
  noContactListText: string;
}
export const setNoContactListTextActionCreator = (noContactListText: string): ISetNoContactListTextAction => ({
  type: SET_NO_ROOM_LIST_TEXT,
  noContactListText: noContactListText,
});

export interface ISetNoContactListImageAction extends ISettingBaseAction {
  noContactListImage: string;
}
export const setNoContactListImageActionCreator = (noContactListImage: string): ISetNoContactListImageAction => ({
  type: SET_NO_ROOM_LIST_IMAGE,
  noContactListImage: noContactListImage,
});

export interface ISetNoAvatarImagesAction extends ISettingBaseAction {
  noAvatarImages: string[];
}
export const setNoAvatarImagesActionCreator = (noAvatarImages: string[]): ISetNoAvatarImagesAction => ({
  type: SET_NO_AVATAR_IMAGES,
  noAvatarImages: noAvatarImages,
});

export interface ISetRoomListRoutePathAction extends ISettingBaseAction {
  roomListRoutePath: string;
}
export const setRoomListRoutePathActionCreator = (roomListRoutePath: string): ISetRoomListRoutePathAction => ({
  type: SET_ROOM_LIST_ROUTE_PATH,
  roomListRoutePath: roomListRoutePath,
});

export interface ISetMessageRoutePathAction extends ISettingBaseAction {
  messageRoutePath: string;
}
export const setMessageRoutePathActionCreator = (messageRoutePath: string): ISetMessageRoutePathAction => ({
  type: SET_MESSAGE_ROUTE_PATH,
  messageRoutePath: messageRoutePath,
});

export interface ISetRoomSettingRoutePathAction extends ISettingBaseAction {
  roomSettingRoutePath: string;
}
export const setRoomSettingRoutePathActionCreator = (roomSettingRoutePath: string): ISetRoomSettingRoutePathAction => ({
  type: SET_ROOM_SETTING_ROUTE_PATH,
  roomSettingRoutePath: roomSettingRoutePath,
});

export interface ISetSelectContactRoutePathAction extends ISettingBaseAction {
  selectContactRoutePath: string;
}
export const setSelectContactRoutePathActionCreator = (selectContactRoutePath: string): ISetSelectContactRoutePathAction => ({
  type: SET_SELECT_CONTACT_ROUTE_PATH,
  selectContactRoutePath: selectContactRoutePath,
});

export type SettingActions = ISettingBaseAction
  | ISetSettingAction
  | ISetRoomListTitleAction
  | ISetRoomListTabbarAction
  | ISetNoRoomListTextAction
  | ISetNoRoomListImageAction
  | ISetNoMessageTextAction
  | ISetNoMessageImageAction
  | ISetInputMessagePlaceholderTextAction
  | ISetRoomSettingTitleAction
  | ISetRoomMembersTitleAction
  | ISetSelectContactTitleAction
  | ISetNoContactListTextAction
  | ISetNoContactListImageAction
  | ISetNoAvatarImagesAction
  | ISetRoomListRoutePathAction
  | ISetMessageRoutePathAction
  | ISetRoomSettingRoutePathAction
  | ISetSelectContactRoutePathAction
  ;
