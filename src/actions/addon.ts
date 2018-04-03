import { Action } from 'redux';
import { IAddonMessage, IAddonRoomListItem } from '../';

export const SET_ADDON_MESSAGE = 'SET_ADDON_MESSAGE';
export const SET_CUSTOM_ADDON_MESSAGE = 'SET_CUSTOM_ADDON_MESSAGE';
export const UPDATE_ADDON_MESSAGE_MENU_INDEX = 'UPDATE_ADDON_MESSAGE_MENU_INDEX';
export const SET_ADDON_ROOM_LIST_ITEM = 'SET_ADDON_ROOM_LIST_ITEM';
export const SET_CUSTOM_ADDON_ROOM_LIST_ITEM = 'SET_CUSTOM_ADDON_ROOM_LIST_ITEM';

export type AddonActionTypes =
  typeof SET_ADDON_MESSAGE |
  typeof SET_CUSTOM_ADDON_MESSAGE |
  typeof UPDATE_ADDON_MESSAGE_MENU_INDEX |
  typeof SET_ADDON_ROOM_LIST_ITEM |
  typeof SET_CUSTOM_ADDON_ROOM_LIST_ITEM
;

export interface AddonBaseAction extends Action {
  type: AddonActionTypes;
}

export interface SetAddonMessageAction extends AddonBaseAction {
  messages: IAddonMessage[];
}
export const setAddonMessageActionCreator = (messages: IAddonMessage[]): SetAddonMessageAction => ({
  type: SET_ADDON_MESSAGE,
  messages: messages,
});

export interface SetCustomAddonMessageAction extends AddonBaseAction {
  customMessages: IAddonMessage[];
}
export const setCustomAddonMessageActionCreator = (customMessages: IAddonMessage[]): SetCustomAddonMessageAction => ({
  type: SET_CUSTOM_ADDON_MESSAGE,
  customMessages: customMessages,
});

export interface UpdateAddonMessageMenuIndexAction extends AddonBaseAction {
  currentMenuIndex: number;
}
export const updateAddonMessageMenuIndexActionCreator =
    (currentMenuIndex: number): UpdateAddonMessageMenuIndexAction => ({
  type: UPDATE_ADDON_MESSAGE_MENU_INDEX,
  currentMenuIndex: currentMenuIndex,
});

export interface SetAddonRoomListItemAction extends AddonBaseAction {
  roomListItems: {[key: number]: IAddonRoomListItem};
}
export const setAddonRoomListItemActionCreator = (roomListItems: IAddonRoomListItem[]): SetAddonRoomListItemAction => ({
  type: SET_ADDON_ROOM_LIST_ITEM,
  roomListItems: roomListItems,
});

export interface SetCustomAddonRoomListItemAction extends AddonBaseAction {
  customRoomListItems: {[key: number]: IAddonRoomListItem};
}
export const setCustomAddonRoomListItemActionCreator =
    (customRoomListItems: IAddonRoomListItem[]): SetCustomAddonRoomListItemAction => ({
  type: SET_CUSTOM_ADDON_ROOM_LIST_ITEM,
  customRoomListItems: customRoomListItems,
});

export type AddonActions =
  AddonBaseAction |
  SetAddonMessageAction |
  SetCustomAddonMessageAction |
  UpdateAddonMessageMenuIndexAction |
  SetAddonRoomListItemAction |
  SetCustomAddonRoomListItemAction
;