import { IMessage, RetrieveRoomMessagesReason } from '..';
import { MessageState } from '../stores/message';
import {
  MessageActions,
  SET_IS_FIRST_FETCH, SetIsFirstFetchAction,
  RESET_SCROLL_BOTTOM_ANIMATION_DURATION,
  SET_DISPLAY_SCROLL_BOTTOM_BUTTON, SetDisplayScrollBottomButtonAction,
  SET_MESSAGE_MODAL, SetMessageModalAction,
  BEFORE_RETRIEVE_ROOM_MESSAGES_REQUEST, BeforeRetrieveRoomMessagesRequestAction,
  RETRIEVE_ROOM_MESSAGES_REQUEST,
  RETRIEVE_ROOM_MESSAGES_REQUEST_SUCCESS, RetrieveRoomMessagesRequestSuccessAction,
  RETRIEVE_ROOM_MESSAGES_REQUEST_FAILURE, RetrieveRoomMessagesRequestFailureAction,
  PUSH_LOCAL_MESSAGE, PushLocalMessageAction,
  BEFORE_SEND_MESSAGES_REQUEST,
  SEND_MESSAGES_REQUEST_SUCCESS, SEND_MESSAGES_REQUEST_FAILURE,
  DELETE_LOCAL_MESSAGES,
  UPDATE_MESSAGES, UpdateMessagesAction,
  CLEAR_ROOM_MESSAGES,
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
import * as R from 'ramda';

const getInitialState = (): MessageState => ({
  isFirstFetch: false,
  sending: false,
  scrollBottomAnimationDuration: 0,
  displayScrollBottomButton: false,
  modal: false,

  // message data
  isLoadingRoomMessages: false,
  roomMessagesAllCount: 0,
  roomMessagesLimit: 0,
  roomMessagesOffset: 0,
  localMessageList: new Array<IMessage>(),
  localMessageMap: {},
  roomMessages: new Array<IMessage>(),
  roomMessagesMap: {},
  retrieveRoomMessagesReason: RetrieveRoomMessagesReason.PAGING,

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

  // error
  errorResponse: null
});

export function message(state: MessageState = getInitialState(), action: MessageActions): MessageState {
  let roomMessagesMap: {[key: string]: IMessage};
  let roomMessages: Array<IMessage>;
  let mergedLocalMap: {[key: string]: IMessage};

  switch (action.type) {
    case SET_IS_FIRST_FETCH:
      return R.merge(
        state,
        {
          isFirstFetch: (action as SetIsFirstFetchAction).isFirstFetch,
        }
      );
    case RESET_SCROLL_BOTTOM_ANIMATION_DURATION:
      return R.merge(
        state,
        {
          scrollBottomAnimationDuration: 0,
        }
      );
    case SET_DISPLAY_SCROLL_BOTTOM_BUTTON:
      return R.merge(
        state,
        {
          displayScrollBottomButton: (action as SetDisplayScrollBottomButtonAction).displayScrollBottomButton,
        }
      );
    case SET_MESSAGE_MODAL:
    return R.merge(
      state,
      {
        modal: (action as SetMessageModalAction).modal,
      }
    );
    case BEFORE_RETRIEVE_ROOM_MESSAGES_REQUEST:
      const bfmra = action as BeforeRetrieveRoomMessagesRequestAction;
      let beforeLimit = bfmra.messagesLimit;
      let beforeOffset = bfmra.messagesAllCount - bfmra.messagesLimit;
      if (beforeOffset < 0) {
        beforeLimit = bfmra.messagesAllCount;
        beforeOffset = 0;
      }
      return R.merge(
        state,
        {
          messagesAllCount: bfmra.messagesAllCount,
          messagesLimit: beforeLimit,
          messagesOffset: beforeOffset,
        }
      );
    case RETRIEVE_ROOM_MESSAGES_REQUEST:
      return R.merge(
        state,
        {
          isLoadingRoomMessages: true
        }
      );
    case RETRIEVE_ROOM_MESSAGES_REQUEST_SUCCESS:
      const retrieveRoomMessagesReason = (action as RetrieveRoomMessagesRequestSuccessAction).retrieveRoomMessagesReason;
      const roomMessagesResponse = (action as RetrieveRoomMessagesRequestSuccessAction).roomMessagesResponse;
      roomMessagesMap = R.clone(state.roomMessagesMap);
      roomMessages = R.clone(state.roomMessages);

      let addRoomMessages = new Array<IMessage>();
      roomMessagesResponse.messages.forEach(roomMessage => {
        if (roomMessagesMap[roomMessage.messageId!]) {
          delete(roomMessagesMap[roomMessage.messageId!]);
        }
        roomMessagesMap[roomMessage.messageId!] = roomMessage;

        const deleteIndex = R.findIndex(R.propEq('messageId', roomMessage.messageId!))(roomMessages);
        if (deleteIndex > -1) {
          roomMessages = R.remove(deleteIndex, 1, roomMessages);
        }
        addRoomMessages.push(roomMessage);
      });

      addRoomMessages = R.reverse(addRoomMessages);
      if (retrieveRoomMessagesReason === RetrieveRoomMessagesReason.PAGING) {
        roomMessages = R.insertAll(0, addRoomMessages, roomMessages);
      } else if (retrieveRoomMessagesReason === RetrieveRoomMessagesReason.RECEIVE) {
        roomMessages = R.insertAll(roomMessages.length + 1, addRoomMessages, roomMessages);
      }

      return R.merge(
        state,
        {
          isLoadingRoomMessages: false,
          roomMessagesMap,
          roomMessages,
          roomMessagesAllCount: roomMessagesResponse.allCount,
          roomMessagesLimit: roomMessagesResponse.limit!,
          roomMessagesOffset: roomMessagesResponse.offset! + roomMessagesResponse.limit!,
          roomMessagesLimitTimestamp: roomMessagesResponse.limitTimestamp!,
          roomMessagesOffsetTimestamp: roomMessagesResponse.offsetTimestamp!,
          retrieveRoomMessagesReason
        }
      );
    case RETRIEVE_ROOM_MESSAGES_REQUEST_FAILURE:
      return R.merge(
        state,
        {
          errorResponse: (action as RetrieveRoomMessagesRequestFailureAction).errorResponse,
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

      return R.merge(
        state,
        {
          localMessageMap: mergedLocalMap,
          localMessageList:  localMessageList,
        }
      );
    case BEFORE_SEND_MESSAGES_REQUEST:
      // mergedMap = R.merge(state.messageMap, state.localMessageMap);

      // return Object.assign(
      //   {},
      //   state,
      //   {
      //     sending: true,
      //     messageMap: mergedMap,
      //   }
      // );
    case SEND_MESSAGES_REQUEST_SUCCESS:
      // mergedMap = R.clone(state.messageMap);
      // const messageList = (action as SendMessagesRequestSuccessAction).messageList;
      // messageList.forEach((m: IMessage) => {
      //   mergedMap[m.messageId!] = m;
      // });

      // return Object.assign(
      //   {},
      //   state,
      //   {
      //     sending: false,
      //     localMessageMap: {},
      //     localMessageList: [],
      //     messageMap: mergedMap,
      //     scrollBottomAnimationDuration: SCROLL_BOTTOM_ANIMATION_DURATION,
      //   }
      // );
    case SEND_MESSAGES_REQUEST_FAILURE:
      // TODO
    case DELETE_LOCAL_MESSAGES:
      return R.merge(
        state,
        {
          localMessageMap: {},
          localMessageList: [],
        }
      );
    case UPDATE_MESSAGES:
      const umAction = (action as UpdateMessagesAction);
      roomMessagesMap = R.clone(state.roomMessagesMap);
      roomMessages = R.clone(state.roomMessages);

      umAction.messages.forEach(roomMessage => {
        if (roomMessagesMap[roomMessage.messageId!]) {
          delete(roomMessagesMap[roomMessage.messageId!]);
        }
        roomMessagesMap[roomMessage.messageId!] = roomMessage;

        const deleteIndex = R.findIndex(R.propEq('messageId', roomMessage.messageId!))(roomMessages);
        if (deleteIndex > -1) {
          roomMessages = R.remove(deleteIndex, 1, roomMessages);
        }
        roomMessages = R.insert(roomMessages.length + 1, roomMessage, roomMessages);
      });

      return R.merge(
        state,
        {
          roomMessagesMap,
          roomMessages,
          updateRoomMessagesReason: RetrieveRoomMessagesReason.RECEIVE
        }
      );
    case CLEAR_ROOM_MESSAGES:
      return R.merge(
        state,
        {
          isLoadingRoomMessages: false,
          roomMessagesAllCount: 0,
          roomMessagesLimit: 0,
          roomMessagesOffset: 0,
          localMessageList: new Array<IMessage>(),
          localMessageMap: {},
          roomMessages: new Array<IMessage>(),
          roomMessagesMap: {},
          onMessageReceived: () => {},
        }
      );
    case SET_MESSAGE_TEXT:
      return R.merge(
        state,
        {
          text: (action as SetMessageTextAction).text,
        }
      );
    case SET_DROP_IMAGE_FILE:
      return R.merge(
        state,
        {
          dropImageFile: (action as SetDropImageFileAction).dropImageFile,
          dropFile: null,
        }
      );
    case SET_DROP_FILE:
      return R.merge(
        state,
        {
          dropImageFile: null,
          dropFile: (action as SetDropFileAction).dropFile,
        }
      );
    case CLEAR_DROP_FILE:
      return R.merge(
        state,
        {
          dropImageFile: null,
          dropFile: null,
        }
      );
    case SET_SPEECH_MODE:
      return R.merge(
        state,
        {
          isSpeechMode: (action as SetSpeechModeAction).isSpeechMode,
        }
      );
    case SET_SPEECH_SYNTHESIS_UTTERANCE:
      return R.merge(
        state,
        {
          speechSynthesisUtterance: (action as SetSpeechSynthesisUtteranceAction).speechSynthesisUtterance,
        }
      );
    case SET_SEARCH_TEXT:
      return R.merge(
        state,
        {
          searchText: (action as SetSearchTextAction).searchText,
        }
      );
    case SET_SEARCH_RESULT_TAB_INDEX:
      return R.merge(
        state,
        {
          searchResultTabIndex: (action as SetSearchResultTabIndexAction).searchResultTabIndex,
        }
      );
    case ADD_INDICATORS:
      const aia = action as AddIndicatorsAction;
      return R.merge(
        state,
        {
          indicators: R.assoc(aia.indicator.messageId!, aia.indicator, state.indicators),
        }
      );
    case REFRESH_INDICATORS:
      const refreshIndicators = R.filter((v: IMessage) => {
        return ((new Date().getTime() - new Date(v.created as string).getTime()) / 1000 - 5 < 0);
      }, state.indicators);
      return R.merge(
        state,
        {
          indicators: refreshIndicators,
        }
      );
    case CLEAR_INDICATORS:
      return R.merge(
        state,
        {
          indicators: {},
        }
      );
    default:
      return state;
  }
}