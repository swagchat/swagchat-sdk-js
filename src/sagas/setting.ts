import { takeLatest, call, put, select, ForkEffect } from 'redux-saga/effects';
import {
  FETCH_SETTING_REQUEST,
  fetchSettingRequestSuccessActionCreator,
  fetchSettingRequestFailureActionCreator,
} from '../actions/setting';
import { IFetchSettingResponse, State } from '../';

function* gFetchSettingRequest() {
  const state: State = yield select();
  const res: IFetchSettingResponse = yield call(() => {
    return state.client.client!.getSetting();
  });
  if (res.setting) {
    yield put(fetchSettingRequestSuccessActionCreator(res.setting));
  } else {
    yield put(fetchSettingRequestFailureActionCreator(res.error!));
  }
}

export function* settingSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(FETCH_SETTING_REQUEST, gFetchSettingRequest);
}
