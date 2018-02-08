import { IMessage } from '../';

export const SCROLL_BOTTOM_ANIMATION_DURATION = 1000;

export interface MessageState {
  messagesAllCount: number;
  messagesLimit: number;
  messagesOffset: number;
  messageMap: {[key: string]: IMessage};
  messageList: IMessage[];
  createMessages: IMessage[];
  scrollBottomAnimationDuration: number;
  isSpeechMode: boolean;
  speechSynthesisUtterance: SpeechSynthesisUtterance | null;
}