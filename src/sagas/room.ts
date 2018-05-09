import { takeLatest, call, put, select, ForkEffect } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  IFetchRoomResponse, IFetchRoomUsersResponse,
  generateRoomName,
} from '../';
import {
  setCurrentRoomIdActionCreator,
  setCurrentRoomNameActionCreator,
  FETCH_ROOM_REQUEST, FetchRoomRequestAction, fetchRoomRequestActionCreator,
  ADD_ROOM_USER_REQUEST, AddRoomUserRequestAction,
  REMOVE_ROOM_USER_REQUEST, RemoveRoomUserRequestAction,
  fetchRoomRequestSuccessActionCreator,
  fetchRoomRequestFailureActionCreator,
  addRoomUserRequestSuccessActionCreator,
  addRoomUserRequestFailureActionCreator,
  removeRoomUserRequestSuccessActionCreator,
  removeRoomUserRequestFailureActionCreator,
} from '../actions/room';
import { fetchUserRequestActionCreator } from '../actions/user';
import { State } from '../stores';

function* gFetchRoomRequest(action: FetchRoomRequestAction) {
  const state: State = yield select();
  const client = state.client.client;
  const roomRes: IFetchRoomResponse = yield call((roomId: string) => {
    return client!.getRoom(roomId);
  }, action.roomId);
  if (roomRes.room !== null) {
    yield put(fetchRoomRequestSuccessActionCreator(roomRes.room));
    yield put(setCurrentRoomIdActionCreator(roomRes.room.roomId));
    yield put(setCurrentRoomNameActionCreator(roomRes.room.name === '' ?
      generateRoomName(roomRes.room.users!, state.user.user!.userId, roomRes.room.type) : roomRes.room.name));
  } else {
    yield put(fetchRoomRequestFailureActionCreator(roomRes.error!));
    if (client!.paths !== undefined && client!.paths.roomListPath !== undefined) {
      yield put(push(client!.paths.roomListPath!));
    }
  }
}

function* gAddRoomUserRequest(action: AddRoomUserRequestAction) {
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
    return state.room.room!.addUsers(userIds);
  }, action.userIds);
  if (res.roomUsers) {
    yield put(addRoomUserRequestSuccessActionCreator(res.roomUsers));
    yield put(fetchRoomRequestActionCreator(roomId));
  } else {
    yield put(addRoomUserRequestFailureActionCreator(res.error!));
  }
}

function* gRemoveRoomUserRequest(action: RemoveRoomUserRequestAction) {
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
    return state.room.room!.removeUsers(userIds);
  }, action.userIds);
  if (res.roomUsers) {
    yield put(removeRoomUserRequestSuccessActionCreator(res.roomUsers));
    yield put(fetchUserRequestActionCreator());
    if (action.userIds.indexOf(state.user.user!.userId) >= 0) {
      const client = state.client.client;
      if (client!.paths !== undefined && client!.paths.roomListPath !== undefined) {
        yield put(push(client!.paths.roomListPath!));
      }
    } else {
      yield put(fetchRoomRequestActionCreator(roomId));
    }
  } else {
    yield put(removeRoomUserRequestFailureActionCreator(res.error!));
  }
}

export function* roomSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(FETCH_ROOM_REQUEST, gFetchRoomRequest);
  yield takeLatest(ADD_ROOM_USER_REQUEST, gAddRoomUserRequest);
  yield takeLatest(REMOVE_ROOM_USER_REQUEST, gRemoveRoomUserRequest);
}