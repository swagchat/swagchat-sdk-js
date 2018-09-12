import { Action } from 'redux';

import { IErrorResponse, IMessage, IRoomMessagesResponse, RetrieveRoomMessagesReason } from '../';

export const SET_IS_FIRST_FETCH = 'SET_IS_FIRST_FETCH';
export const BEFORE_RETRIEVE_ROOM_MESSAGES_REQUEST = 'BEFORE_RETRIEVE_ROOM_MESSAGES_REQUEST';
export const RESET_SCROLL_BOTTOM_ANIMATION_DURATION = 'RESET_SCROLL_BOTTOM_ANIMATION_DURATION';
export const SET_DISPLAY_SCROLL_BOTTOM_BUTTON = 'SET_DISPLAY_SCROLL_BOTTOM_BUTTON';
export const SET_MESSAGE_MODAL = 'SET_MESSAGE_MODAL';
export const RETRIEVE_ROOM_MESSAGES_REQUEST = 'RETRIEVE_ROOM_MESSAGES_REQUEST';
export const RETRIEVE_ROOM_MESSAGES_REQUEST_SUCCESS = 'RETRIEVE_ROOM_MESSAGES_REQUEST_SUCCESS';
export const RETRIEVE_ROOM_MESSAGES_REQUEST_FAILURE = 'RETRIEVE_ROOM_MESSAGES_REQUEST_FAILURE';
export const PUSH_LOCAL_MESSAGE = 'PUSH_LOCAL_MESSAGE';
export const SYNC_LOCAL_MESSAGES = 'SYNC_LOCAL_MESSAGES';
export const SEND_DIRECT_MESSAGES_REQUEST = 'SEND_DIRECT_MESSAGES_REQUEST';
export const SEND_MESSAGES_REQUEST = 'SEND_MESSAGES_REQUEST';
export const SEND_MESSAGES_REQUEST_SUCCESS = 'SEND_MESSAGES_REQUEST_SUCCESS';
export const SEND_MESSAGES_REQUEST_FAILURE = 'SEND_MESSAGES_REQUEST_FAILURE';
export const DELETE_LOCAL_MESSAGES = 'DELETE_LOCAL_MESSAGES';
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES';
export const CLEAR_ROOM_MESSAGES = 'CLEAR_ROOM_MESSAGES';
export const SET_MESSAGE_TEXT = 'SET_MESSAGE_TEXT';
export const SET_DROP_IMAGE_FILE = 'SET_DROP_IMAGE_FILE';
export const SET_DROP_FILE = 'SET_DROP_FILE';
export const CLEAR_DROP_FILE = 'CLEAR_DROP_FILE';
export const SET_SPEECH_MODE = 'SET_SPEECH_MODE';
export const SET_SPEECH_SYNTHESIS_UTTERANCE = 'SET_SPEECH_SYNTHESIS_UTTERANCE';
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';
export const SET_SEARCH_RESULT_TAB_INDEX = 'SET_SEARCH_RESULT_TAB_INDEX';
export const UPLOAD_ASSET_AND_SEND_MESSAGE_REQUEST = 'UPLOAD_ASSET_AND_SEND_MESSAGE_REQUEST';
export const REFRESH_INDICATOR = 'REFRESH_INDICATOR';

export type MessageActionTypes =
  typeof SET_IS_FIRST_FETCH |
  typeof BEFORE_RETRIEVE_ROOM_MESSAGES_REQUEST |
  typeof RESET_SCROLL_BOTTOM_ANIMATION_DURATION |
  typeof SET_DISPLAY_SCROLL_BOTTOM_BUTTON |
  typeof SET_MESSAGE_MODAL |
  typeof RETRIEVE_ROOM_MESSAGES_REQUEST |
  typeof RETRIEVE_ROOM_MESSAGES_REQUEST_SUCCESS |
  typeof RETRIEVE_ROOM_MESSAGES_REQUEST_FAILURE |
  typeof PUSH_LOCAL_MESSAGE |
  typeof SYNC_LOCAL_MESSAGES |
  typeof SEND_DIRECT_MESSAGES_REQUEST |
  typeof SEND_MESSAGES_REQUEST |
  typeof SEND_MESSAGES_REQUEST_SUCCESS |
  typeof SEND_MESSAGES_REQUEST_FAILURE |
  typeof DELETE_LOCAL_MESSAGES |
  typeof UPDATE_MESSAGES |
  typeof CLEAR_ROOM_MESSAGES |
  typeof SET_MESSAGE_TEXT |
  typeof SET_DROP_IMAGE_FILE |
  typeof SET_DROP_FILE |
  typeof CLEAR_DROP_FILE |
  typeof SET_SPEECH_MODE |
  typeof SET_SPEECH_SYNTHESIS_UTTERANCE |
  typeof SET_SEARCH_TEXT |
  typeof SET_SEARCH_RESULT_TAB_INDEX |
  typeof UPLOAD_ASSET_AND_SEND_MESSAGE_REQUEST |
  typeof REFRESH_INDICATOR
;

export interface MessageBaseAction extends Action {
  type: MessageActionTypes;
}

export interface SetIsFirstFetchAction extends MessageBaseAction {
  isFirstFetch: boolean;
}
export const setIsFirstFetchActionCreator =
    (isFirstFetch: boolean): SetIsFirstFetchAction => ({
  type: SET_IS_FIRST_FETCH,
  isFirstFetch: isFirstFetch,
});

export interface ResetScrollBottomAnimationDurationAction extends MessageBaseAction {
}
export const resetScrollBottomAnimationDurationActionCreator = (): ResetScrollBottomAnimationDurationAction => ({
  type: RESET_SCROLL_BOTTOM_ANIMATION_DURATION
});

export interface SetDisplayScrollBottomButtonAction extends MessageBaseAction {
  displayScrollBottomButton: boolean;
}
export const setDisplayScrollBottomButtonActionCreator = (displayScrollBottomButton: boolean): SetDisplayScrollBottomButtonAction => ({
  type: SET_DISPLAY_SCROLL_BOTTOM_BUTTON,
  displayScrollBottomButton: displayScrollBottomButton,
});

export interface SetMessageModalAction extends MessageBaseAction {
  modal: boolean;
}
export const setMessageModalActionCreator = (modal: boolean): SetMessageModalAction => ({
  type: SET_MESSAGE_MODAL,
  modal: modal,
});

export interface BeforeRetrieveRoomMessagesRequestAction extends MessageBaseAction {
  messagesAllCount: number;
  messagesLimit: number;
}
export const beforeRetrieveRoomMessagesRequestActionCreator =
    (messagesAllCount: number, messagesLimit: number): BeforeRetrieveRoomMessagesRequestAction => ({
  type: BEFORE_RETRIEVE_ROOM_MESSAGES_REQUEST,
  messagesAllCount: messagesAllCount,
  messagesLimit: messagesLimit,
});

export interface RetrieveRoomMessagesRequestAction extends MessageBaseAction {
  retrieveRoomMessagesReason: RetrieveRoomMessagesReason;
}
export const retrieveRoomMessagesRequestActionCreator = (retrieveRoomMessagesReason: RetrieveRoomMessagesReason): RetrieveRoomMessagesRequestAction => ({
  type: RETRIEVE_ROOM_MESSAGES_REQUEST,
  retrieveRoomMessagesReason,
});

export interface RetrieveRoomMessagesRequestSuccessAction extends MessageBaseAction {
  retrieveRoomMessagesReason: RetrieveRoomMessagesReason;
  roomMessagesResponse: IRoomMessagesResponse;
}
export const retrieveRoomMessagesRequestSuccessActionCreator = (retrieveRoomMessagesReason: RetrieveRoomMessagesReason, roomMessagesResponse: IRoomMessagesResponse): RetrieveRoomMessagesRequestSuccessAction => ({
  type: RETRIEVE_ROOM_MESSAGES_REQUEST_SUCCESS,
  retrieveRoomMessagesReason,
  roomMessagesResponse
});

export interface RetrieveRoomMessagesRequestFailureAction extends MessageBaseAction {
  errorResponse: IErrorResponse;
}
export const retrieveRoomMessagesRequestFailureActionCreator =
    (errorResponse: IErrorResponse): RetrieveRoomMessagesRequestFailureAction => ({
  type: RETRIEVE_ROOM_MESSAGES_REQUEST_FAILURE,
  errorResponse: errorResponse,
});

export interface PushLocalMessageAction extends MessageBaseAction {
  message: IMessage;
}
export const pushLocalMessageActionCreator = (message: IMessage): PushLocalMessageAction => ({
  type: PUSH_LOCAL_MESSAGE,
  message: message,
});

export interface SyncLocalMessagesAction extends MessageBaseAction {
}
export const syncLocalMessagesActionCreator = (): SyncLocalMessagesAction => ({
  type: SYNC_LOCAL_MESSAGES,
});

export interface SendDirectMessagesRequestAction extends MessageBaseAction {
  messages: IMessage[];
}
export const sendDirectMessagesRequestActionCreator = (messages: IMessage[]): SendDirectMessagesRequestAction => ({
  type: SEND_DIRECT_MESSAGES_REQUEST,
  messages: messages,
});

export interface SendMessagesRequestAction extends MessageBaseAction {
}
export const sendMessagesRequestActionCreator = (): SendMessagesRequestAction => ({
  type: SEND_MESSAGES_REQUEST,
});

export interface SendMessagesRequestSuccessAction extends MessageBaseAction {
  messageList: IMessage[];
}
export const sendMessagesRequestSuccessActionCreator = (messageList: IMessage[]): SendMessagesRequestSuccessAction => ({
  type: SEND_MESSAGES_REQUEST_SUCCESS,
  messageList: messageList,
});

export interface SendMessagesRequestFailureAction extends MessageBaseAction {
  errorResponse: IErrorResponse;
}
export const sendMessagesRequestFailureActionCreator =
    (errorResponse: IErrorResponse): SendMessagesRequestFailureAction => ({
  type: SEND_MESSAGES_REQUEST_FAILURE,
  errorResponse: errorResponse,
});

export interface DeleteLocalMessagesAction extends MessageBaseAction {
}
export const deleteLocalMessagesActionCreator = (): DeleteLocalMessagesAction => ({
  type: DELETE_LOCAL_MESSAGES,
});

export interface UpdateMessagesAction extends MessageBaseAction {
  messages: IMessage[];
}
export const updateMessagesActionCreator = (messages: IMessage[]): UpdateMessagesAction => ({
  type: UPDATE_MESSAGES,
  messages: messages,
});

export interface ClearRoomMessagesAction extends MessageBaseAction {
}
export const clearRoomMessagesActionCreator = (): ClearRoomMessagesAction => ({
  type: CLEAR_ROOM_MESSAGES
});


export interface SetMessageTextAction extends MessageBaseAction {
  text: string;
}
export const setMessageTextActionCreator = (text: string): SetMessageTextAction => ({
  type: SET_MESSAGE_TEXT,
  text: text,
});

export interface SetDropImageFileAction extends MessageBaseAction {
  dropImageFile: File;
}
export const setDropImageFileActionCreator = (dropImageFile: File): SetDropImageFileAction => ({
  type: SET_DROP_IMAGE_FILE,
  dropImageFile: dropImageFile,
});

export interface SetDropFileAction extends MessageBaseAction {
  dropFile: File;
}
export const setDropFileActionCreator = (dropFile: File): SetDropFileAction => ({
  type: SET_DROP_FILE,
  dropFile: dropFile,
});

export interface ClearDropFileAction extends MessageBaseAction {
}
export const clearDropFileActionCreator = (): ClearDropFileAction => ({
  type: CLEAR_DROP_FILE,
});

export interface SetSpeechModeAction extends MessageBaseAction {
  isSpeechMode: boolean;
}
export const setSpeechModeActionCreator = (isSpeechMode: boolean): SetSpeechModeAction => ({
  type: SET_SPEECH_MODE,
  isSpeechMode: isSpeechMode,
});

export interface SetSpeechSynthesisUtteranceAction extends MessageBaseAction {
  speechSynthesisUtterance: SpeechSynthesisUtterance;
}
export const setSpeechSynthesisUtteranceActionCreator =
    (speechSynthesisUtterance: SpeechSynthesisUtterance): SetSpeechSynthesisUtteranceAction => ({
  type: SET_SPEECH_SYNTHESIS_UTTERANCE,
  speechSynthesisUtterance: speechSynthesisUtterance,
});

export interface SetSearchTextAction extends MessageBaseAction {
  searchText: string;
}
export const setSearchTextActionCreator = (searchText: string): SetSearchTextAction => ({
  type: SET_SEARCH_TEXT,
  searchText: searchText,
});

export interface SetSearchResultTabIndexAction extends MessageBaseAction {
  searchResultTabIndex: number;
}
export const setSearchResultTabIndexActionCreator = (searchResultTabIndex: number): SetSearchResultTabIndexAction => ({
  type: SET_SEARCH_RESULT_TAB_INDEX,
  searchResultTabIndex: searchResultTabIndex,
});

export interface UploadAssetAndSendMessageRequestAction extends MessageBaseAction {
  file: File;
}
export const uploadAssetAndSendMessageRequestActionCreator = (file: File): UploadAssetAndSendMessageRequestAction => ({
  type: UPLOAD_ASSET_AND_SEND_MESSAGE_REQUEST,
  file: file,
});

export interface RefreshIndicatorAction extends MessageBaseAction {
  previousText: string;
}
export const refreshIndicatorActionCreator = (previousText: string): RefreshIndicatorAction => ({
  type: REFRESH_INDICATOR,
  previousText
});

export type MessageActions =
  MessageBaseAction |
  SetIsFirstFetchAction |
  ResetScrollBottomAnimationDurationAction |
  SetDisplayScrollBottomButtonAction |
  SetMessageModalAction |
  BeforeRetrieveRoomMessagesRequestAction |
  RetrieveRoomMessagesRequestAction |
  RetrieveRoomMessagesRequestSuccessAction |
  RetrieveRoomMessagesRequestFailureAction |
  SendDirectMessagesRequestAction |
  SendMessagesRequestAction |
  SendMessagesRequestSuccessAction |
  SendMessagesRequestFailureAction |
  DeleteLocalMessagesAction |
  PushLocalMessageAction |
  SyncLocalMessagesAction |
  ClearRoomMessagesAction |
  SetDropImageFileAction |
  SetDropFileAction |
  ClearDropFileAction |
  SetSpeechModeAction |
  SetSpeechSynthesisUtteranceAction |
  SetSearchTextAction |
  SetSearchResultTabIndexAction |
  UploadAssetAndSendMessageRequestAction |
  RefreshIndicatorAction
;