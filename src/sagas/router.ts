import { takeLatest, ForkEffect, select, put, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { IFetchUserResponse, Client } from '../';
import { State } from '../stores';
import { fetchRoomAndMessagesRequestActionCreator } from '../actions/combined';
import { fetchUserRequestSuccessActionCreator, fetchUserRequestFailureActionCreator } from '../actions/user';
import { setClientActionCreator } from '../actions/client';
import { fetchRoomRequestActionCreator } from '../actions/room';
import { clearMessagesActionCreator } from '../actions/message';
import { fetchUserRequestActionCreator, fetchContactsRequestActionCreator } from '../actions/user';

function* gLocationChange() {
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
      yield put(fetchUserRequestSuccessActionCreator(user));
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
      yield put(fetchUserRequestFailureActionCreator(userRes.error!));
      return;
    }
  }

  if (roomListPathRegExp) {
    yield put(clearMessagesActionCreator());
    yield put(fetchUserRequestActionCreator(user.userId));
  } else if (messagePathRegExp || roomSettingPathRegExp) {
    if (user) {
      let roomId;
      if (messagePathRegExp) {
        yield put(clearMessagesActionCreator());
        roomId = pathname.match(new RegExp(state.setting.messageRoutePath + '/([a-zA-z0-9-]+)'));
        if (roomId) {
          yield put(fetchRoomAndMessagesRequestActionCreator(roomId[1]));
        }
      } else if (roomSettingPathRegExp) {
        roomId = pathname.match(new RegExp(state.setting.roomSettingRoutePath + '/([a-zA-z0-9-]+)'));
        if (roomId) {
          yield put(fetchRoomRequestActionCreator(roomId[1]));
        }
      }
    }
  } else if (selectContactPathRegExp) {
    yield put(fetchContactsRequestActionCreator());
  }
}

export function* routerSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(LOCATION_CHANGE, gLocationChange);
}
