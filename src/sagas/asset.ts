import { takeLatest, call, put, ForkEffect, select } from 'redux-saga/effects';
import { IPostAssetResponse } from '..';
import {
  UPLOAD_ASSET_REQUEST,
  UploadAssetRequestAction,
  uploadAssetRequestSuccessActionCreator,
  uploadAssetRequestFailureActionCreator,
} from '../actions/asset';
import { State } from '../stores';

function* gUploadAssetRequest(action: UploadAssetRequestAction) {
  const state: State = yield select();
  const res: IPostAssetResponse = yield call((file: File, mime: string) => {
    return state.client.client!.fileUpload(file, mime);
  }, action.file, action.mime);
  if (res.asset) {
    yield put(uploadAssetRequestSuccessActionCreator(res.asset));
  } else {
    yield put(uploadAssetRequestFailureActionCreator(res.error!));
  }
}

export function* assetSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(UPLOAD_ASSET_REQUEST, gUploadAssetRequest);
}