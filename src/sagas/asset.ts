import { takeLatest, call, put, ForkEffect } from 'redux-saga/effects';
import { IPostAssetResponse, fileUpload } from '../';
import {
  UPLOAD_ASSET_REQUEST,
  IUploadAssetRequestAction,
  uploadAssetRequestSuccessActionCreator,
  uploadAssetRequestFailureActionCreator,
} from '../actions/asset';

function* gUploadAssetRequest(action: IUploadAssetRequestAction) {
  const res: IPostAssetResponse = yield call((file: Blob) => {
    return fileUpload(file);
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
