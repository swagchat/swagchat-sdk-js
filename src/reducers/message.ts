import { IMessage, mergeList, messageList2map } from '../';
import { MessageState, SCROLL_BOTTOM_ANIMATION_DURATION } from '../stores/message';
import {
  BeforeFetchMessagesRequestAction,
  FetchMessagesRequestSuccessAction,
  FetchMessagesRequestFailureAction,
  SendMessagesRequestSuccessAction,
  SendMessagesRequestFailureAction,
  UpdateMessagesAction,
  BEFORE_FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_REQUEST_SUCCESS,
  FETCH_MESSAGES_REQUEST_FAILURE,
  CREATE_MESSAGE,
  SEND_MESSAGES_REQUEST_SUCCESS,
  SEND_MESSAGES_REQUEST_FAILURE,
  UPDATE_MESSAGES,
  CLEAR_MESSAGES,
  RESET_SCROLL_BOTTOM_ANIMATION_DURATION,
  MessageActions,
  SET_SPEECH_MODE,
  SetSpeechModeAction,
  SET_SPEECH_SYNTHESIS_UTTERANCE,
  SetSpeechSynthesisUtteranceAction,
  CreateMessageAction,
} from '../actions/message';
import { createMessage } from '../util';

const getInitialState = (): MessageState => ({
  messagesAllCount: 0,
  messagesLimit: 0,
  messagesOffset: 0,
  messageMap: {},
  messageList: [],
  createMessages: [],
  scrollBottomAnimationDuration: 0,
  isSpeechMode: false,
  speechSynthesisUtterance: null,
});

export function message(state: MessageState = getInitialState(), action: MessageActions): MessageState {
  let mergedList: IMessage[];
  switch (action.type) {
    case BEFORE_FETCH_MESSAGES_REQUEST:
      const beforeMessagesFetchAction = action as BeforeFetchMessagesRequestAction;
      let beforeLimit = beforeMessagesFetchAction.messagesLimit;
      let beforeOffset = beforeMessagesFetchAction.messagesAllCount - beforeMessagesFetchAction.messagesLimit;
      if (beforeOffset < 0) {
        beforeLimit = beforeMessagesFetchAction.messagesAllCount;
        beforeOffset = 0;
      }
      return Object.assign(
        {},
        state,
        {
          messagesAllCount: beforeMessagesFetchAction.messagesAllCount,
          messagesLimit: beforeLimit,
          messagesOffset: beforeOffset,
        }
      );
    case FETCH_MESSAGES_REQUEST_SUCCESS:
      if (state.messagesAllCount === 0) {
        return state;
      }
      let newLimit = state.messagesLimit;
      let newOffset = state.messagesOffset - state.messagesLimit;
      if (newOffset < 0) {
        newLimit = state.messagesOffset;
        newOffset = 0;
      }
      const messagesFetchAction = action as FetchMessagesRequestSuccessAction;
      mergedList = mergeList(state.messageList, messagesFetchAction.messages.messages);
      return Object.assign(
        {},
        state,
        {
          messageMap: messageList2map(mergedList),
          messageList: mergedList,
          messagesLimit: newLimit,
          messagesOffset: newOffset,
        }
      );
    case FETCH_MESSAGES_REQUEST_FAILURE:
      return Object.assign(
        {},
        state,
        {
          user: null,
          problemDetail: (action as FetchMessagesRequestFailureAction).problemDetail,
        }
      );
    case CREATE_MESSAGE:
      const createMessageAction = action as CreateMessageAction;
      const msg = createMessage(
        createMessageAction.roomId, createMessageAction.userId, createMessageAction.messageType, createMessageAction.payload);
      let createMessages = state.createMessages.slice();
      createMessages.push(msg);
      return Object.assign(
        {},
        state,
        {
          createMessages: createMessages,
        }
      );
    case SEND_MESSAGES_REQUEST_SUCCESS:
      const messagesSendAction = action as SendMessagesRequestSuccessAction;
      if (state.messageMap) {
        mergedList = mergeList(state.messageList, messagesSendAction.messageList);
      } else {
        mergedList = messagesSendAction.messageList;
      }
      return Object.assign(
        {},
        state,
        {
          createMessages: [],
          messageMap: messageList2map(mergedList),
          messageList: mergedList,
          scrollBottomAnimationDuration: SCROLL_BOTTOM_ANIMATION_DURATION,
        }
      );
    case SEND_MESSAGES_REQUEST_FAILURE:
      return Object.assign(
        {},
        state,
        {
          user: null,
          problemDetail: (action as SendMessagesRequestFailureAction).problemDetail,
        }
      );
    case UPDATE_MESSAGES:
      const updateMessageAction = action as UpdateMessagesAction;
      if (state.messageMap) {
        mergedList = mergeList(state.messageList, updateMessageAction.messageList);
      } else {
        mergedList = updateMessageAction.messageList;
      }
      return Object.assign(
        {},
        state,
        {
          messageMap: messageList2map(mergedList),
          messageList: mergedList,
          scrollBottomAnimationDuration: SCROLL_BOTTOM_ANIMATION_DURATION,
        }
      );
    case CLEAR_MESSAGES:
      return Object.assign(
        {},
        state,
        {
          messageMap: {},
          messageList: [],
          messagesAllCount: 0,
          messagesLimit: 0,
          messagesOffset: 0,
        }
      );
    case RESET_SCROLL_BOTTOM_ANIMATION_DURATION:
      return Object.assign(
        {},
        state,
        {
          scrollBottomAnimationDuration: 0,
        }
      );
    case SET_SPEECH_MODE:
      return Object.assign(
        {},
        state,
        {
          isSpeechMode: (action as SetSpeechModeAction).isSpeechMode,
        }
      );
    case SET_SPEECH_SYNTHESIS_UTTERANCE:
      return Object.assign(
        {},
        state,
        {
          speechSynthesisUtterance: (action as SetSpeechSynthesisUtteranceAction).speechSynthesisUtterance,
        }
      );
    default:
      return state;
  }
}