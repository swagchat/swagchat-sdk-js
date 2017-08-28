import { Action } from 'redux';
import { IAsset, IProblemDetail } from '../';

export const ASSET_POST_REQUEST = 'ASSET_POST_REQUEST';
export const ASSET_POST_REQUEST_SUCCESS = 'ASSET_POST_REQUEST_SUCCESS';
export const ASSET_POST_REQUEST_FAILURE = 'ASSET_POST_REQUEST_FAILURE';

export type AssetActionTypes = typeof ASSET_POST_REQUEST
  | typeof ASSET_POST_REQUEST_SUCCESS
  | typeof ASSET_POST_REQUEST_FAILURE
;

export interface IAssetBaseAction extends Action {
  type: AssetActionTypes;
}

export interface IAssetPostRequestAction extends IAssetBaseAction {
  file: Blob;
}
export const assetPostRequestActionCreator = (file: Blob): IAssetPostRequestAction => ({
  type: ASSET_POST_REQUEST,
  file: file,
});

export interface IAssetPostRequestSuccessAction extends IAssetBaseAction {
  asset: IAsset;
}
export const assetPostRequestSuccessActionCreator = (asset: IAsset): IAssetPostRequestSuccessAction => ({
  type: ASSET_POST_REQUEST_SUCCESS,
  asset: asset,
});

export interface IAssetPostRequestFailureAction extends IAssetBaseAction {
  problemDetail: IProblemDetail;
}
export const assetPostRequestFailureActionCreator = (problemDetail: IProblemDetail): IAssetPostRequestFailureAction => ({
  type: ASSET_POST_REQUEST_FAILURE,
  problemDetail: problemDetail,
});

export type AssetActions = IAssetBaseAction
  | IAssetPostRequestAction
  | IAssetPostRequestSuccessAction
  | IAssetPostRequestFailureAction
;
