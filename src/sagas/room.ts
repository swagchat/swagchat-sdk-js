import { takeLatest, call, put, select, ForkEffect } from 'redux-saga/effects';
import {
  IRoom,
  IFetchRoomResponse,
  IFetchRoomUsersResponse,
} from '../';
import { setCurrentRoomActionCreator } from '../actions/client';
import {
  FETCH_ROOM_REQUEST,
  UPDATE_ROOM_REQUEST,
  ADD_ROOM_USER_REQUEST,
  REMOVE_ROOM_USER_REQUEST,
  FetchRoomRequestAction,
  UpdateRoomRequestAction,
  AddRoomUserRequestAction,
  RemoveRoomUserRequestAction,
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
  const res: IFetchRoomResponse = yield call((roomId: string) => {
    return state.client.client!.getRoom(roomId);
  }, action.roomId);
  if (res.room) {
    yield put(setCurrentRoomActionCreator(res.room));
    yield put(fetchRoomRequestSuccessActionCreator(res.room.data));
  } else {
    yield put(fetchRoomRequestFailureActionCreator(res.error!));
  }
}

function* gUpdateRoomRequest(action: UpdateRoomRequestAction) {
  const state: State  = yield select();
  const res: IFetchRoomResponse = yield call((putRoom: IRoom) => {
    return state.client.currentRoom!.update(putRoom);
  }, action.putRoom);
  if (res.room) {
    yield put(fetchRoomRequestSuccessActionCreator(res.room.data));
  } else {
    yield put(fetchRoomRequestFailureActionCreator(res.error!));
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
    return state.client.currentRoom!.addUsers(userIds);
  }, action.userIds);
  if (res.roomUsers) {
    yield put(addRoomUserRequestSuccessActionCreator(res.roomUsers));
    yield put(fetchUserRequestActionCreator());
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
    return state.client.currentRoom!.removeUsers(userIds);
  }, action.userIds);
  if (res.roomUsers) {
    yield put(removeRoomUserRequestSuccessActionCreator(res.roomUsers));
    yield put(fetchUserRequestActionCreator());
    location.href = '#';
  } else {
    yield put(removeRoomUserRequestFailureActionCreator(res.error!));
  }
}

export function* roomSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(FETCH_ROOM_REQUEST, gFetchRoomRequest);
  yield takeLatest(UPDATE_ROOM_REQUEST, gUpdateRoomRequest);
  yield takeLatest(ADD_ROOM_USER_REQUEST, gAddRoomUserRequest);
  yield takeLatest(REMOVE_ROOM_USER_REQUEST, gRemoveRoomUserRequest);
}