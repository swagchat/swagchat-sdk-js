import { IMessage } from '..';

export const SCROLL_BOTTOM_ANIMATION_DURATION = 1000;

export interface MessageState {
  isFirstFetch: boolean;
  sending: boolean;
  scrollBottomAnimationDuration: number;
  displayScrollBottomButton: boolean;
  modal: boolean;

  // message data
  roomMessagesRowsHeightList: Array<number>;
  isLoadingRoomMessages: boolean;
  roomMessagesAllCount: number;
  roomMessagesLimit: number;
  roomMessagesOffset: number;
  localMessageList: IMessage[];
  localMessageMap: {[key: string]: IMessage};
  roomMessages: IMessage[];
  messageMap: {[key: string]: IMessage};

  // text
  text: string;

  // drag and drop file
  dropImageFile: File | null;
  dropFile: File | null;

  // speech
  isSpeechMode: boolean;
  speechSynthesisUtterance: SpeechSynthesisUtterance | null;

  // search
  searchText: string;
  searchResultTabIndex: number;

  // indicator
  indicators: {[key: string]: IMessage};

}