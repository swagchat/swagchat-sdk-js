import { takeLatest, call, put, ForkEffect, select } from 'redux-saga/effects';
import { IPostAssetResponse } from '../';
import {
  UPLOAD_ASSET_REQUEST,
  IUploadAssetRequestAction,
  uploadAssetRequestSuccessActionCreator,
  uploadAssetRequestFailureActionCreator,
} from '../actions/asset';
import { State } from '../stores';

function* gUploadAssetRequest(action: IUploadAssetRequestAction) {
  const state: State = yield select();
  const res: IPostAssetResponse = yield call((file: Blob) => {
    return state.client.client!.user.fileUpload(file);
  }, action.file);
  if (res.asset) {
    yield put(uploadAssetRequestSuccessActionCreator(res.asset));
  } else {
    yield put(uploadAssetRequestFailureActionCreator(res.error!));
  }
}

export function* assetSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(UPLOAD_ASSET_REQUEST, gUploadAssetRequest);
}
