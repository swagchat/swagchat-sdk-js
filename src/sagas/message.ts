import { takeLatest, call, put, select, ForkEffect } from 'redux-saga/effects';
import { IFetchMessagesResponse, ISendMessagesResponse, sendMessages } from '../';
import * as Scroll from 'react-scroll';
import { getMessages } from '../room';
import {
  MESSAGES_FETCH_REQUEST,
  MESSAGES_SEND_REQUEST,
  messagesFetchRequestSuccessActionCreator,
  messagesFetchRequestFailureActionCreator,
  messageSendRequestSuccessActionCreator,
  messagesSendRequestFailureActionCreator,
} from '../actions/message';
import { State } from '../stores';
import { date2ISO3339String } from '../utils';

function* gGetMessages() {
  const state: State  = yield select();
  if (state.room.room === null) {
    return;
  }
  let roomId: string;
  if (state.room.room.roomId === undefined) {
    return;
  } else {
    roomId = state.room.room.roomId;
  }
  const {messages, error}: IFetchMessagesResponse = yield call(() => {
      return getMessages(roomId, {
        limit: state.message.messagesLimit,
        offset: state.message.messagesOffset,
      });
  });
  if (error) {
    yield put(messagesFetchRequestFailureActionCreator(error!));
  } else {
    yield put(messagesFetchRequestSuccessActionCreator(messages!));
  }
}

function* gSendMessages() {
  const state: State = yield select();
  const {messageIds, error}: ISendMessagesResponse = yield call(() => {
    return sendMessages(...state.message.createMessages);
  });
  if (error) {
    yield put(messagesSendRequestFailureActionCreator(error!));
  } else if (messageIds) {
    let messages = state.message.createMessages.slice();
    for (let i = 0; i < messages.length; i++) {
      messages[i].messageId = messageIds[i];
      messages[i].created = date2ISO3339String(new Date());
    }
    yield put(messageSendRequestSuccessActionCreator(messages));
    Scroll.animateScroll.scrollToBottom({duration: 300});
  }
}

export function* messageSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(MESSAGES_FETCH_REQUEST, gGetMessages);
  yield takeLatest(MESSAGES_SEND_REQUEST, gSendMessages);
}
