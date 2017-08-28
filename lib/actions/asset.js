"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASSET_POST_REQUEST = 'ASSET_POST_REQUEST';
exports.ASSET_POST_REQUEST_SUCCESS = 'ASSET_POST_REQUEST_SUCCESS';
exports.ASSET_POST_REQUEST_FAILURE = 'ASSET_POST_REQUEST_FAILURE';
exports.assetPostRequestActionCreator = function (file) { return ({
    type: exports.ASSET_POST_REQUEST,
    file: file,
}); };
exports.assetPostRequestSuccessActionCreator = function (asset) { return ({
    type: exports.ASSET_POST_REQUEST_SUCCESS,
    asset: asset,
}); };
exports.assetPostRequestFailureActionCreator = function (problemDetail) { return ({
    type: exports.ASSET_POST_REQUEST_FAILURE,
    problemDetail: problemDetail,
}); };
//# sourceMappingURL=asset.js.map