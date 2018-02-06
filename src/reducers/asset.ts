import { IAssetState } from '../stores/';
import {
  IUploadAssetRequestSuccessAction,
  IUploadAssetRequestFailureAction,
  UPLOAD_ASSET_REQUEST_SUCCESS,
  UPLOAD_ASSET_REQUEST_FAILURE,
  AssetActions,
} from '../actions/asset';

const getInitialState = (): IAssetState => ({
  file: null,
  asset: null,
});

export function asset(state: IAssetState = getInitialState(), action: AssetActions): IAssetState {
  switch (action.type) {
    case UPLOAD_ASSET_REQUEST_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          asset: (<IUploadAssetRequestSuccessAction>action).asset,
        }
      );
    case UPLOAD_ASSET_REQUEST_FAILURE:
      return Object.assign(
        {},
        state,
        {
          asset: null,
          problemDetail: (<IUploadAssetRequestFailureAction>action).problemDetail,
        }
      );
    default:
      return state;
  }
}
