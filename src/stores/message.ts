import { IMessage, RetrieveRoomMessagesReason } from '..';
import { IErrorResponse } from '../interface';

export const SCROLL_BOTTOM_ANIMATION_DURATION = 1000;

export interface MessageState {
  scrollBottomAnimationDuration: number;
  displayScrollBottomButton: boolean;
  modal: boolean;

  // retrieving message
  isFirstFetch: boolean;
  isLoadingRoomMessages: boolean;
  roomMessagesAllCount: number;
  roomMessagesLimit: number;
  roomMessagesOffset: number;
  roomMessagesLimitTimestamp: number;
  roomMessagesOffsetTimestamp: number;
  roomMessages: IMessage[];
  roomMessagesMap: {[messageId: string]: IMessage};
  retrieveRoomMessagesReason: RetrieveRoomMessagesReason;

  // sending message
  localRoomMessages: IMessage[];

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

  // error
  errorResponse: IErrorResponse | null;
}