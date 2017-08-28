import { takeLatest, call, put, select, ForkEffect } from 'redux-saga/effects';
import { IFetchMessagesResponse, ISendMessagesResponse } from '../';
import * as Scroll from 'react-scroll';

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

function* fetchMessages() {
  const state: State = yield select();
  const {messages, error}: IFetchMessagesResponse = yield call(() => {
      return state.room.room!.getMessages({
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

function* sendMessages() {
  const state: State = yield select();
  const {messageIds, error}: ISendMessagesResponse = yield call(() => {
    return state.user.user!.sendMessages(...state.message.createMessages);
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
  yield takeLatest(MESSAGES_FETCH_REQUEST, fetchMessages);
  yield takeLatest(MESSAGES_SEND_REQUEST, sendMessages);
}
