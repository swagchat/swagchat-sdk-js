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
var room_1 = require("../actions/room");
var user_1 = require("../actions/user");
function fetchRoom(action) {
    var state, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.select()];
            case 1:
                state = _a.sent();
                return [4 /*yield*/, effects_1.call(function (roomId) {
                        return state.client.client.getRoom(roomId);
                    }, action.roomId)];
            case 2:
                res = _a.sent();
                if (!res.room) return [3 /*break*/, 4];
                return [4 /*yield*/, effects_1.put(room_1.roomFetchRequestSuccessActionCreator(res.room))];
            case 3:
                _a.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, effects_1.put(room_1.roomFetchRequestFailureActionCreator(res.error))];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}
function updateRoom(action) {
    var state, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.select()];
            case 1:
                state = _a.sent();
                return [4 /*yield*/, effects_1.call(function (putRoom) {
                        return state.room.room.update(putRoom);
                    }, action.putRoom)];
            case 2:
                res = _a.sent();
                if (!res.room) return [3 /*break*/, 4];
                return [4 /*yield*/, effects_1.put(room_1.roomFetchRequestSuccessActionCreator(res.room))];
            case 3:
                _a.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, effects_1.put(room_1.roomFetchRequestFailureActionCreator(res.error))];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}
function fetchRoomUserAdd(action) {
    var state, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.select()];
            case 1:
                state = _a.sent();
                return [4 /*yield*/, effects_1.call(function (userIds) {
                        return state.room.room.addUsers(userIds);
                    }, action.userIds)];
            case 2:
                res = _a.sent();
                if (!res.roomUsers) return [3 /*break*/, 5];
                return [4 /*yield*/, effects_1.put(room_1.roomUserAddFetchRequestSuccessActionCreator(res.roomUsers))];
            case 3:
                _a.sent();
                return [4 /*yield*/, effects_1.put(user_1.userFetchRequestActionCreator(state.user.user.userId, state.user.user.accessToken))];
            case 4:
                _a.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, effects_1.put(room_1.roomUserAddFetchRequestFailureActionCreator(res.error))];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}
function fetchRoomUserRemove(action) {
    var state, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.select()];
            case 1:
                state = _a.sent();
                return [4 /*yield*/, effects_1.call(function (userIds) {
                        return state.room.room.removeUsers(userIds);
                    }, action.userIds)];
            case 2:
                res = _a.sent();
                if (!res.roomUsers) return [3 /*break*/, 5];
                return [4 /*yield*/, effects_1.put(room_1.roomUserRemoveFetchRequestSuccessActionCreator(res.roomUsers))];
            case 3:
                _a.sent();
                return [4 /*yield*/, effects_1.put(user_1.userFetchRequestActionCreator(state.user.user.userId, state.user.user.accessToken))];
            case 4:
                _a.sent();
                location.href = '#';
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, effects_1.put(room_1.roomUserRemoveFetchRequestFailureActionCreator(res.error))];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}
function roomSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeLatest(room_1.ROOM_FETCH_REQUEST, fetchRoom)];
            case 1:
                _a.sent();
                return [4 /*yield*/, effects_1.takeLatest(room_1.ROOM_UPDATE_REQUEST, updateRoom)];
            case 2:
                _a.sent();
                return [4 /*yield*/, effects_1.takeLatest(room_1.ROOM_USER_ADD_FETCH_REQUEST, fetchRoomUserAdd)];
            case 3:
                _a.sent();
                return [4 /*yield*/, effects_1.takeLatest(room_1.ROOM_USER_REMOVE_FETCH_REQUEST, fetchRoomUserRemove)];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.roomSaga = roomSaga;
//# sourceMappingURL=room.js.map