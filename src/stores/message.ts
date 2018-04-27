import { IMessage } from '../';

export const SCROLL_BOTTOM_ANIMATION_DURATION = 1000;

export interface MessageState {
  isFirstFetch: boolean;
  sending: boolean;
  messagesAllCount: number;
  messagesLimit: number;
  messagesOffset: number;
  messagesBeforeSending: IMessage[];
  messagesSending: IMessage[];
  messageList: IMessage[];
  messageMap: {[key: string]: IMessage};
  scrollBottomAnimationDuration: number;

  // speech
  isSpeechMode: boolean;
  speechSynthesisUtterance: SpeechSynthesisUtterance | null;

  // search
  searchText: string;
  searchResultTabIndex: number;
}