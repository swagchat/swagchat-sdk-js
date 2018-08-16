import { IAddonMessage, IAddonRoomListItem } from '..';

export interface AddonState {
  messages: {[key: string]: IAddonMessage} | null;
  customMessages: IAddonMessage[];
  currentMenuIndex: number;

  roomListItems: {[key: number]: IAddonRoomListItem};
  customRoomListItems: {[key: string]: IAddonRoomListItem} | null;
}