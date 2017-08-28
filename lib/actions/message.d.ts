import { Action } from 'redux';
import { IMessages, IMessage, IProblemDetail } from '../';
export declare const BEFORE_MESSAGES_FETCH = "BEFORE_MESSAGES_FETCH";
export declare const MESSAGES_FETCH_REQUEST = "MESSAGES_FETCH_REQUEST";
export declare const MESSAGES_FETCH_REQUEST_SUCCESS = "MESSAGES_FETCH_REQUEST_SUCCESS";
export declare const MESSAGES_FETCH_REQUEST_FAILURE = "MESSAGES_FETCH_REQUEST_FAILURE";
export declare const CREATE_MESSAGE = "CREATE_MESSAGE";
export declare const MESSAGES_SEND_REQUEST = "MESSAGES_SEND_REQUEST";
export declare const MESSAGES_SEND_REQUEST_SUCCESS = "MESSAGES_SEND_REQUEST_SUCCESS";
export declare const MESSAGES_SEND_REQUEST_FAILURE = "MESSAGES_SEND_REQUEST_FAILURE";
export declare const UPDATE_MESSAGES = "UPDATE_MESSAGES";
export declare const CLEAR_MESSAGES = "CLEAR_MESSAGES";
export declare type MessageActionTypes = typeof BEFORE_MESSAGES_FETCH | typeof MESSAGES_FETCH_REQUEST | typeof MESSAGES_FETCH_REQUEST_SUCCESS | typeof MESSAGES_FETCH_REQUEST_FAILURE | typeof CREATE_MESSAGE | typeof MESSAGES_SEND_REQUEST | typeof MESSAGES_SEND_REQUEST_SUCCESS | typeof MESSAGES_SEND_REQUEST_FAILURE | typeof UPDATE_MESSAGES | typeof CLEAR_MESSAGES;
export interface IBeforeMessagesFetchAction extends Action {
    type: MessageActionTypes;
    messagesAllCount: number;
    messagesLimit: number;
}
export declare const beforeMessagesFetchActionActionCreator: (messagesAllCount: number, messagesLimit: number) => IBeforeMessagesFetchAction;
export interface IMessagesFetchRequestAction extends Action {
    type: MessageActionTypes;
}
export declare const messagesFetchRequestActionCreator: () => IMessagesFetchRequestAction;
export interface IMessagesFetchRequestSuccessAction extends Action {
    type: MessageActionTypes;
    messages: IMessages;
}
export declare const messagesFetchRequestSuccessActionCreator: (messages: IMessages) => IMessagesFetchRequestSuccessAction;
export interface IMessagesFetchRequestFailureAction extends Action {
    type: MessageActionTypes;
    problemDetail: IProblemDetail;
}
export declare const messagesFetchRequestFailureActionCreator: (problemDetail: IProblemDetail) => IMessagesFetchRequestFailureAction;
export interface ICreateMessageAction extends Action {
    type: MessageActionTypes;
    messageType: string;
    payload: Object;
}
export declare const createMessageActionCreator: (messageType: string, payload: Object) => ICreateMessageAction;
export interface IMessagesSendRequestAction extends Action {
    type: MessageActionTypes;
}
export declare const messagesSendRequestActionCreator: () => IMessagesSendRequestAction;
export interface IMessagesSendRequestSuccessAction extends Action {
    type: MessageActionTypes;
    messages: IMessage[];
}
export declare const messageSendRequestSuccessActionCreator: (messages: IMessage[]) => IMessagesSendRequestSuccessAction;
export interface IMessagesSendRequestFailureAction extends Action {
    type: MessageActionTypes;
    problemDetail: IProblemDetail;
}
export declare const messagesSendRequestFailureActionCreator: (problemDetail: IProblemDetail) => IMessagesSendRequestFailureAction;
export interface ISendMessagesAction extends Action {
    type: MessageActionTypes;
}
export declare const sendMessagesActionCreator: () => ISendMessagesAction;
export interface IUpdateMessagesAction extends Action {
    type: MessageActionTypes;
    messages: IMessage[];
}
export declare const updateMessagesActionCreator: (messages: IMessage[]) => IUpdateMessagesAction;
export interface IClearMessagesAction extends Action {
    type: MessageActionTypes;
}
export declare const clearMessagesActionCreator: () => IClearMessagesAction;
export declare type MessageActions = IBeforeMessagesFetchAction | IMessagesFetchRequestAction | IMessagesFetchRequestSuccessAction | IMessagesFetchRequestFailureAction | ICreateMessageAction | ISendMessagesAction | IClearMessagesAction;
