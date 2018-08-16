import { takeLatest, call, put, select, ForkEffect } from 'redux-saga/effects';
import {
  IFetchMessagesResponse, ISendMessageResponse,
} from '..';
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
    return state.room.room!.retrieveMessages({
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
  const room = state.room.room!;
  const { error }: ISendMessageResponse = yield call(() => {
    return room.sendMessage(state.message.localMessageList[0]);
  });
  if (error) {
    yield put(sendMessagesRequestFailureActionCreator(error!));
  } else {
    yield put(sendMessagesRequestSuccessActionCreator([]));
  }
}

function* gSendDirectMessagesRequest(action: SendDirectMessagesRequestAction) {
  let state: State = yield select();
  let room = state.room.room!;
  const { error }: ISendMessageResponse = yield call((messages) => {
    return room.sendMessage(messages[0]);
  }, action.messages);
  if (error) {
    yield put(sendMessagesRequestFailureActionCreator(error!));
  } else {
    yield put(sendMessagesRequestSuccessActionCreator(action.messages));
  }
}

export function* messageSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(FETCH_MESSAGES_REQUEST, gFetchMessagesRequest);
  yield takeLatest(SEND_DIRECT_MESSAGES_REQUEST, gSendDirectMessagesRequest);
  yield takeLatest(SEND_MESSAGES_REQUEST, gSendMessagesRequest);
}