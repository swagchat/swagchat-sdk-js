import { IPluginState } from '../stores/';
import {
  ISetPluginMessageAction,
  ISetCustomPluginMessageAction,
  IPluginMessageUpdateMenuIndexAction,
  ISetPluginRoomListItemAction,
  ISetCustomPluginRoomListItemAction,
  SET_PLUGIN_MESSAGE,
  SET_CUSTOM_PLUGIN_MESSAGE,
  PLUGIN_MESSAGE_UPDATE_MENU_INDEX,
  SET_PLUGIN_ROOM_LIST_ITEM,
  SET_CUSTOM_PLUGIN_ROOM_LIST_ITEM,
  PluginMessageActions,
} from '../actions/plugin';

const getInitialState = (): IPluginState => ({
  messages: [],
  customMessages: [],
  currentMenuIndex: 0,
  roomListItems: {},
  customRoomListItems: null,
});

export function plugin(state: IPluginState = getInitialState(), action: PluginMessageActions): IPluginState {
  switch (action.type) {
    case SET_PLUGIN_MESSAGE:
      return Object.assign(
        {},
        state,
        {
          messages: (<ISetPluginMessageAction>action).messages,
        }
      );
    case SET_CUSTOM_PLUGIN_MESSAGE:
      return Object.assign(
        {},
        state,
        {
          customMessages: (<ISetCustomPluginMessageAction>action).customMessages,
        }
      );
    case PLUGIN_MESSAGE_UPDATE_MENU_INDEX:
      return Object.assign(
        {},
        state,
        {
          currentMenuIndex: (<IPluginMessageUpdateMenuIndexAction>action).currentMenuIndex,
        }
      );
    case SET_PLUGIN_ROOM_LIST_ITEM:
      return Object.assign(
        {},
        state,
        {
          roomListItems: (<ISetPluginRoomListItemAction>action).roomListItems,
        }
      );
    case SET_CUSTOM_PLUGIN_ROOM_LIST_ITEM:
      return Object.assign(
        {},
        state,
        {
          customRoomListItems: (<ISetCustomPluginRoomListItemAction>action).customRoomListItems,
        }
      );
    default:
      return state;
  }
}
