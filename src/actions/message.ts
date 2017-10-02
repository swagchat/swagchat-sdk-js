import { Action } from 'redux';
import { store } from '../stores';
import { IMessages, IMessage, IProblemDetail } from '../';

export const BEFORE_FETCH_MESSAGES_REQUEST = 'BEFORE_FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_REQUEST = 'FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_REQUEST_SUCCESS = 'FETCH_MESSAGES_REQUEST_SUCCESS';
export const FETCH_MESSAGES_REQUEST_FAILURE = 'FETCH_MESSAGES_REQUEST_FAILURE';
export const CREATE_MESSAGE = 'CREATE_MESSAGE';
export const SEND_MESSAGES_REQUEST = 'SEND_MESSAGES_REQUEST';
export const SEND_MESSAGES_REQUEST_SUCCESS = 'SEND_MESSAGES_REQUEST_SUCCESS';
export const SEND_MESSAGES_REQUEST_FAILURE = 'SEND_MESSAGES_REQUEST_FAILURE';
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES';
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';

export type MessageActionTypes = typeof BEFORE_FETCH_MESSAGES_REQUEST
  | typeof FETCH_MESSAGES_REQUEST
  | typeof FETCH_MESSAGES_REQUEST_SUCCESS
  | typeof FETCH_MESSAGES_REQUEST_FAILURE
  | typeof CREATE_MESSAGE
  | typeof SEND_MESSAGES_REQUEST
  | typeof SEND_MESSAGES_REQUEST_SUCCESS
  | typeof SEND_MESSAGES_REQUEST_FAILURE
  | typeof UPDATE_MESSAGES
  | typeof CLEAR_MESSAGES
;

export interface IMessageBaseAction extends Action {
  type: MessageActionTypes;
}

export interface IBeforeFetchMessagesRequestAction extends IMessageBaseAction {
  messagesAllCount: number;
  messagesLimit: number;
}
export const beforeFetchMessagesRequestActionCreator = (messagesAllCount: number, messagesLimit: number): IBeforeFetchMessagesRequestAction => ({
  type: BEFORE_FETCH_MESSAGES_REQUEST,
  messagesAllCount: messagesAllCount,
  messagesLimit: messagesLimit,
});

export interface IFetchMessagesRequestAction extends IMessageBaseAction {
}
export const fetchMessagesRequestActionCreator = (): IFetchMessagesRequestAction => ({
  type: FETCH_MESSAGES_REQUEST,
});

export interface IFetchMessagesRequestSuccessAction extends IMessageBaseAction {
  messages: IMessages;
}
export const fetchMessagesRequestSuccessActionCreator = (messages: IMessages): IFetchMessagesRequestSuccessAction => ({
  type: FETCH_MESSAGES_REQUEST_SUCCESS,
  messages: messages,
});

export interface IFetchMessagesRequestFailureAction extends IMessageBaseAction {
  problemDetail: IProblemDetail;
}
export const fetchMessagesRequestFailureActionCreator = (problemDetail: IProblemDetail): IFetchMessagesRequestFailureAction => ({
  type: FETCH_MESSAGES_REQUEST_FAILURE,
  problemDetail: problemDetail,
});

export interface ICreateMessageAction extends IMessageBaseAction {
  messageType: string;
  payload: Object;
}
export const createMessageActionCreator = (messageType: string, payload: Object): ICreateMessageAction => ({
  type: CREATE_MESSAGE,
  messageType: messageType,
  payload: payload,
});

export interface ISendMessagesRequestAction extends IMessageBaseAction {
}
export const sendMessagesRequestActionCreator = (): ISendMessagesRequestAction => ({
  type: SEND_MESSAGES_REQUEST,
});

export interface ISendMessagesRequestSuccessAction extends IMessageBaseAction {
  messageList: IMessage[];
}
export const sendMessagesRequestSuccessActionCreator = (messageList: IMessage[]): ISendMessagesRequestSuccessAction => ({
  type: SEND_MESSAGES_REQUEST_SUCCESS,
  messageList: messageList,
});

export interface ISendMessagesRequestFailureAction extends IMessageBaseAction {
  problemDetail: IProblemDetail;
}
export const sendMessagesRequestFailureActionCreator = (problemDetail: IProblemDetail): ISendMessagesRequestFailureAction => ({
  type: SEND_MESSAGES_REQUEST_FAILURE,
  problemDetail: problemDetail,
});

export interface IUpdateMessagesAction extends IMessageBaseAction {
  messageList: IMessage[];
}
export const updateMessagesActionCreator = (messageList: IMessage[]): IUpdateMessagesAction => ({
  type: UPDATE_MESSAGES,
  messageList: messageList,
});

export interface IClearMessagesAction extends IMessageBaseAction {
}
export const clearMessagesActionCreator = (): IClearMessagesAction => ({
  type: CLEAR_MESSAGES
});

export type MessageActions = IBeforeFetchMessagesRequestAction
  | IFetchMessagesRequestAction
  | IFetchMessagesRequestSuccessAction
  | IFetchMessagesRequestFailureAction
  | ISendMessagesRequestAction
  | ISendMessagesRequestSuccessAction
  | ISendMessagesRequestFailureAction
  | ICreateMessageAction
  | IClearMessagesAction
;

export const fetchMessagesRequestActionDispatch = () => store.dispatch(fetchMessagesRequestActionCreator());
export const createMessageActionDispatch = (messageType: string, payload: Object) => store.dispatch(createMessageActionCreator(messageType, payload));
export const sendMessagesRequestActionDispatch = () => store.dispatch(sendMessagesRequestActionCreator());
