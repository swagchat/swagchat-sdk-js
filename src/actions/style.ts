import { Action } from 'redux';
import { store } from '../stores';
import {
  IMessageBodyMenuStyle,
} from '../stores/style';

export const UPDATE_MODAL = 'UPDATE_MODAL';
export const CLEAR_MODAL = 'CLEAR_MODAL';
export const UPDATE_MESSAGE_BODY_MENU_STYLE = 'UPDATE_MESSAGE_BODY_MENU_STYLE';
export const UPDATE_PLUGIN_MESSAGE_TEXT_INTERACTION_STYLE = 'UPDATE_PLUGIN_MESSAGE_TEXT_INTERACTION_STYLE';

export type StyleActionTypes = typeof UPDATE_MODAL
  | typeof CLEAR_MODAL
  | typeof UPDATE_MESSAGE_BODY_MENU_STYLE
  | typeof UPDATE_PLUGIN_MESSAGE_TEXT_INTERACTION_STYLE
;

export interface IStyleBaseAction extends Action {
  type: StyleActionTypes;
}

export interface IUpdateModalAction extends IStyleBaseAction {
  type: StyleActionTypes;
  modalKey: string;
}
export const updateModalActionCreator = (modalKey: string): IUpdateModalAction => ({
  type: UPDATE_MODAL,
  modalKey: modalKey,
});

export interface IClearModalAction extends IStyleBaseAction {
  type: StyleActionTypes;
}
export const clearModalActionCreator = (): IClearModalAction => ({
  type: CLEAR_MODAL
});

export interface IUpdateMessageBodyMenuStyleAction extends IStyleBaseAction {
  type: StyleActionTypes;
  messageBodyMenuStyle: IMessageBodyMenuStyle;
}
export const updateMessageBodyMenuStyleActionCreator = (messageBodyMenuStyle: IMessageBodyMenuStyle): IUpdateMessageBodyMenuStyleAction => ({
  type: UPDATE_MESSAGE_BODY_MENU_STYLE,
  messageBodyMenuStyle: messageBodyMenuStyle,
});

export type StyleActions = IStyleBaseAction
  | IUpdateModalAction
  | IClearModalAction
  | IUpdateMessageBodyMenuStyleAction
;

export const updateModalActionDispatch = (modalKey: string) => store.dispatch(updateModalActionCreator(modalKey));
export const clearModalActionDispatch = () => store.dispatch(clearModalActionCreator());
export const updateMessageBodyMenuStyleActionDispatch = (messageBodyMenuStyle: IMessageBodyMenuStyle) => store.dispatch(updateMessageBodyMenuStyleActionCreator(messageBodyMenuStyle));
