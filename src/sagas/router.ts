import { takeLatest, ForkEffect, select, put, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { IFetchUserResponse, Client } from '../';
import { State } from '../stores';
import { combinedRoomAndMessagesFetchRequestActionCreator } from '../actions/combined';
import { userFetchRequestSuccessActionCreator, userFetchRequestFailureActionCreator } from '../actions/user';
import { setClientActionCreator } from '../actions/client';
import { roomFetchRequestActionCreator } from '../actions/room';
import { clearMessagesActionCreator } from '../actions/message';
import { userFetchRequestActionCreator, contactsFetchRequestActionCreator } from '../actions/user';

function* locationChange() {
  const state: State = yield select();
  if (!state.router.location) {
    return;
  }

  const pathname = state.router.location!.pathname;

  let roomListPathRegExp = state.setting.roomListRoutePath ? pathname.match(new RegExp('^' + state.setting.roomListRoutePath + '$')) : null;
  let messagePathRegExp = state.setting.messageRoutePath ? pathname.match(new RegExp('^' + state.setting.messageRoutePath)) : null;
  let roomSettingPathRegExp = state.setting.roomSettingRoutePath ? pathname.match(new RegExp('^' + state.setting.roomSettingRoutePath)) : null;
  let selectContactPathRegExp = state.setting.selectContactRoutePath ? pathname.match(new RegExp('^' + state.setting.selectContactRoutePath)) : null;

  let user = state.user.user;
  let userRes: IFetchUserResponse;
  if (!user) {
    userRes = yield call(() => {
      return Client.auth({
        apiKey: state.user.apiKey,
        apiEndpoint: state.user.apiEndpoint,
        realtimeEndpoint: state.user.realtimeEndpoint,
        userId: state.user.userId,
        accessToken: state.user.accessToken,
      });
    });
    if (userRes.user) {
      user = userRes.user;
      yield put(userFetchRequestSuccessActionCreator(user));
      const client = new Client({
        apiKey: state.user.apiKey,
        apiEndpoint: state.user.apiEndpoint,
        realtime: {
          endpoint: state.user.realtimeEndpoint,
        },
        userId: state.user.userId,
        userAccessToken: state.user.accessToken,
      });
      yield put(setClientActionCreator(client));
    } else {
      yield put(userFetchRequestFailureActionCreator(userRes.error!));
      return;
    }
  }

  if (roomListPathRegExp) {
    yield put(clearMessagesActionCreator());
    yield put(userFetchRequestActionCreator(user.userId));
  } else if (messagePathRegExp || roomSettingPathRegExp) {
    if (user) {
      let roomId;
      if (messagePathRegExp) {
        yield put(clearMessagesActionCreator());
        roomId = pathname.match(new RegExp(state.setting.messageRoutePath + '/([a-zA-z0-9-]+)'));
        if (roomId) {
          yield put(combinedRoomAndMessagesFetchRequestActionCreator(roomId[1]));
        }
      } else if (roomSettingPathRegExp) {
        roomId = pathname.match(new RegExp(state.setting.roomSettingRoutePath + '/([a-zA-z0-9-]+)'));
        if (roomId) {
          yield put(roomFetchRequestActionCreator(roomId[1]));
        }
      }
    }
  } else if (selectContactPathRegExp) {
    yield put(contactsFetchRequestActionCreator());
  }
}

export function* routerSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(LOCATION_CHANGE, locationChange);
}
