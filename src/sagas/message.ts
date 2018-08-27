import { call, ForkEffect, put, select, takeLatest } from 'redux-saga/effects';

import {
    IRetrieveRoomMessagesRequest, IRetrieveRoomMessagesResponse, ISendMessageResponse
} from '../';
import {
    RETRIEVE_ROOM_MESSAGES_REQUEST, RetrieveRoomMessagesRequestAction,
    retrieveRoomMessagesRequestFailureActionCreator, retrieveRoomMessagesRequestSuccessActionCreator,
    SEND_DIRECT_MESSAGES_REQUEST, SEND_MESSAGES_REQUEST, SendDirectMessagesRequestAction,
    sendMessagesRequestFailureActionCreator, sendMessagesRequestSuccessActionCreator,
} from '../actions/message';
import { State } from '../stores';

function* gRetrieveRoomMessagesRequest(action: RetrieveRoomMessagesRequestAction) {
  const state: State  = yield select();
  const client = state.client.client;
  const room = state.room.room;
  const message = state.message;
  if (room === null || client === null) {
    return;
  }
  const { roomMessagesResponse , error}: IRetrieveRoomMessagesResponse = yield call(() => {
    const req = {
      limit: action.limit !== undefined ? action.limit : state.client.client!.settings.messageListPagingCount,
      offset: action.offset !== undefined ? action.offset : message.roomMessagesOffset,
    } as IRetrieveRoomMessagesRequest;
    return state.room.room!.retrieveRoomMessages(req);
  });
  if (error) {
    yield put(retrieveRoomMessagesRequestFailureActionCreator(error!));
  } else {
    window.console.log('00000000000000000000000');
    yield put(retrieveRoomMessagesRequestSuccessActionCreator(roomMessagesResponse!));
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
  yield takeLatest(RETRIEVE_ROOM_MESSAGES_REQUEST, gRetrieveRoomMessagesRequest);
  yield takeLatest(SEND_DIRECT_MESSAGES_REQUEST, gSendDirectMessagesRequest);
  yield takeLatest(SEND_MESSAGES_REQUEST, gSendMessagesRequest);
}