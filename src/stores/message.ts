import { IMessage } from '../';

export interface IMessageState {
  messagesAllCount: number;
  messagesLimit: number;
  messagesOffset: number;
  messageMap: {[key: string]: IMessage};
  messageList: IMessage[];
  createMessages: IMessage[];
}
