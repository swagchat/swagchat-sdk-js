import { takeLatest, call, put, select, ForkEffect } from 'redux-saga/effects';
import { IRoom, IFetchRoomResponse, IFetchRoomUsersResponse } from '../';

import {
  ROOM_FETCH_REQUEST,
  ROOM_UPDATE_REQUEST,
  ROOM_USER_ADD_FETCH_REQUEST,
  ROOM_USER_REMOVE_FETCH_REQUEST,
  IRoomFetchRequestAction,
  IRoomUpdateRequestAction,
  IRoomUserAddFetchRequestAction,
  IRoomUserRemoveFetchRequestAction,
  roomFetchRequestSuccessActionCreator,
  roomFetchRequestFailureActionCreator,
  roomUserAddFetchRequestSuccessActionCreator,
  roomUserAddFetchRequestFailureActionCreator,
  roomUserRemoveFetchRequestSuccessActionCreator,
  roomUserRemoveFetchRequestFailureActionCreator,
} from '../actions/room';
import { userFetchRequestActionCreator } from '../actions/user';
import { State } from '../stores';

function* fetchRoom(action: IRoomFetchRequestAction) {
  const state: State = yield select();
  const res: IFetchRoomResponse = yield call((roomId: string) => {
    return state.client.client!.getRoom(roomId);
  }, action.roomId);
  if (res.room) {
    yield put(roomFetchRequestSuccessActionCreator(res.room));
  } else {
    yield put(roomFetchRequestFailureActionCreator(res.error!));
  }
}

function* updateRoom(action: IRoomUpdateRequestAction) {
  const state: State = yield select();
  const res: IFetchRoomResponse = yield call((putRoom: IRoom) => {
    return state.room.room!.update(putRoom);
  }, action.putRoom);
  if (res.room) {
    yield put(roomFetchRequestSuccessActionCreator(res.room));
  } else {
    yield put(roomFetchRequestFailureActionCreator(res.error!));
  }
}

function* fetchRoomUserAdd(action: IRoomUserAddFetchRequestAction) {
  const state: State  = yield select();
  const res: IFetchRoomUsersResponse = yield call((userIds: string[]) => {
    return state.room.room!.addUsers(userIds);
  }, action.userIds);
  if (res.roomUsers) {
    yield put(roomUserAddFetchRequestSuccessActionCreator(res.roomUsers));
    yield put(userFetchRequestActionCreator(state.user.user!.userId, state.user.user!.accessToken));
    // location.href = '#';
  } else {
    yield put(roomUserAddFetchRequestFailureActionCreator(res.error!));
  }
}

function* fetchRoomUserRemove(action: IRoomUserRemoveFetchRequestAction) {
  const state: State  = yield select();
  const res: IFetchRoomUsersResponse = yield call((userIds: string[]) => {
    return state.room.room!.removeUsers(userIds);
  }, action.userIds);
  if (res.roomUsers) {
    yield put(roomUserRemoveFetchRequestSuccessActionCreator(res.roomUsers));
    yield put(userFetchRequestActionCreator(state.user.user!.userId, state.user.user!.accessToken));
    location.href = '#';
  } else {
    yield put(roomUserRemoveFetchRequestFailureActionCreator(res.error!));
  }
}

export function* roomSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(ROOM_FETCH_REQUEST, fetchRoom);
  yield takeLatest(ROOM_UPDATE_REQUEST, updateRoom);
  yield takeLatest(ROOM_USER_ADD_FETCH_REQUEST, fetchRoomUserAdd);
  yield takeLatest(ROOM_USER_REMOVE_FETCH_REQUEST, fetchRoomUserRemove);
}
