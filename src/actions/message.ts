import { Action } from 'redux';
import { IMessages, IMessage, IProblemDetail } from '../';

export const BEFORE_FETCH_MESSAGES_REQUEST = 'BEFORE_FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_REQUEST = 'FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_REQUEST_SUCCESS = 'FETCH_MESSAGES_REQUEST_SUCCESS';
export const FETCH_MESSAGES_REQUEST_FAILURE = 'FETCH_MESSAGES_REQUEST_FAILURE';
export const CREATE_MESSAGE = 'CREATE_MESSAGE';
export const SEND_MESSAGES_REQUEST = 'SEND_MESSAGES_REQUEST';
export const SEND_MESSAGES_REQUEST_SUCCESS = 'SEND_MESSAGES_REQUEST_SUCCESS';
export const SEND_MESSAGES_REQUEST_FAILURE = 'SEND_MESSAGES_REQUEST_FAILURE';
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES';
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';
export const RESET_SCROLL_BOTTOM_ANIMATION_DURATION = 'RESET_SCROLL_BOTTOM_ANIMATION_DURATION';
export const SET_SPEECH_MODE = 'SET_SPEECH_MODE';
export const SET_SPEECH_SYNTHESIS_UTTERANCE = 'SET_SPEECH_SYNTHESIS_UTTERANCE';

export type MessageActionTypes =
  typeof BEFORE_FETCH_MESSAGES_REQUEST |
  typeof FETCH_MESSAGES_REQUEST |
  typeof FETCH_MESSAGES_REQUEST_SUCCESS |
  typeof FETCH_MESSAGES_REQUEST_FAILURE |
  typeof CREATE_MESSAGE |
  typeof SEND_MESSAGES_REQUEST |
  typeof SEND_MESSAGES_REQUEST_SUCCESS |
  typeof SEND_MESSAGES_REQUEST_FAILURE |
  typeof UPDATE_MESSAGES |
  typeof CLEAR_MESSAGES |
  typeof RESET_SCROLL_BOTTOM_ANIMATION_DURATION |
  typeof SET_SPEECH_MODE |
  typeof SET_SPEECH_SYNTHESIS_UTTERANCE
;

export interface MessageBaseAction extends Action {
  type: MessageActionTypes;
}

export interface BeforeFetchMessagesRequestAction extends MessageBaseAction {
  messagesAllCount: number;
  messagesLimit: number;
}
export const beforeFetchMessagesRequestActionCreator =
    (messagesAllCount: number, messagesLimit: number): BeforeFetchMessagesRequestAction => ({
  type: BEFORE_FETCH_MESSAGES_REQUEST,
  messagesAllCount: messagesAllCount,
  messagesLimit: messagesLimit,
});

export interface FetchMessagesRequestAction extends MessageBaseAction {
}
export const fetchMessagesRequestActionCreator = (): FetchMessagesRequestAction => ({
  type: FETCH_MESSAGES_REQUEST,
});

export interface FetchMessagesRequestSuccessAction extends MessageBaseAction {
  messages: IMessages;
}
export const fetchMessagesRequestSuccessActionCreator = (messages: IMessages): FetchMessagesRequestSuccessAction => ({
  type: FETCH_MESSAGES_REQUEST_SUCCESS,
  messages: messages,
});

export interface FetchMessagesRequestFailureAction extends MessageBaseAction {
  problemDetail: IProblemDetail;
}
export const fetchMessagesRequestFailureActionCreator =
    (problemDetail: IProblemDetail): FetchMessagesRequestFailureAction => ({
  type: FETCH_MESSAGES_REQUEST_FAILURE,
  problemDetail: problemDetail,
});

export interface CreateMessageAction extends MessageBaseAction {
  roomId: string;
  userId: string;
  messageType: string;
  payload: Object;
}
export const createMessageActionCreator = (
    roomId: string, userId: string, messageType: string, payload: Object): CreateMessageAction => ({
  type: CREATE_MESSAGE,
  roomId: roomId,
  userId: userId,
  messageType: messageType,
  payload: payload,
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
  problemDetail: IProblemDetail;
}
export const sendMessagesRequestFailureActionCreator =
    (problemDetail: IProblemDetail): SendMessagesRequestFailureAction => ({
  type: SEND_MESSAGES_REQUEST_FAILURE,
  problemDetail: problemDetail,
});

export interface UpdateMessagesAction extends MessageBaseAction {
  messageList: IMessage[];
}
export const updateMessagesActionCreator = (messageList: IMessage[]): UpdateMessagesAction => ({
  type: UPDATE_MESSAGES,
  messageList: messageList,
});

export interface ClearMessagesAction extends MessageBaseAction {
}
export const clearMessagesActionCreator = (): ClearMessagesAction => ({
  type: CLEAR_MESSAGES
});

export interface ResetScrollBottomAnimationDurationAction extends MessageBaseAction {
}
export const resetScrollBottomAnimationDurationActionCreator = (): ResetScrollBottomAnimationDurationAction => ({
  type: RESET_SCROLL_BOTTOM_ANIMATION_DURATION
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

export type MessageActions =
  BeforeFetchMessagesRequestAction |
  FetchMessagesRequestAction |
  FetchMessagesRequestSuccessAction |
  FetchMessagesRequestFailureAction |
  SendMessagesRequestAction |
  SendMessagesRequestSuccessAction |
  SendMessagesRequestFailureAction |
  CreateMessageAction |
  ClearMessagesAction |
  SetSpeechModeAction |
  SetSpeechSynthesisUtteranceAction
;