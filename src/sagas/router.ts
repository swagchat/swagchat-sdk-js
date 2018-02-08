import { takeLatest, ForkEffect, put, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { setCurrentRoomIdActionCreator } from '../actions/client';
import { State } from '../';

function* gLocationChange() {
  const state: State = yield select();
  const location = state.router.location;
  if (location === null) {
    return;
  }

  let messagePathRegExp = location.pathname.match(new RegExp('^' + '/messages'));
  window.console.log(messagePathRegExp);
  if (messagePathRegExp !== null) {
    // messages page
    const roomIds = location.pathname.match(new RegExp('/messages' + '/([a-zA-z0-9-]+)'));
    if (roomIds !== null) {
      const currentRoomId = roomIds[1];
      yield put(setCurrentRoomIdActionCreator(currentRoomId));
    }
  }
  yield put;
}

export function* routerSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(LOCATION_CHANGE, gLocationChange);
}
