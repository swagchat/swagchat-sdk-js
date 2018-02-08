import { IAddonMessage, IAddonRoomListItem } from '../';

export interface AddonState {
  messages: IAddonMessage[];
  customMessages: IAddonMessage[];
  currentMenuIndex: number;

  roomListItems: {[key: number]: IAddonRoomListItem};
  customRoomListItems: {[key: string]: IAddonRoomListItem} | null;
}