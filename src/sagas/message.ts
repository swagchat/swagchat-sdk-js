import { takeLatest, call, put, select, ForkEffect } from 'redux-saga/effects';
import {
  IFetchMessagesResponse, ISendMessagesResponse,
} from '../';
import {
  FETCH_MESSAGES_REQUEST,
  fetchMessagesRequestSuccessActionCreator,
  fetchMessagesRequestFailureActionCreator,
  SEND_MESSAGES_REQUEST,
  SEND_DIRECT_MESSAGES_REQUEST, SendDirectMessagesRequestAction,
  sendMessagesRequestFailureActionCreator,
  sendMessagesRequestSuccessActionCreator,
} from '../actions/message';
import { State } from '../stores';

function* gFetchMessagesRequest() {
  const state: State  = yield select();
  if (state.room.room === null) {
    return;
  }
  const {messages, error}: IFetchMessagesResponse = yield call(() => {
    return state.room.room!.getMessages({
      limit: state.message.messagesLimit,
      offset: state.message.messagesOffset,
    });
  });
  if (error) {
    yield put(fetchMessagesRequestFailureActionCreator(error!));
  } else {
    yield put(fetchMessagesRequestSuccessActionCreator(messages!));
  }
}

function* gSendMessagesRequest() {
  let state: State = yield select();
  const {messageIds, error}: ISendMessagesResponse = yield call(() => {
    return state.client.client!.sendMessages(...state.message.localMessageList);
  });
  if (error) {
    yield put(sendMessagesRequestFailureActionCreator(error!));
  } else if (messageIds) {
    yield put(sendMessagesRequestSuccessActionCreator([]));
  }
}

function* gSendDirectMessagesRequest(action: SendDirectMessagesRequestAction) {
  let state: State = yield select();
  const {messageIds, error}: ISendMessagesResponse = yield call((messages) => {
    return state.client.client!.sendMessages(...messages);
  }, action.messages);
  if (error) {
    yield put(sendMessagesRequestFailureActionCreator(error!));
  } else if (messageIds) {
    yield put(sendMessagesRequestSuccessActionCreator(action.messages));
  }
}

export function* messageSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(FETCH_MESSAGES_REQUEST, gFetchMessagesRequest);
  yield takeLatest(SEND_DIRECT_MESSAGES_REQUEST, gSendDirectMessagesRequest);
  yield takeLatest(SEND_MESSAGES_REQUEST, gSendMessagesRequest);
}