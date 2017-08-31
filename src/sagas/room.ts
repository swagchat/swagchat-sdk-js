import { takeLatest, call, put, select, ForkEffect } from 'redux-saga/effects';
import {
  IRoom,
  IFetchRoomResponse,
  IFetchRoomUsersResponse,
} from '../';
import {
  updateRoom,
  addRoomUsers,
  removeRoomUsers,
} from '../room';

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

function* gGetRoom(action: IRoomFetchRequestAction) {
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

function* gUpdateRoom(action: IRoomUpdateRequestAction) {
  const res: IFetchRoomResponse = yield call((putRoom: IRoom) => {
    return updateRoom(putRoom);
  }, action.putRoom);
  if (res.room) {
    yield put(roomFetchRequestSuccessActionCreator(res.room));
  } else {
    yield put(roomFetchRequestFailureActionCreator(res.error!));
  }
}

function* gRoomUserAdd(action: IRoomUserAddFetchRequestAction) {
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
  const res: IFetchRoomUsersResponse = yield call((userIds: string[]) => {
    return addRoomUsers(roomId, userIds);
  }, action.userIds);
  if (res.roomUsers) {
    yield put(roomUserAddFetchRequestSuccessActionCreator(res.roomUsers));
    yield put(userFetchRequestActionCreator(state.user.user!.userId, state.user.user!.accessToken));
  } else {
    yield put(roomUserAddFetchRequestFailureActionCreator(res.error!));
  }
}

function* gRoomUserRemove(action: IRoomUserRemoveFetchRequestAction) {
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
  const res: IFetchRoomUsersResponse = yield call((userIds: string[]) => {
    return removeRoomUsers(roomId, userIds);
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
  yield takeLatest(ROOM_FETCH_REQUEST, gGetRoom);
  yield takeLatest(ROOM_UPDATE_REQUEST, gUpdateRoom);
  yield takeLatest(ROOM_USER_ADD_FETCH_REQUEST, gRoomUserAdd);
  yield takeLatest(ROOM_USER_REMOVE_FETCH_REQUEST, gRoomUserRemove);
}
