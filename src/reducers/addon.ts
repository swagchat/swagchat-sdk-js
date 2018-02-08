import { AddonState } from '../stores/addon';
import {
  SetAddonMessageAction,
  SetCustomAddonMessageAction,
  UpdateAddonMessageMenuIndexAction,
  SetAddonRoomListItemAction,
  SetCustomAddonRoomListItemAction,
  SET_ADDON_MESSAGE,
  SET_CUSTOM_ADDON_MESSAGE,
  UPDATE_ADDON_MESSAGE_MENU_INDEX,
  SET_ADDON_ROOM_LIST_ITEM,
  SET_CUSTOM_ADDON_ROOM_LIST_ITEM,
  AddonActions,
} from '../actions/addon';

const getInitialState = (): AddonState => ({
  messages: [],
  customMessages: [],
  currentMenuIndex: 0,
  roomListItems: {},
  customRoomListItems: null,
});

export function addon(state: AddonState = getInitialState(), action: AddonActions): AddonState {
  switch (action.type) {
    case SET_ADDON_MESSAGE:
      return Object.assign(
        {},
        state,
        {
          messages: (action as SetAddonMessageAction).messages,
        }
      );
    case SET_CUSTOM_ADDON_MESSAGE:
      return Object.assign(
        {},
        state,
        {
          customMessages: (action as SetCustomAddonMessageAction).customMessages,
        }
      );
    case UPDATE_ADDON_MESSAGE_MENU_INDEX:
      return Object.assign(
        {},
        state,
        {
          currentMenuIndex: (action as UpdateAddonMessageMenuIndexAction).currentMenuIndex,
        }
      );
    case SET_ADDON_ROOM_LIST_ITEM:
      return Object.assign(
        {},
        state,
        {
          roomListItems: (action as SetAddonRoomListItemAction).roomListItems,
        }
      );
    case SET_CUSTOM_ADDON_ROOM_LIST_ITEM:
      return Object.assign(
        {},
        state,
        {
          customRoomListItems: (action as SetCustomAddonRoomListItemAction).customRoomListItems,
        }
      );
    default:
      return state;
  }
}