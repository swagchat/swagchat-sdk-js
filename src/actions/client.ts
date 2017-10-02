import { Action } from 'redux';
import { Client, Room } from '../';
import { store } from '../stores';

export const SET_CLIENT = 'SET_CLIENT';
export const SET_CURRENT_ROOM = 'SET_CURRENT_ROOM';
export const SET_AUTH_PARAMS = 'SET_AUTH_PARAMS';

export type ClientActionTypes = typeof SET_CLIENT
| typeof SET_CURRENT_ROOM
| typeof SET_AUTH_PARAMS
;

export interface IClientBaseAction extends Action {
  type: ClientActionTypes;
}

export interface ISetClientAction extends IClientBaseAction {
  client: Client;
}
export const setClientActionCreator = (client: Client): ISetClientAction => ({
  type: SET_CLIENT,
  client: client,
});

export interface ISetCurrentRoomAction extends IClientBaseAction {
  currentRoom: Room;
}
export const setCurrentRoomActionCreator = (currentRoom: Room): ISetCurrentRoomAction => ({
  type: SET_CURRENT_ROOM,
  currentRoom: currentRoom,
});

export interface ISetAuthParamsAction extends IClientBaseAction {
  userId: string;
  accessToken: string;
}
export const setAuthParamsActionCreator = (
  userId: string,
  accessToken: string,
  ): ISetAuthParamsAction => ({
  type: SET_AUTH_PARAMS,
  userId: userId,
  accessToken: accessToken,
});

export type ClientActions = IClientBaseAction
  | ISetClientAction
  | ISetAuthParamsAction
;

export const setClientActionDispatch = (client: Client) => store.dispatch(setClientActionCreator(client));
export const setCurrentRoomActionDispatch = (currentRoom: Room) => store.dispatch(setCurrentRoomActionCreator(currentRoom));
export const setAuthParamsActionDispatch = (userId: string, accessToken: string) => store.dispatch(setAuthParamsActionCreator(userId, accessToken));
