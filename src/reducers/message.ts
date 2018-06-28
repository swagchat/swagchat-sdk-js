import { IMessage, messageList2map } from '../';
import { MessageState, SCROLL_BOTTOM_ANIMATION_DURATION } from '../stores/message';
import {
  MessageActions,
  SET_IS_FIRST_FETCH, SetIsFirstFetchAction,
  RESET_SCROLL_BOTTOM_ANIMATION_DURATION,
  SET_DISPLAY_SCROLL_BOTTOM_BUTTON, SetDisplayScrollBottomButtonAction,
  SET_MESSAGE_MODAL, SetMessageModalAction,
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
  modal: false,

  // message data
  messagesAllCount: 0,
  messagesLimit: 0,
  messagesOffset: 0,
  localMessageList: [],
  localMessageMap: {},
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
  let mergedMap: {[key: string]: IMessage};
  let mergedLocalMap: {[key: string]: IMessage};

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
    case SET_MESSAGE_MODAL:
      return Object.assign(
        {},
        state,
        {
          modal: (action as SetMessageModalAction).modal,
        }
      );
    case BEFORE_FETCH_MESSAGES_REQUEST:
      const bfmra = action as BeforeFetchMessagesRequestAction;
      let beforeLimit = bfmra.messagesLimit;
      let beforeOffset = bfmra.messagesAllCount - bfmra.messagesLimit;
      if (beforeOffset < 0) {
        beforeLimit = bfmra.messagesAllCount;
        beforeOffset = 0;
      }
      return Object.assign(
        {},
        state,
        {
          messagesAllCount: bfmra.messagesAllCount,
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
      const mfa = action as FetchMessagesRequestSuccessAction;
      mergedMap = R.merge(messageList2map(mfa.messages.messages), state.messageMap);

      return Object.assign(
        {},
        state,
        {
          messageMap: mergedMap,
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
      // map
      const am = (action as PushLocalMessageAction).message;
      mergedLocalMap = R.clone(state.localMessageMap);
      mergedLocalMap[am.messageId!] = am;

      // list
      let localMessageList: IMessage[] = [];
      if (state.localMessageList.length === 0) {
        localMessageList = [am];
      } else {
        state.localMessageList.forEach((sm: IMessage) => {
          if (sm.messageId === am.messageId) {
            localMessageList = R.concat(localMessageList, [am]);
          } else {
            localMessageList = R.concat(localMessageList, [sm]);
          }
        });
      }

      return Object.assign(
        {},
        state,
        {
          localMessageMap: mergedLocalMap,
          localMessageList:  localMessageList,
        }
      );
    case BEFORE_SEND_MESSAGES_REQUEST:
      mergedMap = R.merge(state.messageMap, state.localMessageMap);

      return Object.assign(
        {},
        state,
        {
          sending: true,
          messageMap: mergedMap,
        }
      );
    case SEND_MESSAGES_REQUEST_SUCCESS:
      mergedMap = R.clone(state.messageMap);
      const messageList = (action as SendMessagesRequestSuccessAction).messageList;
      messageList.forEach((m: IMessage) => {
        mergedMap[m.messageId!] = m;
      });

      return Object.assign(
        {},
        state,
        {
          sending: false,
          localMessageMap: {},
          localMessageList: [],
          messageMap: mergedMap,
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
      return Object.assign(
        {},
        state,
        {
          localMessageMap: {},
          localMessageList: [],
        }
      );
    case UPDATE_MESSAGES:
      const ams = (action as UpdateMessagesAction).messages;
      mergedMap = R.merge(state.messageMap, messageList2map(ams));

      return Object.assign(
        {},
        state,
        {
          messageMap: mergedMap,
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
      const refreshIndicators = R.filter((v: IMessage) => {
        return ((new Date().getTime() - new Date(v.created as string).getTime()) / 1000 - 5 < 0);
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