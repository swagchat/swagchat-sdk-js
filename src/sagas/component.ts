import { takeLatest, call, put, select, ForkEffect } from 'redux-saga/effects';
import { IFetchMessagesResponse, IFetchRoomResponse, beforeFetchMessagesRequestActionCreator } from '../';
import {
  FETCH_MESSAGES_REQUEST,
  fetchMessagesRequestSuccessActionCreator,
  fetchMessagesRequestFailureActionCreator,
} from '../actions/message';
import {
  fetchRoomRequestFailureActionCreator,
} from '../actions/room';
import { State } from '../stores';

function* gFetchMessagesRequest() {
  const state: State  = yield select();

  const roomRes: IFetchRoomResponse = yield call((roomId: string) => {
    return state.client.client!.getRoom(roomId);
  }, state.client.currentRoomId);
  if (roomRes.room) {
    yield put(beforeFetchMessagesRequestActionCreator(roomRes.room.messageCount, 0));
    const {messages, error}: IFetchMessagesResponse = yield call(() => {
      return roomRes.room!.getMessages({
        limit: state.message.messagesLimit,
        offset: state.message.messagesOffset,
      });
    });
    if (error) {
      yield put(fetchMessagesRequestFailureActionCreator(error!));
    } else {
      yield put(fetchMessagesRequestSuccessActionCreator(messages!));
    }
  } else {
    yield put(fetchRoomRequestFailureActionCreator(roomRes.error!));
  }
}

export function* componentSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(FETCH_MESSAGES_REQUEST, gFetchMessagesRequest);
}