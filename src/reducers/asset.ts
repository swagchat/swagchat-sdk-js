import { IAssetState } from '../stores/';
import {
  IAssetPostRequestSuccessAction,
  IAssetPostRequestFailureAction,
  ASSET_POST_REQUEST_SUCCESS,
  ASSET_POST_REQUEST_FAILURE,
  AssetActions,
} from '../actions/asset';

const getInitialState = (): IAssetState => ({
  file: null,
  asset: null,
  problemDetail: null,
});

export function asset(state: IAssetState = getInitialState(), action: AssetActions): IAssetState {
  switch (action.type) {
    case ASSET_POST_REQUEST_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          asset: (<IAssetPostRequestSuccessAction>action).asset,
        }
      );
    case ASSET_POST_REQUEST_FAILURE:
      return Object.assign(
        {},
        state,
        {
          asset: null,
          problemDetail: (<IAssetPostRequestFailureAction>action).problemDetail,
        }
      );
    default:
      return state;
  }
}
