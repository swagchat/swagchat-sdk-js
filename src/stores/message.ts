import { IMessage } from '../';

export interface IMessageState {
  messagesAllCount: number;
  messagesLimit: number;
  messagesOffset: number;
  messages: {[key: string]: IMessage};
  createMessages: IMessage[];
}
