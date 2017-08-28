import { Action } from 'redux';
import { Client } from '../';

export const SET_CLIENT = 'SET_CLIENT';

export type ClientActionTypes = typeof SET_CLIENT;

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

export type ClientActions = IClientBaseAction |
  ISetClientAction
;
