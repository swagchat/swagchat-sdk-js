import { Action } from 'redux';
import { store } from '../stores';
import { IMessages, IMessage, IProblemDetail } from '../';

export const BEFORE_MESSAGES_FETCH = 'BEFORE_MESSAGES_FETCH';
export const MESSAGES_FETCH_REQUEST = 'MESSAGES_FETCH_REQUEST';
export const MESSAGES_FETCH_REQUEST_SUCCESS = 'MESSAGES_FETCH_REQUEST_SUCCESS';
export const MESSAGES_FETCH_REQUEST_FAILURE = 'MESSAGES_FETCH_REQUEST_FAILURE';
export const CREATE_MESSAGE = 'CREATE_MESSAGE';
export const MESSAGES_SEND_REQUEST = 'MESSAGES_SEND_REQUEST';
export const MESSAGES_SEND_REQUEST_SUCCESS = 'MESSAGES_SEND_REQUEST_SUCCESS';
export const MESSAGES_SEND_REQUEST_FAILURE = 'MESSAGES_SEND_REQUEST_FAILURE';
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES';
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';

export type MessageActionTypes = typeof BEFORE_MESSAGES_FETCH
  | typeof MESSAGES_FETCH_REQUEST
  | typeof MESSAGES_FETCH_REQUEST_SUCCESS
  | typeof MESSAGES_FETCH_REQUEST_FAILURE
  | typeof CREATE_MESSAGE
  | typeof MESSAGES_SEND_REQUEST
  | typeof MESSAGES_SEND_REQUEST_SUCCESS
  | typeof MESSAGES_SEND_REQUEST_FAILURE
  | typeof UPDATE_MESSAGES
  | typeof CLEAR_MESSAGES
;

export interface IBeforeMessagesFetchAction extends Action {
  type: MessageActionTypes;
  messagesAllCount: number;
  messagesLimit: number;
}
export const beforeMessagesFetchActionActionCreator = (messagesAllCount: number, messagesLimit: number): IBeforeMessagesFetchAction => ({
  type: BEFORE_MESSAGES_FETCH,
  messagesAllCount: messagesAllCount,
  messagesLimit: messagesLimit,
});

export interface IMessagesFetchRequestAction extends Action {
  type: MessageActionTypes;
}
export const messagesFetchRequestActionCreator = (): IMessagesFetchRequestAction => ({
  type: MESSAGES_FETCH_REQUEST,
});

export interface IMessagesFetchRequestSuccessAction extends Action {
  type: MessageActionTypes;
  messages: IMessages;
}
export const messagesFetchRequestSuccessActionCreator = (messages: IMessages): IMessagesFetchRequestSuccessAction => ({
  type: MESSAGES_FETCH_REQUEST_SUCCESS,
  messages: messages,
});

export interface IMessagesFetchRequestFailureAction extends Action {
  type: MessageActionTypes;
  problemDetail: IProblemDetail;
}
export const messagesFetchRequestFailureActionCreator = (problemDetail: IProblemDetail): IMessagesFetchRequestFailureAction => ({
  type: MESSAGES_FETCH_REQUEST_FAILURE,
  problemDetail: problemDetail,
});

export interface ICreateMessageAction extends Action {
  type: MessageActionTypes;
  messageType: string;
  payload: Object;
}
export const createMessageActionCreator = (messageType: string, payload: Object): ICreateMessageAction => ({
  type: CREATE_MESSAGE,
  messageType: messageType,
  payload: payload,
});

export interface IMessagesSendRequestAction extends Action {
  type: MessageActionTypes;
}
export const messagesSendRequestActionCreator = (): IMessagesSendRequestAction => ({
  type: MESSAGES_SEND_REQUEST,
});

export interface IMessagesSendRequestSuccessAction extends Action {
  type: MessageActionTypes;
  messages: IMessage[];
}
export const messageSendRequestSuccessActionCreator = (messages: IMessage[]): IMessagesSendRequestSuccessAction => ({
  type: MESSAGES_SEND_REQUEST_SUCCESS,
  messages: messages,
});

export interface IMessagesSendRequestFailureAction extends Action {
  type: MessageActionTypes;
  problemDetail: IProblemDetail;
}
export const messagesSendRequestFailureActionCreator = (problemDetail: IProblemDetail): IMessagesSendRequestFailureAction => ({
  type: MESSAGES_SEND_REQUEST_FAILURE,
  problemDetail: problemDetail,
});

export interface ISendMessagesAction extends Action {
  type: MessageActionTypes;
}
export const sendMessagesActionCreator = (): ISendMessagesAction => ({
  type: MESSAGES_SEND_REQUEST,
});

export interface IUpdateMessagesAction extends Action {
  type: MessageActionTypes;
  messages: IMessage[];
}
export const updateMessagesActionCreator = (messages: IMessage[]): IUpdateMessagesAction => ({
  type: UPDATE_MESSAGES,
  messages: messages,
});

export interface IClearMessagesAction extends Action {
  type: MessageActionTypes;
}
export const clearMessagesActionCreator = (): IClearMessagesAction => ({
  type: CLEAR_MESSAGES
});

export type MessageActions = IBeforeMessagesFetchAction
  | IMessagesFetchRequestAction
  | IMessagesFetchRequestSuccessAction
  | IMessagesFetchRequestFailureAction
  | ICreateMessageAction
  | ISendMessagesAction
  | IClearMessagesAction
;

export const messagesFetchRequestActionDispatch = () => store.dispatch(messagesFetchRequestActionCreator());
export const createMessageActionDispatch = (messageType: string, payload: Object) => store.dispatch(createMessageActionCreator(messageType, payload));
export const sendMessagesActionDispatch = () => store.dispatch(sendMessagesActionCreator());
