import { Action } from 'redux';
import { IAsset, IProblemDetail } from '../';

export const UPLOAD_ASSET_REQUEST = 'UPLOAD_ASSET_REQUEST';
export const UPLOAD_ASSET_REQUEST_SUCCESS = 'UPLOAD_ASSET_REQUEST_SUCCESS';
export const UPLOAD_ASSET_REQUEST_FAILURE = 'UPLOAD_ASSET_REQUEST_FAILURE';

export type AssetActionTypes = typeof UPLOAD_ASSET_REQUEST
  | typeof UPLOAD_ASSET_REQUEST_SUCCESS
  | typeof UPLOAD_ASSET_REQUEST_FAILURE
;

export interface AssetBaseAction extends Action {
  type: AssetActionTypes;
}

export interface UploadAssetRequestAction extends AssetBaseAction {
  file: Blob;
}
export const uploadAssetRequestActionCreator = (file: Blob): UploadAssetRequestAction => ({
  type: UPLOAD_ASSET_REQUEST,
  file: file,
});

export interface UploadAssetRequestSuccessAction extends AssetBaseAction {
  asset: IAsset;
}
export const uploadAssetRequestSuccessActionCreator = (asset: IAsset): UploadAssetRequestSuccessAction => ({
  type: UPLOAD_ASSET_REQUEST_SUCCESS,
  asset: asset,
});

export interface UploadAssetRequestFailureAction extends AssetBaseAction {
  problemDetail: IProblemDetail;
}
export const uploadAssetRequestFailureActionCreator = (problemDetail: IProblemDetail): UploadAssetRequestFailureAction => ({
  type: UPLOAD_ASSET_REQUEST_FAILURE,
  problemDetail: problemDetail,
});

export type AssetActions = AssetBaseAction
  | UploadAssetRequestAction
  | UploadAssetRequestSuccessAction
  | UploadAssetRequestFailureAction
;