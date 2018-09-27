import { Action } from 'redux';
import { Client, ISettings } from '..';

export const SET_CLIENT = 'SET_CLIENT';
export const SET_SETTINGS = 'SET_SETTINGS';

export type ClientActionTypes =
  typeof SET_CLIENT |
  typeof SET_SETTINGS
;

export interface ClientBaseAction extends Action {
  type: ClientActionTypes;
}

export interface SetClientAction extends ClientBaseAction {
  client: Client;
}
export const setClientActionCreator = (client: Client): SetClientAction => ({
  type: SET_CLIENT,
  client
});

export interface SetSettingsAction extends ClientBaseAction {
  settings: ISettings;
}
export const setSettingsActionCreator = (settings: ISettings): SetSettingsAction => ({
  type: SET_SETTINGS,
  settings
});


export type ClientActions =
  ClientBaseAction |
  SetClientAction |
  SetSettingsAction
;