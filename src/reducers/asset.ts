import { AssetState } from '../stores/asset';
import {
  UploadAssetRequestSuccessAction,
  UploadAssetRequestFailureAction,
  UPLOAD_ASSET_REQUEST_SUCCESS,
  UPLOAD_ASSET_REQUEST_FAILURE,
  AssetActions,
} from '../actions/asset';

const getInitialState = (): AssetState => ({
  file: null,
  asset: null,
});

export function asset(state: AssetState = getInitialState(), action: AssetActions): AssetState {
  switch (action.type) {
    case UPLOAD_ASSET_REQUEST_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          asset: (<UploadAssetRequestSuccessAction>action).asset,
        }
      );
    case UPLOAD_ASSET_REQUEST_FAILURE:
      return Object.assign(
        {},
        state,
        {
          asset: null,
          problemDetail: (<UploadAssetRequestFailureAction>action).problemDetail,
        }
      );
    default:
      return state;
  }
}