import { takeLatest, ForkEffect, put, select, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  setCurrentRoomIdActionCreator,
  setCurrentRoomNameActionCreator,
} from '../actions/room';
import {
  fetchUserRequestSuccessActionCreator,
  fetchUserRequestFailureActionCreator,
  setProfileUserIdActionCreator,
  clearProfileUserActionCreator,
} from '../actions/user';
import {
  State, IFetchUserResponse, IRoomForUser,
  opponentUser, generateRoomName,
} from '../';

function* gLocationChange() {
  const state: State = yield select();
  const location = state.router.location;
  if (location === null) {
    return;
  }

  if (state.client.client === null) {
    return;
  }

  const client = state.client.client;

  let userRooms: {[key: string]: IRoomForUser} = {};
  if (state.user.user === null) {
    const userRes: IFetchUserResponse = yield call(() => {
      return client.getUser();
    });
    if (userRes.user !== null) {
      if (userRes.user.rooms !== undefined && Object.keys(userRes.user.rooms).length > 0) {
        userRes.user.rooms!.map((roomForUser: IRoomForUser) => {
          const users = opponentUser(roomForUser.users, userRes.user!.userId);
          if (users) {
            roomForUser.name = roomForUser.name === '' ? generateRoomName(roomForUser.users, userRes.user!.userId) : roomForUser.name;
            roomForUser.pictureUrl = users[0].pictureUrl;
          }
          userRooms[roomForUser.roomId] = roomForUser;
        });
      }
      yield put(fetchUserRequestSuccessActionCreator(userRes.user, userRooms, userRes.user.blocks!));
    } else {
      yield put(fetchUserRequestFailureActionCreator(userRes.error!));
      return;
    }
  }

  let roomsPathRegExp = location.pathname.match(new RegExp('^' + '/rooms'));
  if (roomsPathRegExp !== null) {
    // rooms page
  }

  let messagesPathRegExp = location.pathname.match(new RegExp('^' + '/messages'));
  if (messagesPathRegExp !== null) {
    // messages page
    const roomIds = location.pathname.match(new RegExp('/messages' + '/([a-zA-z0-9-]+)'));
    if (roomIds !== null) {
      const currentRoomId = roomIds[1];
      let state: State = yield select();
      if (state.user.userRooms![currentRoomId] !== undefined) {
        yield put(setCurrentRoomIdActionCreator(currentRoomId));
        yield put(setCurrentRoomNameActionCreator(state.user.userRooms![currentRoomId].name));
      }
    }
  }

  let roomSettingPathRegExp = location.pathname.match(new RegExp('^' + '/roomSetting'));
  if (roomSettingPathRegExp !== null) {
    // roomSetting page
    const roomIds = location.pathname.match(new RegExp('/roomSetting' + '/([a-zA-z0-9-]+)'));
    if (roomIds !== null) {
      const currentRoomId = roomIds[1];
      let state: State = yield select();
      if (state.user.userRooms![currentRoomId] !== undefined) {
        yield put(setCurrentRoomIdActionCreator(currentRoomId));
        yield put(setCurrentRoomNameActionCreator(state.user.userRooms![currentRoomId].name));
      }
    }
  }

  let profilePathRegExp = location.pathname.match(new RegExp('^' + '/profile'));
  if (profilePathRegExp !== null) {
    // profile page
    yield put(clearProfileUserActionCreator());
    const userIds = location.pathname.match(new RegExp('/profile' + '/([a-zA-z0-9-]+)'));
    if (userIds !== null) {
      const userId = userIds[1];
      yield put(setProfileUserIdActionCreator(userId));
    }
  }

  let accountPathRegExp = location.pathname.match(new RegExp('^' + '/account'));
  if (accountPathRegExp !== null) {
    // accout page
  }

  yield put;
}

export function* routerSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(LOCATION_CHANGE, gLocationChange);
}
