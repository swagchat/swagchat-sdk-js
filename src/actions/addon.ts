import { Action } from 'redux';
import { store } from '../stores';
import { IAddonMessage, IAddonRoomListItem } from '../interface';

export const SET_ADDON_MESSAGE = 'SET_ADDON_MESSAGE';
export const SET_CUSTOM_ADDON_MESSAGE = 'SET_CUSTOM_ADDON_MESSAGE';
export const UPDATE_ADDON_MESSAGE_MENU_INDEX = 'UPDATE_ADDON_MESSAGE_MENU_INDEX';
export const SET_ADDON_ROOM_LIST_ITEM = 'SET_ADDON_ROOM_LIST_ITEM';
export const SET_CUSTOM_ADDON_ROOM_LIST_ITEM = 'SET_CUSTOM_ADDON_ROOM_LIST_ITEM';

export type AddonActionTypes = typeof SET_ADDON_MESSAGE
  | typeof SET_CUSTOM_ADDON_MESSAGE
  | typeof UPDATE_ADDON_MESSAGE_MENU_INDEX
  | typeof SET_ADDON_ROOM_LIST_ITEM
  | typeof SET_CUSTOM_ADDON_ROOM_LIST_ITEM
;

export interface IAddonBaseAction extends Action {
  type: AddonActionTypes;
}

export interface ISetAddonMessageAction extends IAddonBaseAction {
  messages: IAddonMessage[];
}
export const setAddonMessageActionCreator = (messages: IAddonMessage[]): ISetAddonMessageAction => ({
  type: SET_ADDON_MESSAGE,
  messages: messages,
});

export interface ISetCustomAddonMessageAction extends IAddonBaseAction {
  customMessages: IAddonMessage[];
}
export const setCustomAddonMessageActionCreator = (customMessages: IAddonMessage[]): ISetCustomAddonMessageAction => ({
  type: SET_CUSTOM_ADDON_MESSAGE,
  customMessages: customMessages,
});

export interface IUpdateAddonMessageMenuIndexAction extends IAddonBaseAction {
  currentMenuIndex: number;
}
export const updateAddonMessageMenuIndexActionCreator = (currentMenuIndex: number): IUpdateAddonMessageMenuIndexAction => ({
  type: UPDATE_ADDON_MESSAGE_MENU_INDEX,
  currentMenuIndex: currentMenuIndex,
});

export interface ISetAddonRoomListItemAction extends IAddonBaseAction {
  roomListItems: {[key: number]: IAddonRoomListItem};
}
export const setAddonRoomListItemActionCreator = (roomListItems: IAddonRoomListItem[]): ISetAddonRoomListItemAction => ({
  type: SET_ADDON_ROOM_LIST_ITEM,
  roomListItems: roomListItems,
});

export interface ISetCustomAddonRoomListItemAction extends IAddonBaseAction {
  customRoomListItems: {[key: number]: IAddonRoomListItem};
}
export const setCustomAddonRoomListItemActionCreator = (customRoomListItems: IAddonRoomListItem[]): ISetCustomAddonRoomListItemAction => ({
  type: SET_CUSTOM_ADDON_ROOM_LIST_ITEM,
  customRoomListItems: customRoomListItems,
});

export type AddonMessageActions = IAddonBaseAction
  | ISetAddonMessageAction
  | ISetCustomAddonMessageAction
  | IUpdateAddonMessageMenuIndexAction
  | ISetAddonRoomListItemAction
  | ISetCustomAddonRoomListItemAction
;

export const updateAddonMessageMenuIndexActionDispatch = (currentMenuIndex: number) => store.dispatch(updateAddonMessageMenuIndexActionCreator(currentMenuIndex));
export const setAddonMessageActionDispatch = (messages: IAddonMessage[]) => store.dispatch(setAddonMessageActionCreator(messages));
export const setCustomAddonMessageActionDispatch = (messages: IAddonMessage[]) => store.dispatch(setCustomAddonMessageActionCreator(messages));
export const setAddonRoomListItemActionDispatch = (roomListItems: IAddonRoomListItem[]) => store.dispatch(setAddonRoomListItemActionCreator(roomListItems));
