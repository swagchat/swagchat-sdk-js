import { IAsset } from '../';

export interface AssetState {
  file: Blob | null;
  asset: IAsset | null;
}