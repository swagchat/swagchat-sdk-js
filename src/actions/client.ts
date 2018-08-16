import { Action } from 'redux';
import { Client } from '..';

export const SET_CLIENT = 'SET_CLIENT';

export type ClientActionTypes =
  typeof SET_CLIENT
;

export interface ClientBaseAction extends Action {
  type: ClientActionTypes;
}

export interface SetClientAction extends ClientBaseAction {
  client: Client;
}
export const setClientActionCreator = (client: Client): SetClientAction => ({
  type: SET_CLIENT,
  client: client,
});

export type ClientActions =
  ClientBaseAction |
  SetClientAction
;