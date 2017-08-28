"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("../actions/client");
var getInitialState = function () { return ({
    client: null,
}); };
function client(state, action) {
    if (state === void 0) { state = getInitialState(); }
    switch (action.type) {
        case client_1.SET_CLIENT:
            return Object.assign({}, state, {
                client: action.client,
            });
        default:
            return state;
    }
}
exports.client = client;
//# sourceMappingURL=client.js.map