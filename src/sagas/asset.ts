import { takeLatest, call, put, ForkEffect } from 'redux-saga/effects';
import { IPostAssetResponse, fileUpload } from '../';
import {
  ASSET_POST_REQUEST,
  IAssetPostRequestAction,
  assetPostRequestSuccessActionCreator,
  assetPostRequestFailureActionCreator,
} from '../actions/asset';

function* postAsset(action: IAssetPostRequestAction) {
  const res: IPostAssetResponse = yield call((file: Blob) => {
    return fileUpload(file);
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
