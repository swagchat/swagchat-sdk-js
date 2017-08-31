import { store } from './';
import { IMessage, IProblemDetail } from '../';
import {
  messagesFetchRequestActionCreator,
  createMessageActionCreator,
  sendMessagesActionCreator,
} from '../actions/message';

export interface IMessageState {
  messagesAllCount: number;
  messagesLimit: number;
  messagesOffset: number;
  messages: {[key: string]: IMessage};
  problemDetail: IProblemDetail | null;
  createMessages: IMessage[];
}

export const messagesFetchRequestActionDispatch = function() {
  store.dispatch(messagesFetchRequestActionCreator());
};
export const createMessageActionDispatch = function(messageType: string, payload: Object) {
  store.dispatch(createMessageActionCreator(messageType, payload));
};
export const sendMessagesActionDispatch = function() {
  store.dispatch(sendMessagesActionCreator());
};
