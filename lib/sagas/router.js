"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var effects_1 = require("redux-saga/effects");
var react_router_redux_1 = require("react-router-redux");
var _1 = require("../");
var combined_1 = require("../actions/combined");
var user_1 = require("../actions/user");
var client_1 = require("../actions/client");
var room_1 = require("../actions/room");
var message_1 = require("../actions/message");
var user_2 = require("../actions/user");
function locationChange() {
    var state, pathname, roomListPathRegExp, messagePathRegExp, roomSettingPathRegExp, selectContactPathRegExp, user, userRes, roomId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.select()];
            case 1:
                state = _a.sent();
                if (!state.router.location) {
                    return [2 /*return*/];
                }
                pathname = state.router.location.pathname;
                roomListPathRegExp = state.setting.roomListRoutePath ? pathname.match(new RegExp('^' + state.setting.roomListRoutePath + '$')) : null;
                messagePathRegExp = state.setting.messageRoutePath ? pathname.match(new RegExp('^' + state.setting.messageRoutePath)) : null;
                roomSettingPathRegExp = state.setting.roomSettingRoutePath ? pathname.match(new RegExp('^' + state.setting.roomSettingRoutePath)) : null;
                selectContactPathRegExp = state.setting.selectContactRoutePath ? pathname.match(new RegExp('^' + state.setting.selectContactRoutePath)) : null;
                user = state.user.user;
                if (!!user) return [3 /*break*/, 6];
                return [4 /*yield*/, effects_1.call(function () {
                        return _1.User.auth({
                            apiKey: state.user.apiKey,
                            apiEndpoint: state.user.apiEndpoint,
                            realtimeEndpoint: state.user.realtimeEndpoint,
                            userId: state.user.userId,
                            accessToken: state.user.accessToken,
                        });
                    })];
            case 2:
                userRes = _a.sent();
                if (!userRes.user) return [3 /*break*/, 4];
                user = userRes.user;
                return [4 /*yield*/, effects_1.put(client_1.setClientActionCreator(user._client))];
            case 3:
                _a.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, effects_1.put(user_1.userFetchRequestFailureActionCreator(userRes.error))];
            case 5:
                _a.sent();
                return [2 /*return*/];
            case 6:
                if (!roomListPathRegExp) return [3 /*break*/, 9];
                return [4 /*yield*/, effects_1.put(message_1.clearMessagesActionCreator())];
            case 7:
                _a.sent();
                return [4 /*yield*/, effects_1.put(user_2.userFetchRequestActionCreator(user.userId))];
            case 8:
                _a.sent();
                return [3 /*break*/, 19];
            case 9:
                if (!(messagePathRegExp || roomSettingPathRegExp)) return [3 /*break*/, 17];
                if (!user) return [3 /*break*/, 16];
                return [4 /*yield*/, effects_1.put(user_1.userFetchRequestSuccessActionCreator(user))];
            case 10:
                _a.sent();
                roomId = void 0;
                if (!messagePathRegExp) return [3 /*break*/, 14];
                return [4 /*yield*/, effects_1.put(message_1.clearMessagesActionCreator())];
            case 11:
                _a.sent();
                roomId = pathname.match(new RegExp(state.setting.messageRoutePath + '/([a-zA-z0-9-]+)'));
                if (!roomId) return [3 /*break*/, 13];
                return [4 /*yield*/, effects_1.put(combined_1.combinedRoomAndMessagesFetchRequestActionCreator(roomId[1]))];
            case 12:
                _a.sent();
                _a.label = 13;
            case 13: return [3 /*break*/, 16];
            case 14:
                if (!roomSettingPathRegExp) return [3 /*break*/, 16];
                roomId = pathname.match(new RegExp(state.setting.roomSettingRoutePath + '/([a-zA-z0-9-]+)'));
                if (!roomId) return [3 /*break*/, 16];
                return [4 /*yield*/, effects_1.put(room_1.roomFetchRequestActionCreator(roomId[1]))];
            case 15:
                _a.sent();
                _a.label = 16;
            case 16: return [3 /*break*/, 19];
            case 17:
                if (!selectContactPathRegExp) return [3 /*break*/, 19];
                return [4 /*yield*/, effects_1.put(user_2.contactsFetchRequestActionCreator())];
            case 18:
                _a.sent();
                _a.label = 19;
            case 19: return [2 /*return*/];
        }
    });
}
function routerSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeLatest(react_router_redux_1.LOCATION_CHANGE, locationChange)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.routerSaga = routerSaga;
//# sourceMappingURL=router.js.map