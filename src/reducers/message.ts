import * as R from 'ramda';

import { IMessage, MessageType, RetrieveRoomMessagesReason, indicatorRefleshTime } from '../';
import {
    BEFORE_RETRIEVE_ROOM_MESSAGES_REQUEST, BEFORE_SEND_MESSAGES_REQUEST,
    BeforeRetrieveRoomMessagesRequestAction, CLEAR_DROP_FILE, CLEAR_ROOM_MESSAGES,
    DELETE_LOCAL_MESSAGES, MessageActions, PUSH_LOCAL_MESSAGE, PushLocalMessageAction,
    REFRESH_INDICATOR, RefreshIndicatorAction, RESET_SCROLL_BOTTOM_ANIMATION_DURATION,
    RETRIEVE_ROOM_MESSAGES_REQUEST, RETRIEVE_ROOM_MESSAGES_REQUEST_FAILURE,
    RETRIEVE_ROOM_MESSAGES_REQUEST_SUCCESS, RetrieveRoomMessagesRequestFailureAction,
    RetrieveRoomMessagesRequestSuccessAction, SEND_MESSAGES_REQUEST_FAILURE,
    SEND_MESSAGES_REQUEST_SUCCESS, SET_DISPLAY_SCROLL_BOTTOM_BUTTON, SET_DROP_FILE,
    SET_DROP_IMAGE_FILE, SET_IS_FIRST_FETCH, SET_MESSAGE_MODAL, SET_MESSAGE_TEXT,
    SET_SEARCH_RESULT_TAB_INDEX, SET_SEARCH_TEXT, SET_SPEECH_MODE, SET_SPEECH_SYNTHESIS_UTTERANCE,
    SetDisplayScrollBottomButtonAction, SetDropFileAction, SetDropImageFileAction,
    SetIsFirstFetchAction, SetMessageModalAction, SetMessageTextAction,
    SetSearchResultTabIndexAction, SetSearchTextAction, SetSpeechModeAction,
    SetSpeechSynthesisUtteranceAction, UPDATE_MESSAGES, UpdateMessagesAction
} from '../actions/message';
import { MessageState } from '../stores/message';

const getInitialState = (): MessageState => ({
  scrollBottomAnimationDuration: 0,
  displayScrollBottomButton: false,
  modal: false,

  // retrieving message
  isFirstFetch: false,
  isLoadingRoomMessages: false,
  roomMessagesAllCount: 0,
  roomMessagesLimit: 0,
  roomMessagesOffset: 0,
  roomMessages: new Array<IMessage>(),
  roomMessagesMap: {},
  retrieveRoomMessagesReason: RetrieveRoomMessagesReason.PAGING,

  // sending message
  localRoomMessages: new Array<IMessage>(),

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

  // error
  errorResponse: null
});

export function message(state: MessageState = getInitialState(), action: MessageActions): MessageState {
  let roomMessagesMap: {[key: string]: IMessage};
  let roomMessages: Array<IMessage>;
  let addRoomMessages: Array<IMessage>;
  let localRoomMessages: Array<IMessage>;
  let message: IMessage;

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

      addRoomMessages = new Array<IMessage>();
      roomMessagesResponse.messages.forEach(roomMessage => {
        const messageId = roomMessage.messageId!;

        // If the same messageId already exists in the map, delete it from both the map and the list
        if (roomMessagesMap[messageId]) {
          delete(roomMessagesMap[messageId]);
          const deleteIndex = R.findIndex(R.propEq('messageId', messageId))(roomMessages);
          if (deleteIndex > -1) {
            roomMessages = R.remove(deleteIndex, 1, roomMessages);
          }
        }

        roomMessagesMap[messageId] = roomMessage;
        addRoomMessages.push(roomMessage);
      });

      addRoomMessages = R.reverse(addRoomMessages);
      if (retrieveRoomMessagesReason === RetrieveRoomMessagesReason.PAGING) {
        roomMessages = R.insertAll(0, addRoomMessages, roomMessages);
      } else if (retrieveRoomMessagesReason === RetrieveRoomMessagesReason.RECEIVE) {
        if (roomMessages[roomMessages.length - 1].messageId!.startsWith(MessageType.INDICATOR_START)) {
          roomMessages = R.insertAll(roomMessages.length - 1, addRoomMessages, roomMessages);
        } else {
          roomMessages = R.insertAll(roomMessages.length, addRoomMessages, roomMessages);
        }
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
      message = (action as PushLocalMessageAction).message;
      localRoomMessages = R.clone(state.localRoomMessages);
      localRoomMessages.push(message);

      return R.merge(
        state,
        {
          localRoomMessages,
        }
      );
    case BEFORE_SEND_MESSAGES_REQUEST:
      roomMessagesMap = R.clone(state.roomMessagesMap);
      roomMessages = R.clone(state.roomMessages);

      addRoomMessages = new Array<IMessage>();
      state.localRoomMessages.forEach(roomMessage => {
        const messageId = roomMessage.messageId!;

        // If the same messageId already exists in the map, delete it from both the map and the list
        if (roomMessagesMap[messageId]) {
          delete(roomMessagesMap[messageId]);
          const deleteIndex = R.findIndex(R.propEq('messageId', messageId))(roomMessages);
          if (deleteIndex > -1) {
            roomMessages = R.remove(deleteIndex, 1, roomMessages);
          }
        }

        roomMessagesMap[messageId] = roomMessage;
        addRoomMessages.push(roomMessage);
      });

      addRoomMessages = R.reverse(addRoomMessages);
      roomMessages = R.insertAll(0, addRoomMessages, roomMessages);

      return R.merge(
        state,
        {
          roomMessagesMap,
          roomMessages,
          roomMessagesAllCount: state.roomMessagesAllCount++,
        }
      );
    case SEND_MESSAGES_REQUEST_SUCCESS:
      return R.merge(
        state,
        {
          localRoomMessages: [],
          // scrollBottomAnimationDuration: SCROLL_BOTTOM_ANIMATION_DURATION,
        }
      );
    case SEND_MESSAGES_REQUEST_FAILURE:
      // TODO
    case DELETE_LOCAL_MESSAGES:
      return R.merge(
        state,
        {
          localRoomMessages: [],
        }
      );
    case UPDATE_MESSAGES:
      const umAction = (action as UpdateMessagesAction);
      roomMessagesMap = R.clone(state.roomMessagesMap);
      roomMessages = R.clone(state.roomMessages);

      umAction.messages.forEach(roomMessage => {
        let messageId = roomMessage.messageId!;
        if (roomMessage.type === MessageType.INDICATOR_END) {
          // When the indicator is displayed, convert the message id to delete it
          // [indicator-end-USER_ID] -> [indicator-start-USER_ID]
          messageId = messageId.replace(/end/i, 'start');
        }

        // If the same messageId already exists in the map, delete it from both the map and the list
        if (roomMessagesMap[messageId]) {
          delete(roomMessagesMap[messageId]);
          const deleteIndex = R.findIndex(R.propEq('messageId', messageId))(roomMessages);
          if (deleteIndex > -1) {
            roomMessages = R.remove(deleteIndex, 1, roomMessages);
          }
        }

        // If it is not an end message of the indicator, it is added to the map and the list
        if (roomMessage.type !== MessageType.INDICATOR_END) {
          roomMessagesMap[messageId] = roomMessage;
          roomMessages = R.insert(roomMessages.length + 1, roomMessage, roomMessages);
        }
      });

      return R.merge(
        state,
        {
          roomMessagesMap,
          roomMessages,
          retrieveRoomMessagesReason: RetrieveRoomMessagesReason.RECEIVE,
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
          localRoomMessages: new Array<IMessage>(),
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
    case REFRESH_INDICATOR:
      const lastItem = state.roomMessages[state.roomMessages.length - 1];

      if (!lastItem.messageId!.startsWith(MessageType.INDICATOR_START)) {
        return state;
      }

      const previousText = (action as RefreshIndicatorAction).previousText;
      if (previousText !== state.text) {
        return state;
      }

      roomMessagesMap = R.clone(state.roomMessagesMap);
      roomMessages = R.clone(state.roomMessages);

      const currentTime = new Date().getTime();
      const lastItemTime = new Date(lastItem.created as string).getTime();
      if (currentTime - lastItemTime - indicatorRefleshTime > 0) {
        delete(roomMessagesMap[lastItem.messageId!]);
        roomMessages = R.remove(state.roomMessages.length - 1, 1, roomMessages);
      }

      return R.merge(
        state,
        {
          roomMessagesMap,
          roomMessages
        }
      );
    default:
      return state;
  }
}