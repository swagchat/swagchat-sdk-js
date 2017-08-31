import { IMessage, createMessage } from '../';
import { IMessageState } from '../stores/message';
import {
  IBeforeMessagesFetchAction,
  IMessagesFetchRequestSuccessAction,
  IMessagesFetchRequestFailureAction,
  ICreateMessageAction,
  IMessagesSendRequestSuccessAction,
  IMessagesSendRequestFailureAction,
  IUpdateMessagesAction,
  BEFORE_MESSAGES_FETCH,
  MESSAGES_FETCH_REQUEST_SUCCESS,
  MESSAGES_FETCH_REQUEST_FAILURE,
  CREATE_MESSAGE,
  MESSAGES_SEND_REQUEST_SUCCESS,
  MESSAGES_SEND_REQUEST_FAILURE,
  UPDATE_MESSAGES,
  CLEAR_MESSAGES,
  MessageActions,
} from '../actions/message';
import { store, State } from '../stores';

const getInitialState = (): IMessageState => ({
  messagesAllCount: 0,
  messagesLimit: 0,
  messagesOffset: 0,
  messages: {},
  problemDetail: null,
  createMessages: [],
});

export function message(state: IMessageState = getInitialState(), action: MessageActions): IMessageState {
  switch (action.type) {
    case BEFORE_MESSAGES_FETCH:
      const beforeMessagesFetchAction = <IBeforeMessagesFetchAction>action;
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
    case MESSAGES_FETCH_REQUEST_SUCCESS:
      if (state.messagesAllCount === 0) {
        return state;
      }
      let newLimit = state.messagesLimit;
      let newOffset = state.messagesOffset - state.messagesLimit;
      if (newOffset < 0) {
        newLimit = state.messagesOffset;
        newOffset = 0;
      }
      const messagesFetchAction = <IMessagesFetchRequestSuccessAction>action;
      let tmpMessages: {[key: string]: IMessage} = {};
      messagesFetchAction.messages.messages.map((message: IMessage) => {
        tmpMessages[message.messageId!] = message;
      });
      const newMessages = Object.assign(tmpMessages, state.messages);
      return Object.assign(
        {},
        state,
        {
          messages: newMessages,
          messagesLimit: newLimit,
          messagesOffset: newOffset,
        }
      );
    case MESSAGES_FETCH_REQUEST_FAILURE:
      return Object.assign(
        {},
        state,
        {
          user: null,
          problemDetail: (<IMessagesFetchRequestFailureAction>action).problemDetail,
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
    case MESSAGES_SEND_REQUEST_SUCCESS:
      const messagesSendAction = <IMessagesSendRequestSuccessAction>action;
      let tmpAddMessages: {[key: string]: IMessage} = {};
      messagesSendAction.messages.map((message: IMessage) => {
        tmpAddMessages[message.messageId!] = message;
      });
      let addMessages;
      if (state.messages) {
        addMessages = Object.assign(state.messages, tmpAddMessages);
      } else {
        addMessages = tmpAddMessages;
      }

      return Object.assign(
        {},
        state,
        {
          createMessages: [],
          messages: addMessages,
        }
      );
    case MESSAGES_SEND_REQUEST_FAILURE:
      return Object.assign(
        {},
        state,
        {
          user: null,
          problemDetail: (<IMessagesSendRequestFailureAction>action).problemDetail,
        }
      );
    case UPDATE_MESSAGES:
      const updateMessageAction = <IUpdateMessagesAction>action;
      let tmpUpdateMessages: {[key: string]: IMessage} = {};
      updateMessageAction.messages.forEach(message => {
        tmpUpdateMessages[message.messageId!] = message;
      });
      let updateMessages: {[key: string]: IMessage} = {};
      if (state.messages) {
        updateMessages = Object.assign(state.messages, tmpUpdateMessages);
      } else {
        updateMessages = tmpUpdateMessages;
      }

      return Object.assign(
        {},
        state,
        {
          messages: updateMessages,
        }
      );
    case CLEAR_MESSAGES:
      return Object.assign(
        {},
        state,
        {
          messages: null,
          messagesAllCount: 0,
          messagesLimit: 0,
          messagesOffset: 0,
        }
      );
    default:
      return state;
  }
}


    // case MESSAGES_FETCH:
    //   if (state.messagesAllCount === 0) {
    //     return state;
    //   }
    //   let newLimit = state.messagesLimit;
    //   let newOffset = state.messagesOffset - state.messagesLimit;
    //   if (newOffset < 0) {
    //     newLimit = state.messagesOffset;
    //     newOffset = 0;
    //   }
    //   const messagesFetchAction = <IMessagesFetchAction>action;
    //   let tmpMessages: {[key: string]: IMessage} = {};
    //   messagesFetchAction.messages.messages.map((message: IMessage) => {
    //     tmpMessages[message.messageId!] = message;
    //   });
    //   const newMessages = Object.assign(tmpMessages, state.messages);
    //   return Object.assign(
    //     {},
    //     state,
    //     {
    //       messagesAllCount: messagesFetchAction.messages.allCount,
    //       messages: newMessages,
    //       messagesLimit: newLimit,
    //       messagesOffset: newOffset,
    //     }
    //   );