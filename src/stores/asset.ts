import { IAsset } from '../';

export interface IAssetState {
  file: Blob | null;
  asset: IAsset | null;
}
