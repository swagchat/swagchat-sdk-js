import { takeLatest, call, put, select, ForkEffect } from 'redux-saga/effects';
import {
  // IFetchMessagesResponse,
  ISendMessagesResponse,
} from '../';
import {
  // FETCH_MESSAGES_REQUEST,
  SEND_MESSAGES_REQUEST,
  // fetchMessagesRequestSuccessActionCreator,
  // fetchMessagesRequestFailureActionCreator,
  sendMessagesRequestSuccessActionCreator,
  sendMessagesRequestFailureActionCreator,
} from '../actions/message';
import { State } from '../stores';
import { date2ISO3339String } from '../util';

// function* gFetchMessagesRequest() {
//   const state: State  = yield select();
//   if (state.room.room === null) {
//     return;
//   }
//   let roomId: string;
//   if (state.room.room.roomId === undefined) {
//     return;
//   } else {
//     roomId = state.room.room.roomId;
//   }
//   const {messages, error}: IFetchMessagesResponse = yield call(() => {
//     return state.client.currentRoom!.getMessages({
//       limit: state.message.messagesLimit,
//       offset: state.message.messagesOffset,
//     });
//   });
//   if (error) {
//     yield put(fetchMessagesRequestFailureActionCreator(error!));
//   } else {
//     yield put(fetchMessagesRequestSuccessActionCreator(messages!));
//   }
// }

function* gSendMessagesRequest() {
  const state: State = yield select();
  const {messageIds, error}: ISendMessagesResponse = yield call(() => {
    return state.client.client!.user.sendMessages(...state.message.createMessages);
  });
  if (error) {
    yield put(sendMessagesRequestFailureActionCreator(error!));
  } else if (messageIds) {
    let messages = state.message.createMessages.slice();
    for (let i = 0; i < messages.length; i++) {
      messages[i].messageId = messageIds[i];
      messages[i].created = date2ISO3339String(new Date());
    }
    yield put(sendMessagesRequestSuccessActionCreator(messages));
  }
}

export function* messageSaga(): IterableIterator<ForkEffect> {
  // yield takeLatest(FETCH_MESSAGES_REQUEST, gFetchMessagesRequest);
  yield takeLatest(SEND_MESSAGES_REQUEST, gSendMessagesRequest);
}