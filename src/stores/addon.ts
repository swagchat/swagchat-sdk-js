import { IAddonMessage, IAddonRoomListItem } from '../interface';

export interface IAddonState {
  messages: IAddonMessage[];
  customMessages: IAddonMessage[];
  currentMenuIndex: number;

  roomListItems: {[key: number]: IAddonRoomListItem};
  customRoomListItems: {[key: string]: IAddonRoomListItem} | null;
}

