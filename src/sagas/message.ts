import { call, ForkEffect, put, select, takeLatest } from 'redux-saga/effects';

import {
    IRetrieveRoomMessagesRequest, IRetrieveRoomMessagesResponse, ISendMessageResponse, RetrieveRoomMessagesReason
} from '../';
import {
    RETRIEVE_ROOM_MESSAGES_REQUEST,
    retrieveRoomMessagesRequestFailureActionCreator, retrieveRoomMessagesRequestSuccessActionCreator,
    SEND_DIRECT_MESSAGES_REQUEST, SEND_MESSAGES_REQUEST, SendDirectMessagesRequestAction,
    sendMessagesRequestFailureActionCreator, sendMessagesRequestSuccessActionCreator, RetrieveRoomMessagesRequestAction
} from '../actions/message';
import { State } from '../stores';
import * as R from 'ramda';

function* gRetrieveRoomMessagesRequest(action: RetrieveRoomMessagesRequestAction) {
  const state: State  = yield select();
  const client = state.client.client;
  const room = state.room.room;
  const roomMessages = state.message.roomMessages;
  if (room === null || client === null) {
    return;
  }

  let res = {} as IRetrieveRoomMessagesResponse;

  if (action.retrieveRoomMessagesReason === RetrieveRoomMessagesReason.PAGING) {
    const headRoomMessage = R.head(roomMessages);
    let offsetTimestamp = 0;
    if (headRoomMessage) {
      offsetTimestamp = headRoomMessage.createdTimestamp!;
    }
    res = yield call(() => {
      const req = {
        limit: state.client.client!.settings.messageListPagingCount,
        offset: 0,
        limitTimestamp: 0,
        offsetTimestamp
      } as IRetrieveRoomMessagesRequest;
      return state.room.room!.retrieveRoomMessages(req);
    });
  } else if (action.retrieveRoomMessagesReason === RetrieveRoomMessagesReason.RECEIVE) {
    const lastRoomMessage = R.last(roomMessages);
    let limitTimestamp = 0;
    if (lastRoomMessage) {
      limitTimestamp = lastRoomMessage.createdTimestamp!;
    }
    res = yield call(() => {
      const req = {
        limit: state.client.client!.settings.messageListPagingCount,
        offset: 0,
        limitTimestamp,
        offsetTimestamp: 0
      } as IRetrieveRoomMessagesRequest;
      return state.room.room!.retrieveRoomMessages(req);
    });
  }
  if (res.error) {
    yield put(retrieveRoomMessagesRequestFailureActionCreator(res.error!));
  } else {
    yield put(retrieveRoomMessagesRequestSuccessActionCreator(action.retrieveRoomMessagesReason, res.roomMessagesResponse!));
  }
}

function* gSendMessagesRequest() {
  let state: State = yield select();
  const room = state.room.room!;
  const { error }: ISendMessageResponse = yield call(() => {
    return room.sendMessage(state.message.localRoomMessages[0]);
  });
  if (error) {
    yield put(sendMessagesRequestFailureActionCreator(error!));
  } else {
    yield put(sendMessagesRequestSuccessActionCreator(state.message.localRoomMessages));
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