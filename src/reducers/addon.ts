import { IAddonState } from '../stores/';
import {
  ISetAddonMessageAction,
  ISetCustomAddonMessageAction,
  IUpdateAddonMessageMenuIndexAction,
  ISetAddonRoomListItemAction,
  ISetCustomAddonRoomListItemAction,
  SET_ADDON_MESSAGE,
  SET_CUSTOM_ADDON_MESSAGE,
  UPDATE_ADDON_MESSAGE_MENU_INDEX,
  SET_ADDON_ROOM_LIST_ITEM,
  SET_CUSTOM_ADDON_ROOM_LIST_ITEM,
  AddonMessageActions,
} from '../actions/addon';

const getInitialState = (): IAddonState => ({
  messages: [],
  customMessages: [],
  currentMenuIndex: 0,
  roomListItems: {},
  customRoomListItems: null,
});

export function addon(state: IAddonState = getInitialState(), action: AddonMessageActions): IAddonState {
  switch (action.type) {
    case SET_ADDON_MESSAGE:
      return Object.assign(
        {},
        state,
        {
          messages: (<ISetAddonMessageAction>action).messages,
        }
      );
    case SET_CUSTOM_ADDON_MESSAGE:
      return Object.assign(
        {},
        state,
        {
          customMessages: (<ISetCustomAddonMessageAction>action).customMessages,
        }
      );
    case UPDATE_ADDON_MESSAGE_MENU_INDEX:
      return Object.assign(
        {},
        state,
        {
          currentMenuIndex: (<IUpdateAddonMessageMenuIndexAction>action).currentMenuIndex,
        }
      );
    case SET_ADDON_ROOM_LIST_ITEM:
      return Object.assign(
        {},
        state,
        {
          roomListItems: (<ISetAddonRoomListItemAction>action).roomListItems,
        }
      );
    case SET_CUSTOM_ADDON_ROOM_LIST_ITEM:
      return Object.assign(
        {},
        state,
        {
          customRoomListItems: (<ISetCustomAddonRoomListItemAction>action).customRoomListItems,
        }
      );
    default:
      return state;
  }
}
