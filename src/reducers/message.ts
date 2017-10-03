import { IMessage, createMessage, mergeList, messageList2map } from '../';
import { IMessageState, SCROLL_BOTTOM_ANIMATION_DURATION } from '../stores/message';
import {
  IBeforeFetchMessagesRequestAction,
  IFetchMessagesRequestSuccessAction,
  IFetchMessagesRequestFailureAction,
  ICreateMessageAction,
  ISendMessagesRequestSuccessAction,
  ISendMessagesRequestFailureAction,
  IUpdateMessagesAction,
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
} from '../actions/message';
import { store, State } from '../stores';

const getInitialState = (): IMessageState => ({
  messagesAllCount: 0,
  messagesLimit: 0,
  messagesOffset: 0,
  messageMap: {},
  messageList: [],
  createMessages: [],
  scrollBottomAnimationDuration: 0,
});

export function message(state: IMessageState = getInitialState(), action: MessageActions): IMessageState {
  let mergedList: IMessage[];
  switch (action.type) {
    case BEFORE_FETCH_MESSAGES_REQUEST:
      const beforeMessagesFetchAction = <IBeforeFetchMessagesRequestAction>action;
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
      const messagesFetchAction = <IFetchMessagesRequestSuccessAction>action;
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
          problemDetail: (<IFetchMessagesRequestFailureAction>action).problemDetail,
        }
      );
    case CREATE_MESSAGE:
      const createMessageAction = <ICreateMessageAction>action;
      const rootState: State = store.getState();
      if (rootState.room.room === null) {
        return state;
      }
      let roomId: string;
      if (rootState.room.room.roomId === undefined) {
        return state;
      } else {
        roomId = rootState.room.room.roomId;
      }
      const message = createMessage(roomId, rootState.user.user!.userId, createMessageAction.messageType, createMessageAction.payload);
      let createMessages = state.createMessages.slice();
      createMessages.push(message);
      return Object.assign(
        {},
        state,
        {
          createMessages: createMessages,
        }
      );
    case SEND_MESSAGES_REQUEST_SUCCESS:
      const messagesSendAction = <ISendMessagesRequestSuccessAction>action;
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
          problemDetail: (<ISendMessagesRequestFailureAction>action).problemDetail,
        }
      );
    case UPDATE_MESSAGES:
      const updateMessageAction = <IUpdateMessagesAction>action;
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
    default:
      return state;
  }
}
