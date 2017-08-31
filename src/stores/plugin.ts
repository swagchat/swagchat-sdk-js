import { store } from './';
import { IPluginMessage, IPluginRoomListItem } from '../interface';
import {
  pluginMessageUpdateMenuIndexActionCreator,
} from '../actions/plugin';

export interface IPluginState {
  messages: IPluginMessage[];
  customMessages: IPluginMessage[];
  currentMenuIndex: number;

  roomListItems: {[key: number]: IPluginRoomListItem};
  customRoomListItems: {[key: string]: IPluginRoomListItem} | null;
}

export const updateMenuIndexActionDispatch = function(currentMenuIndex: number) {
  store.dispatch(pluginMessageUpdateMenuIndexActionCreator(currentMenuIndex));
};

