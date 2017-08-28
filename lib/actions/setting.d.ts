/// <reference types="react" />
import { Action } from 'redux';
export declare const SET_SETTING = "SET_SETTING";
export declare const SET_ROOM_LIST_TITLE = "SET_ROOM_LIST_TITLE";
export declare const SET_ROOM_LIST_TABBAR = "SET_ROOM_LIST_TABBAR";
export declare const SET_NO_ROOM_LIST_TEXT = "SET_NO_ROOM_LIST_TEXT";
export declare const SET_NO_ROOM_LIST_IMAGE = "SET_NO_ROOM_LIST_IMAGE";
export declare const SET_NO_MESSAGE_TEXT = "SET_NO_MESSAGE_TEXT";
export declare const SET_NO_MESSAGE_IMAGE = "SET_NO_MESSAGE_IMAGE";
export declare const SET_INPUT_MESSAGE_PLACEHOLDER_TEXT = "SET_INPUT_MESSAGE_PLACEHOLDER_TEXT";
export declare const SET_ROOM_SETTING_TITLE = "SET_ROOM_SETTING_TITLE";
export declare const SET_ROOM_MENBERS_TITLE = "SET_ROOM_MENBERS_TITLE";
export declare const SET_SELECT_CONTACT_TITLE = "SET_SELECT_CONTACT_TITLE";
export declare const SET_NO_CONTACT_LIST_TEXT = "SET_NO_CONTACT_LIST_TEXT";
export declare const SET_NO_CONTACT_LIST_IMAGE = "SET_NO_CONTACT_LIST_IMAGE";
export declare const SET_ROOM_LIST_ROUTE_PATH = "SET_ROOM_LIST_ROUTE_PATH";
export declare const SET_NO_AVATAR_IMAGES = "SET_NO_AVATAR_IMAGES";
export declare const SET_MESSAGE_ROUTE_PATH = "SET_MESSAGE_ROUTE_PATH";
export declare const SET_ROOM_SETTING_ROUTE_PATH = "SET_ROOM_SETTING_ROUTE_PATH";
export declare const SET_SELECT_CONTACT_ROUTE_PATH = "SET_SELECT_CONTACT_ROUTE_PATH";
export declare type SettingActionTypes = typeof SET_SETTING | typeof SET_ROOM_LIST_TITLE | typeof SET_ROOM_LIST_TABBAR | typeof SET_NO_ROOM_LIST_TEXT | typeof SET_NO_ROOM_LIST_IMAGE | typeof SET_NO_MESSAGE_TEXT | typeof SET_NO_MESSAGE_IMAGE | typeof SET_INPUT_MESSAGE_PLACEHOLDER_TEXT | typeof SET_ROOM_SETTING_TITLE | typeof SET_ROOM_MENBERS_TITLE | typeof SET_SELECT_CONTACT_TITLE | typeof SET_NO_CONTACT_LIST_TEXT | typeof SET_NO_CONTACT_LIST_IMAGE | typeof SET_NO_AVATAR_IMAGES | typeof SET_ROOM_LIST_ROUTE_PATH | typeof SET_MESSAGE_ROUTE_PATH | typeof SET_ROOM_SETTING_ROUTE_PATH | typeof SET_SELECT_CONTACT_ROUTE_PATH;
export interface ISettingBaseAction extends Action {
    type: SettingActionTypes;
}
export interface ISetSettingAction extends ISettingBaseAction {
    setting: Object;
}
export declare const setSettingActionCreator: (setting: Object) => ISetSettingAction;
export interface ISetRoomListTitleAction extends ISettingBaseAction {
    roomListTitle: string;
}
export declare const setRoomListTitleActionCreator: (roomListTitle: string) => ISetRoomListTitleAction;
export interface ISetRoomListTabbarAction extends ISettingBaseAction {
    roomListTabbar: React.ComponentClass<any> | null;
}
export declare const setRoomListTabbarActionCreator: (roomListTabbar: React.ComponentClass<any>) => ISetRoomListTabbarAction;
export interface ISetNoRoomListTextAction extends ISettingBaseAction {
    noRoomListText: string;
}
export declare const setNoRoomListTextActionCreator: (noRoomListText: string) => ISetNoRoomListTextAction;
export interface ISetNoRoomListImageAction extends ISettingBaseAction {
    noRoomListImage: string;
}
export declare const setNoRoomListImageActionCreator: (noRoomListImage: string) => ISetNoRoomListImageAction;
export interface ISetNoMessageTextAction extends ISettingBaseAction {
    noMessageText: string;
}
export declare const setNoMessageTextActionCreator: (noMessageText: string) => ISetNoMessageTextAction;
export interface ISetNoMessageImageAction extends ISettingBaseAction {
    noMessageImage: string;
}
export declare const setNoMessageImageActionCreator: (noMessageImage: string) => ISetNoMessageImageAction;
export interface ISetInputMessagePlaceholderTextAction extends ISettingBaseAction {
    inputMessagePlaceholderText: string;
}
export declare const setInputMessagePlaceholderTextActionCreator: (inputMessagePlaceholderText: string) => ISetInputMessagePlaceholderTextAction;
export interface ISetRoomSettingTitleAction extends ISettingBaseAction {
    roomSettingTitle: string;
}
export declare const setRoomSettingTitleActionCreator: (roomSettingTitle: string) => ISetRoomSettingTitleAction;
export interface ISetRoomMembersTitleAction extends ISettingBaseAction {
    roomMembersTitle: string;
}
export declare const setRoomMembersTitleActionCreator: (roomMembersTitle: string) => ISetRoomMembersTitleAction;
export interface ISetSelectContactTitleAction extends ISettingBaseAction {
    selectContactTitle: string;
}
export declare const setSelectContactTitleActionCreator: (selectContactTitle: string) => ISetSelectContactTitleAction;
export interface ISetNoContactListTextAction extends ISettingBaseAction {
    noContactListText: string;
}
export declare const setNoContactListTextActionCreator: (noContactListText: string) => ISetNoContactListTextAction;
export interface ISetNoContactListImageAction extends ISettingBaseAction {
    noContactListImage: string;
}
export declare const setNoContactListImageActionCreator: (noContactListImage: string) => ISetNoContactListImageAction;
export interface ISetNoAvatarImagesAction extends ISettingBaseAction {
    noAvatarImages: string[];
}
export declare const setNoAvatarImagesActionCreator: (noAvatarImages: string[]) => ISetNoAvatarImagesAction;
export interface ISetRoomListRoutePathAction extends ISettingBaseAction {
    roomListRoutePath: string;
}
export declare const setRoomListRoutePathActionCreator: (roomListRoutePath: string) => ISetRoomListRoutePathAction;
export interface ISetMessageRoutePathAction extends ISettingBaseAction {
    messageRoutePath: string;
}
export declare const setMessageRoutePathActionCreator: (messageRoutePath: string) => ISetMessageRoutePathAction;
export interface ISetRoomSettingRoutePathAction extends ISettingBaseAction {
    roomSettingRoutePath: string;
}
export declare const setRoomSettingRoutePathActionCreator: (roomSettingRoutePath: string) => ISetRoomSettingRoutePathAction;
export interface ISetSelectContactRoutePathAction extends ISettingBaseAction {
    selectContactRoutePath: string;
}
export declare const setSelectContactRoutePathActionCreator: (selectContactRoutePath: string) => ISetSelectContactRoutePathAction;
export declare type SettingActions = ISettingBaseAction | ISetSettingAction | ISetRoomListTitleAction | ISetRoomListTabbarAction | ISetNoRoomListTextAction | ISetNoRoomListImageAction | ISetNoMessageTextAction | ISetNoMessageImageAction | ISetInputMessagePlaceholderTextAction | ISetRoomSettingTitleAction | ISetRoomMembersTitleAction | ISetSelectContactTitleAction | ISetNoContactListTextAction | ISetNoContactListImageAction | ISetNoAvatarImagesAction | ISetRoomListRoutePathAction | ISetMessageRoutePathAction | ISetRoomSettingRoutePathAction | ISetSelectContactRoutePathAction;
