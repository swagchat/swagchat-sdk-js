import { Action } from 'redux';
import { Client } from '../';
export declare const SET_CLIENT = "SET_CLIENT";
export declare type ClientActionTypes = typeof SET_CLIENT;
export interface IClientBaseAction extends Action {
    type: ClientActionTypes;
}
export interface ISetClientAction extends IClientBaseAction {
    client: Client;
}
export declare const setClientActionCreator: (client: Client) => ISetClientAction;
export declare type ClientActions = IClientBaseAction | ISetClientAction;
