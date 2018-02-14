import { takeLatest, call, put, ForkEffect, select } from 'redux-saga/effects';
import { State } from '../stores';

import {
  IUser,
  IFetchUserResponse,
  IFetchUsersResponse,
  IRoomForUser,
  opponentUser,
} from '../';
import {
  FETCH_USER_REQUEST,
  FETCH_USERS_REQUEST,
  FETCH_CONTACTS_REQUEST,
  FetchUserRequestAction,
  fetchUserRequestSuccessActionCreator,
  fetchUserRequestFailureActionCreator,
  fetchUsersRequestSuccessActionCreator,
  fetchUsersRequestFailureActionCreator,
  fetchContactsRequestSuccessActionCreator,
  fetchContactsRequestFailureActionCreator,
} from '../actions/user';

function* gFetchUserRequest(action: FetchUserRequestAction) {
  action;
  const state: State = yield select();

  if (state.client.userId === '' || state.client.accessToken === '') {
    const error = {
      title: 'not set auth params',
    };
    yield put(fetchUserRequestFailureActionCreator(error));
    return;
  }

  const res: IFetchUserResponse = yield call(() => {
    return state.client.client!.getUser(state.client.userId, state.client.accessToken);
  });
  if (res.user) {
    let userRooms: {[key: string]: IRoomForUser} = {};
    res.user.rooms!.map((value: IRoomForUser) => {
      const users = opponentUser(value.users, state.client.userId);
      let userNames = '';
      if (users) {
        for (let i = 0; i < users.length; i++) {
          if (users[i].isShowUsers) {
            userNames += users[i].name + ' ';
          }
        }
        value.name = userNames;
        value.pictureUrl = users[0].pictureUrl;
      }
      userRooms[value.roomId] = value;
    });

    yield put(fetchUserRequestSuccessActionCreator(res.user, userRooms));
  } else {
    yield put(fetchUserRequestFailureActionCreator(res.error!));
  }
}

function* gFetchUsersRequest() {
  const state: State = yield select();

  if (state.client.userId === '' || state.client.accessToken === '') {
    const error = {
      title: 'not set auth params',
    };
    yield put(fetchUsersRequestFailureActionCreator(error));
    return;
  }

  const res: IFetchUsersResponse = yield call(() => {
    return state.client.client!.getUsers();
  });
  if (res.users) {
    let users: {[key: string]: IUser} = {};
    res.users.map((value: IUser) => {
      users[value.userId] = value;
    });
    yield put(fetchUsersRequestSuccessActionCreator(users));
  } else {
    yield put(fetchUsersRequestFailureActionCreator(res.error!));
  }
}

function* gFetchContactsRequest() {
  const state: State = yield select();
  const res: IFetchUsersResponse = yield call(() => {
    return state.user.user!.getContacts();
  });
  if (res.users) {
    let users: {[key: string]: IUser} = {};
    res.users.map((value: IUser) => {
      users[value.userId] = value;
    });
    yield put(fetchContactsRequestSuccessActionCreator(users));
  } else {
    yield put(fetchContactsRequestFailureActionCreator(res.error!));
  }
}

export function* userSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(FETCH_USER_REQUEST, gFetchUserRequest);
  yield takeLatest(FETCH_USERS_REQUEST, gFetchUsersRequest);
  yield takeLatest(FETCH_CONTACTS_REQUEST, gFetchContactsRequest);
}
