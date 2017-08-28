import { IAsset, IProblemDetail } from '../';
export interface IAssetState {
    file: Blob | null;
    asset: IAsset | null;
    problemDetail: IProblemDetail | null;
}
