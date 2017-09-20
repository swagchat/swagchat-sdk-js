import { Action } from 'redux';
import { IAsset, IProblemDetail } from '../';

export const UPLOAD_ASSET_REQUEST = 'UPLOAD_ASSET_REQUEST';
export const UPLOAD_ASSET_REQUEST_SUCCESS = 'UPLOAD_ASSET_REQUEST_SUCCESS';
export const UPLOAD_ASSET_REQUEST_FAILURE = 'UPLOAD_ASSET_REQUEST_FAILURE';

export type AssetActionTypes = typeof UPLOAD_ASSET_REQUEST
  | typeof UPLOAD_ASSET_REQUEST_SUCCESS
  | typeof UPLOAD_ASSET_REQUEST_FAILURE
;

export interface IAssetBaseAction extends Action {
  type: AssetActionTypes;
}

export interface IUploadAssetRequestAction extends IAssetBaseAction {
  file: Blob;
}
export const uploadAssetRequestActionCreator = (file: Blob): IUploadAssetRequestAction => ({
  type: UPLOAD_ASSET_REQUEST,
  file: file,
});

export interface IUploadAssetRequestSuccessAction extends IAssetBaseAction {
  asset: IAsset;
}
export const uploadAssetRequestSuccessActionCreator = (asset: IAsset): IUploadAssetRequestSuccessAction => ({
  type: UPLOAD_ASSET_REQUEST_SUCCESS,
  asset: asset,
});

export interface IUploadAssetRequestFailureAction extends IAssetBaseAction {
  problemDetail: IProblemDetail;
}
export const uploadAssetRequestFailureActionCreator = (problemDetail: IProblemDetail): IUploadAssetRequestFailureAction => ({
  type: UPLOAD_ASSET_REQUEST_FAILURE,
  problemDetail: problemDetail,
});

export type AssetActions = IAssetBaseAction
  | IUploadAssetRequestAction
  | IUploadAssetRequestSuccessAction
  | IUploadAssetRequestFailureAction
;
