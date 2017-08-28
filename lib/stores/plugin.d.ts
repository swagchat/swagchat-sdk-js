import { IPluginMessage, IPluginRoomListItem } from '../interface';
export interface IPluginState {
    messages: IPluginMessage[];
    customMessages: IPluginMessage[];
    currentMenuIndex: number;
    roomListItems: {
        [key: number]: IPluginRoomListItem;
    };
    customRoomListItems: {
        [key: string]: IPluginRoomListItem;
    } | null;
}
