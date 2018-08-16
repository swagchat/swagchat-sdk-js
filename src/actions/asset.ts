import { Action } from 'redux';
import { IAsset, IErrorResponse } from '..';

export const UPLOAD_ASSET_REQUEST = 'UPLOAD_ASSET_REQUEST';
export const UPLOAD_ASSET_REQUEST_SUCCESS = 'UPLOAD_ASSET_REQUEST_SUCCESS';
export const UPLOAD_ASSET_REQUEST_FAILURE = 'UPLOAD_ASSET_REQUEST_FAILURE';

export type AssetActionTypes =
  typeof UPLOAD_ASSET_REQUEST |
  typeof UPLOAD_ASSET_REQUEST_SUCCESS |
  typeof UPLOAD_ASSET_REQUEST_FAILURE
;

export interface AssetBaseAction extends Action {
  type: AssetActionTypes;
}

export interface UploadAssetRequestAction extends AssetBaseAction {
  file: File;
  mime: string;
}
export const uploadAssetRequestActionCreator = (file: File, mime: string): UploadAssetRequestAction => ({
  type: UPLOAD_ASSET_REQUEST,
  file: file,
  mime: mime,
});

export interface UploadAssetRequestSuccessAction extends AssetBaseAction {
  asset: IAsset;
}
export const uploadAssetRequestSuccessActionCreator = (asset: IAsset): UploadAssetRequestSuccessAction => ({
  type: UPLOAD_ASSET_REQUEST_SUCCESS,
  asset: asset,
});

export interface UploadAssetRequestFailureAction extends AssetBaseAction {
  errorResponse: IErrorResponse;
}
export const uploadAssetRequestFailureActionCreator = (errorResponse: IErrorResponse): UploadAssetRequestFailureAction => ({
  type: UPLOAD_ASSET_REQUEST_FAILURE,
  errorResponse: errorResponse,
});

export type AssetActions =
  AssetBaseAction |
  UploadAssetRequestAction |
  UploadAssetRequestSuccessAction |
  UploadAssetRequestFailureAction
;