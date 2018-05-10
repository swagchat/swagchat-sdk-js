import { IMessage, messageList2map } from '../';
import { MessageState, SCROLL_BOTTOM_ANIMATION_DURATION } from '../stores/message';
import {
  MessageActions,
  SET_IS_FIRST_FETCH, SetIsFirstFetchAction,
  RESET_SCROLL_BOTTOM_ANIMATION_DURATION,
  SET_DISPLAY_SCROLL_BOTTOM_BUTTON, SetDisplayScrollBottomButtonAction,
  BEFORE_FETCH_MESSAGES_REQUEST, BeforeFetchMessagesRequestAction,
  FETCH_MESSAGES_REQUEST_SUCCESS, FetchMessagesRequestSuccessAction,
  FETCH_MESSAGES_REQUEST_FAILURE, FetchMessagesRequestFailureAction,
  PUSH_LOCAL_MESSAGE, PushLocalMessageAction,
  BEFORE_SEND_MESSAGES_REQUEST,
  SEND_MESSAGES_REQUEST_SUCCESS, SendMessagesRequestSuccessAction,
  SEND_MESSAGES_REQUEST_FAILURE,
  DELETE_LOCAL_MESSAGES,
  UPDATE_MESSAGES, UpdateMessagesAction,
  CLEAR_MESSAGES,
  SET_MESSAGE_TEXT, SetMessageTextAction,
  SET_DROP_IMAGE_FILE, SetDropImageFileAction,
  SET_DROP_FILE, SetDropFileAction,
  CLEAR_DROP_FILE,
  SET_SPEECH_MODE, SetSpeechModeAction,
  SET_SPEECH_SYNTHESIS_UTTERANCE, SetSpeechSynthesisUtteranceAction,
  SET_SEARCH_TEXT, SetSearchTextAction,
  SET_SEARCH_RESULT_TAB_INDEX, SetSearchResultTabIndexAction,
  ADD_INDICATORS, AddIndicatorsAction,
  REFRESH_INDICATORS,
  CLEAR_INDICATORS,
} from '../actions/message';
const R = require('ramda');

const getInitialState = (): MessageState => ({
  isFirstFetch: false,
  sending: false,
  scrollBottomAnimationDuration: 0,
  displayScrollBottomButton: false,

  // message data
  messagesAllCount: 0,
  messagesLimit: 0,
  messagesOffset: 0,
  messagesBeforeSending: [],
  messagesSending: [],
  messageList: [],
  messageMap: {},

  // text
  text: '',

  // drag and drop file
  dropImageFile: null,
  dropFile: null,

  // speech
  isSpeechMode: false,
  speechSynthesisUtterance: null,

  // search
  searchText: '',
  searchResultTabIndex: 0,

  // indicator
  indicators: {},
});

export function message(state: MessageState = getInitialState(), action: MessageActions): MessageState {
  let mergedList: IMessage[];
  switch (action.type) {
    case SET_IS_FIRST_FETCH:
      return Object.assign(
        {},
        state,
        {
          isFirstFetch: (action as SetIsFirstFetchAction).isFirstFetch,
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
    case SET_DISPLAY_SCROLL_BOTTOM_BUTTON:
      return Object.assign(
        {},
        state,
        {
          displayScrollBottomButton: (action as SetDisplayScrollBottomButtonAction).displayScrollBottomButton,
        }
      );
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
      // mergedList = Array.from(new Set([...messagesFetchAction.messages.messages, ...state.messageList]));
      mergedList = R.concat(messagesFetchAction.messages.messages, state.messageList);
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
          problemDetail: (action as FetchMessagesRequestFailureAction).problemDetail,
        }
      );
    case PUSH_LOCAL_MESSAGE:
      const createMessageAction = action as PushLocalMessageAction;
      const message = Object.assign({}, createMessageAction.message);
      message.created = new Date().toISOString();
      // mergedList = Array.from(new Set([...state.messagesBeforeSending, message]));
      mergedList = R.concat(state.messagesBeforeSending, [message]);

      return Object.assign(
        {},
        state,
        {
          messagesBeforeSending: mergedList,
        }
      );
    case BEFORE_SEND_MESSAGES_REQUEST:
      // mergedList = Array.from(new Set([...state.messageList, ...state.messagesBeforeSending]));
      mergedList = R.concat(state.messageList, state.messagesBeforeSending);
      return Object.assign(
        {},
        state,
        {
          sending: true,
          messagesBeforeSending: [],
          messagesSending: state.messagesBeforeSending,
          messageMap: messageList2map(mergedList),
          messageList: mergedList,
        }
      );
    case SEND_MESSAGES_REQUEST_SUCCESS:
      // mergedList = Array.from(new Set([...state.messageList]));
      // mergedList = R.concat(state.messageList);
      mergedList = state.messageList.filter((v: IMessage) => {
        return v.messageId!.indexOf('local-') < 0;
      });
      const sendMessagesRequestSuccessAction = action as SendMessagesRequestSuccessAction;
      // mergedList = Array.from(new Set([...mergedList, ...sendMessagesRequestSuccessAction.messageList]));
      mergedList = R.concat(mergedList, sendMessagesRequestSuccessAction.messageList);
      return Object.assign(
        {},
        state,
        {
          sending: false,
          messagesBeforeSending: [],
          messagesSending: [],
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
          // TODO
        }
      );
    case DELETE_LOCAL_MESSAGES:
      mergedList = state.messageList.slice(0, state.messageList.length - state.messagesSending.length);
      return Object.assign(
        {},
        state,
        {
          messagesBeforeSending: [],
          messagesSending: [],
          messageMap: messageList2map(mergedList),
          messageList: mergedList,
        }
      );
    case UPDATE_MESSAGES:
      const updateMessageAction = action as UpdateMessagesAction;
      if (state.messageMap) {
        // mergedList = Array.from(new Set([...state.messageList, ...updateMessageAction.messages]));
        mergedList = R.concat(state.messageList, updateMessageAction.messages);
      } else {
        mergedList = updateMessageAction.messages;
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
    case SET_MESSAGE_TEXT:
      return Object.assign(
        {},
        state,
        {
          text: (action as SetMessageTextAction).text,
        }
      );
    case SET_DROP_IMAGE_FILE:
      return Object.assign(
        {},
        state,
        {
          dropImageFile: (action as SetDropImageFileAction).dropImageFile,
          dropFile: null,
        }
      );
    case SET_DROP_FILE:
      return Object.assign(
        {},
        state,
        {
          dropImageFile: null,
          dropFile: (action as SetDropFileAction).dropFile,
        }
      );
    case CLEAR_DROP_FILE:
      return Object.assign(
        {},
        state,
        {
          dropImageFile: null,
          dropFile: null,
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
    case SET_SEARCH_TEXT:
      return Object.assign(
        {},
        state,
        {
          searchText: (action as SetSearchTextAction).searchText,
        }
      );
    case SET_SEARCH_RESULT_TAB_INDEX:
      return Object.assign(
        {},
        state,
        {
          searchResultTabIndex: (action as SetSearchResultTabIndexAction).searchResultTabIndex,
        }
      );
    case ADD_INDICATORS:
      const aia = action as AddIndicatorsAction;
      return Object.assign(
        {},
        state,
        {
          indicators: R.assoc(aia.indicator.messageId, aia.indicator, state.indicators),
        }
      );
    case REFRESH_INDICATORS:
      // TODO
      const refreshIndicators = R.filter((v: IMessage) => {
        return ((new Date().getTime() - new Date(v.created!).getTime()) / 1000 - 5 < 0);
      }, state.indicators);
      return Object.assign(
        {},
        state,
        {
          indicators: refreshIndicators,
        }
      );
    case CLEAR_INDICATORS:
      return Object.assign(
        {},
        state,
        {
          indicators: {},
        }
      );
    default:
      return state;
  }
}