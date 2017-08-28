"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var asset_1 = require("../actions/asset");
var getInitialState = function () { return ({
    file: null,
    asset: null,
    problemDetail: null,
}); };
function asset(state, action) {
    if (state === void 0) { state = getInitialState(); }
    switch (action.type) {
        case asset_1.ASSET_POST_REQUEST_SUCCESS:
            return Object.assign({}, state, {
                asset: action.asset,
            });
        case asset_1.ASSET_POST_REQUEST_FAILURE:
            return Object.assign({}, state, {
                asset: null,
                problemDetail: action.problemDetail,
            });
        default:
            return state;
    }
}
exports.asset = asset;
//# sourceMappingURL=asset.js.map