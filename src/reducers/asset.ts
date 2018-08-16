import { AssetState } from '../stores/asset';
import {
  AssetActions,
  UPLOAD_ASSET_REQUEST_SUCCESS, UploadAssetRequestSuccessAction,
  UPLOAD_ASSET_REQUEST_FAILURE, UploadAssetRequestFailureAction,
} from '../actions/asset';

const getInitialState = (): AssetState => ({
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
          errorResponse: (<UploadAssetRequestFailureAction>action).errorResponse,
        }
      );
    default:
      return state;
  }
}