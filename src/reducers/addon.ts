import { AddonState } from '../stores/addon';
import {
  AddonActions,
  SET_ADDON_MESSAGE, SetAddonMessageAction,
  SET_CUSTOM_ADDON_MESSAGE, SetCustomAddonMessageAction,
  UPDATE_ADDON_MESSAGE_MENU_INDEX, UpdateAddonMessageMenuIndexAction,
  SET_ADDON_ROOM_LIST_ITEM, SetAddonRoomListItemAction,
  SET_CUSTOM_ADDON_ROOM_LIST_ITEM, SetCustomAddonRoomListItemAction,
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