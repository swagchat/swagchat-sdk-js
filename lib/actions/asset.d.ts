import { Action } from 'redux';
import { IAsset, IProblemDetail } from '../';
export declare const ASSET_POST_REQUEST = "ASSET_POST_REQUEST";
export declare const ASSET_POST_REQUEST_SUCCESS = "ASSET_POST_REQUEST_SUCCESS";
export declare const ASSET_POST_REQUEST_FAILURE = "ASSET_POST_REQUEST_FAILURE";
export declare type AssetActionTypes = typeof ASSET_POST_REQUEST | typeof ASSET_POST_REQUEST_SUCCESS | typeof ASSET_POST_REQUEST_FAILURE;
export interface IAssetBaseAction extends Action {
    type: AssetActionTypes;
}
export interface IAssetPostRequestAction extends IAssetBaseAction {
    file: Blob;
}
export declare const assetPostRequestActionCreator: (file: Blob) => IAssetPostRequestAction;
export interface IAssetPostRequestSuccessAction extends IAssetBaseAction {
    asset: IAsset;
}
export declare const assetPostRequestSuccessActionCreator: (asset: IAsset) => IAssetPostRequestSuccessAction;
export interface IAssetPostRequestFailureAction extends IAssetBaseAction {
    problemDetail: IProblemDetail;
}
export declare const assetPostRequestFailureActionCreator: (problemDetail: IProblemDetail) => IAssetPostRequestFailureAction;
export declare type AssetActions = IAssetBaseAction | IAssetPostRequestAction | IAssetPostRequestSuccessAction | IAssetPostRequestFailureAction;
