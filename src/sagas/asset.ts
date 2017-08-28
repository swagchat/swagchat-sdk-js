import { takeLatest, call, put, select, ForkEffect } from 'redux-saga/effects';
import { IPostAssetResponse } from '../';
import {
  ASSET_POST_REQUEST,
  IAssetPostRequestAction,
  assetPostRequestSuccessActionCreator,
  assetPostRequestFailureActionCreator,
} from '../actions/asset';
import { State } from '../stores';

function* postAsset(action: IAssetPostRequestAction) {
  const state: State = yield select();
  const res: IPostAssetResponse = yield call((file: Blob) => {
    return state.user.user!.fileUpload(file);
  }, action.file);
  if (res.asset) {
    yield put(assetPostRequestSuccessActionCreator(res.asset));
  } else {
    yield put(assetPostRequestFailureActionCreator(res.error!));
  }
}

export function* assetSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(ASSET_POST_REQUEST, postAsset);
}
