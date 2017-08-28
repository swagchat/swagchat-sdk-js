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
var _1 = require("../");
var Scroll = require("react-scroll");
var react_router_redux_1 = require("react-router-redux");
var client_1 = require("../actions/client");
var user_1 = require("../actions/user");
var room_1 = require("../actions/room");
var style_1 = require("../actions/style");
var combined_1 = require("../actions/combined");
var message_1 = require("../actions/message");
var asset_1 = require("../actions/asset");
var stores_1 = require("../stores");
var _2 = require("../");
var utils_1 = require("../utils");
function fetchRoomAndMessages(action) {
    var state, fetchRoomRes, fetchMessageRes, subMsgFunc_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.select()];
            case 1:
                state = _a.sent();
                return [4 /*yield*/, effects_1.call(function (roomId) {
                        return state.client.client.getRoom(roomId);
                    }, action.roomId)];
            case 2:
                fetchRoomRes = _a.sent();
                if (!fetchRoomRes.room) return [3 /*break*/, 11];
                return [4 /*yield*/, effects_1.put(room_1.roomFetchRequestSuccessActionCreator(fetchRoomRes.room))];
            case 3:
                _a.sent();
                return [4 /*yield*/, effects_1.put(message_1.beforeMessagesFetchActionActionCreator(fetchRoomRes.room.messageCount, 20))];
            case 4:
                _a.sent();
                return [4 /*yield*/, effects_1.call(function () {
                        return fetchRoomRes.room.getMessages({
                            limit: 20,
                            offset: (fetchRoomRes.room.messageCount - 20) < 0 ? 0 : fetchRoomRes.room.messageCount - 20,
                        });
                    })];
            case 5:
                fetchMessageRes = _a.sent();
                if (!fetchMessageRes.messages) return [3 /*break*/, 8];
                return [4 /*yield*/, effects_1.put(message_1.messagesFetchRequestSuccessActionCreator(fetchMessageRes.messages))];
            case 6:
                _a.sent();
                return [4 /*yield*/, effects_1.put(user_1.markAsReadRequestActionCreator(fetchRoomRes.room.roomId))];
            case 7:
                _a.sent();
                Scroll.animateScroll.scrollToBottom({ duration: 0 });
                return [3 /*break*/, 10];
            case 8: return [4 /*yield*/, effects_1.put(message_1.messagesFetchRequestFailureActionCreator(fetchMessageRes.error))];
            case 9:
                _a.sent();
                _a.label = 10;
            case 10:
                subMsgFunc_1 = function (message) {
                    console.info('%c[ReactSwagChat]Receive message(push)', 'color:' + _2.logColor);
                    stores_1.store.dispatch(message_1.updateMessagesActionCreator([message]));
                    Scroll.animateScroll.scrollToBottom({ duration: 300 });
                };
                if (state.client.client.connection && state.client.client.connection.conn) {
                    if (state.client.client.connection.conn.readyState === state.client.client.connection.conn.OPEN) {
                        fetchRoomRes.room.subscribeMessage(subMsgFunc_1);
                    }
                    else {
                        state.client.client.onConnected = function () {
                            fetchRoomRes.room.subscribeMessage(subMsgFunc_1);
                        };
                    }
                }
                return [3 /*break*/, 13];
            case 11: return [4 /*yield*/, effects_1.put(room_1.roomFetchRequestFailureActionCreator(fetchRoomRes.error))];
            case 12:
                _a.sent();
                _a.label = 13;
            case 13: return [2 /*return*/];
        }
    });
}
function fetchUserAndRoomAndMessages(action) {
    var fetchUserRes, fetchRoomRes_1, state_1, fetchMessageRes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.call(function (apiKey, apiEndpoint, realtimeEndpoint, userId, accessToken) {
                    return _1.User.auth({
                        apiKey: apiKey,
                        apiEndpoint: apiEndpoint,
                        realtimeEndpoint: realtimeEndpoint,
                        userId: userId,
                        accessToken: accessToken,
                    });
                }, action.apiKey, action.apiEndpoint, action.realtimeEndpoint, action.userId, action.accessToken)];
            case 1:
                fetchUserRes = _a.sent();
                if (!fetchUserRes.user) return [3 /*break*/, 17];
                return [4 /*yield*/, effects_1.put(user_1.userFetchRequestSuccessActionCreator(fetchUserRes.user))];
            case 2:
                _a.sent();
                return [4 /*yield*/, effects_1.put(client_1.setClientActionCreator(fetchUserRes.user._client))];
            case 3:
                _a.sent();
                return [4 /*yield*/, effects_1.call(function (roomId) {
                        return fetchUserRes.user._client.getRoom(roomId);
                    }, action.roomId)];
            case 4:
                fetchRoomRes_1 = _a.sent();
                if (!fetchRoomRes_1.room) return [3 /*break*/, 14];
                return [4 /*yield*/, effects_1.put(room_1.roomFetchRequestSuccessActionCreator(fetchRoomRes_1.room))];
            case 5:
                _a.sent();
                return [4 /*yield*/, effects_1.put(message_1.beforeMessagesFetchActionActionCreator(fetchRoomRes_1.room.messageCount, 20))];
            case 6:
                _a.sent();
                return [4 /*yield*/, effects_1.select()];
            case 7:
                state_1 = _a.sent();
                return [4 /*yield*/, effects_1.call(function () {
                        return fetchRoomRes_1.room.getMessages({
                            limit: state_1.message.messagesLimit,
                            offset: state_1.message.messagesOffset,
                        });
                    })];
            case 8:
                fetchMessageRes = _a.sent();
                if (!fetchMessageRes.messages) return [3 /*break*/, 11];
                return [4 /*yield*/, effects_1.put(message_1.messagesFetchRequestSuccessActionCreator(fetchMessageRes.messages))];
            case 9:
                _a.sent();
                return [4 /*yield*/, effects_1.put(user_1.markAsReadRequestActionCreator(fetchRoomRes_1.room.roomId))];
            case 10:
                _a.sent();
                Scroll.animateScroll.scrollToBottom({ duration: 0 });
                return [3 /*break*/, 13];
            case 11: return [4 /*yield*/, effects_1.put(message_1.messagesFetchRequestFailureActionCreator(fetchMessageRes.error))];
            case 12:
                _a.sent();
                _a.label = 13;
            case 13: return [3 /*break*/, 16];
            case 14: return [4 /*yield*/, effects_1.put(room_1.roomFetchRequestFailureActionCreator(fetchRoomRes_1.error))];
            case 15:
                _a.sent();
                _a.label = 16;
            case 16: return [3 /*break*/, 19];
            case 17: return [4 /*yield*/, effects_1.put(user_1.userFetchRequestFailureActionCreator(fetchUserRes.error))];
            case 18:
                _a.sent();
                _a.label = 19;
            case 19: return [2 /*return*/];
        }
    });
}
function fetchUserAndRoom(action) {
    var fetchUserRes, fetchRoomRes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.call(function (apiKey, apiEndpoint, realtimeEndpoint, userId, accessToken) {
                    return _1.User.auth({
                        apiKey: apiKey,
                        apiEndpoint: apiEndpoint,
                        realtimeEndpoint: realtimeEndpoint,
                        userId: userId,
                        accessToken: accessToken,
                    });
                }, action.apiKey, action.apiEndpoint, action.realtimeEndpoint, action.userId, action.accessToken)];
            case 1:
                fetchUserRes = _a.sent();
                if (!fetchUserRes.user) return [3 /*break*/, 9];
                return [4 /*yield*/, effects_1.put(user_1.userFetchRequestSuccessActionCreator(fetchUserRes.user))];
            case 2:
                _a.sent();
                return [4 /*yield*/, effects_1.put(client_1.setClientActionCreator(fetchUserRes.user._client))];
            case 3:
                _a.sent();
                return [4 /*yield*/, effects_1.call(function (roomId) {
                        return fetchUserRes.user._client.getRoom(roomId);
                    }, action.roomId)];
            case 4:
                fetchRoomRes = _a.sent();
                if (!fetchRoomRes.room) return [3 /*break*/, 6];
                return [4 /*yield*/, effects_1.put(room_1.roomFetchRequestSuccessActionCreator(fetchRoomRes.room))];
            case 5:
                _a.sent();
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, effects_1.put(room_1.roomFetchRequestFailureActionCreator(fetchRoomRes.error))];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8: return [3 /*break*/, 11];
            case 9: return [4 /*yield*/, effects_1.put(user_1.userFetchRequestFailureActionCreator(fetchUserRes.error))];
            case 10:
                _a.sent();
                _a.label = 11;
            case 11: return [2 /*return*/];
        }
    });
}
function assetPostAndSendMessage(action) {
    var state, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.select()];
            case 1:
                state = _a.sent();
                return [4 /*yield*/, effects_1.call(function (file) {
                        return state.user.user.fileUpload(file);
                    }, action.file)];
            case 2:
                res = _a.sent();
                if (!res.asset) return [3 /*break*/, 6];
                return [4 /*yield*/, effects_1.put(asset_1.assetPostRequestSuccessActionCreator(res.asset))];
            case 3:
                _a.sent();
                return [4 /*yield*/, effects_1.put(message_1.createMessageActionCreator('image', {
                        mime: res.asset.mime,
                        sourceUrl: res.asset.sourceUrl,
                    }))];
            case 4:
                _a.sent();
                return [4 /*yield*/, effects_1.put(message_1.messagesSendRequestActionCreator())];
            case 5:
                _a.sent();
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, effects_1.put(asset_1.assetPostRequestFailureActionCreator(res.error))];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}
function updateMessages(action) {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.put(message_1.updateMessagesActionCreator(action.messages))];
            case 1:
                _a.sent();
                Scroll.animateScroll.scrollToBottom({ duration: 300 });
                return [2 /*return*/];
        }
    });
}
function createRoomAndFetchMessages(action) {
    var state, selectContactUserKeys, selectContactUserIds, selectContactUserNames, i, user, existRoomId, i, userRoom, j, user, roomName, i, fetchRoomRes, fetchMessageRes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.select()];
            case 1:
                state = _a.sent();
                selectContactUserKeys = Object.keys(state.user.selectContacts);
                selectContactUserIds = new Array();
                selectContactUserNames = new Array();
                for (i = 0; i < selectContactUserKeys.length; i++) {
                    user = state.user.selectContacts[selectContactUserKeys[i]];
                    selectContactUserIds.push(user.userId);
                    selectContactUserNames.push(user.name);
                }
                if (selectContactUserIds.length === 1) {
                    action.room.type = _1.RoomType.ONE_ON_ONE;
                }
                else {
                    action.room.type = _1.RoomType.PRIVATE_ROOM;
                }
                return [4 /*yield*/, effects_1.put(room_1.roomUpdateTypeActionCreator(action.room.type))];
            case 2:
                _a.sent();
                action.room.userIds = selectContactUserIds;
                existRoomId = '';
                if (!(action.room.type === _1.RoomType.ONE_ON_ONE)) return [3 /*break*/, 3];
                // exist check
                for (i = 0; i < state.user.userRooms.length; i++) {
                    userRoom = state.user.userRooms[i];
                    if (userRoom.type === _1.RoomType.ONE_ON_ONE) {
                        for (j = 0; j < userRoom.users.length; j++) {
                            user = userRoom.users[j];
                            if (user.userId === selectContactUserIds[0]) {
                                existRoomId = user.roomId;
                            }
                        }
                    }
                }
                return [3 /*break*/, 6];
            case 3:
                roomName = state.user.user.name + ', ';
                for (i = 0; i < selectContactUserNames.length; i++) {
                    if (i === selectContactUserNames.length - 1) {
                        roomName += selectContactUserNames[i];
                    }
                    else {
                        roomName += selectContactUserNames[i] + ', ';
                    }
                }
                action.room.name = roomName;
                return [4 /*yield*/, effects_1.put(room_1.roomUpdateNameActionCreator(roomName))];
            case 4:
                _a.sent();
                return [4 /*yield*/, effects_1.put(room_1.roomUpdatePictureUrlActionCreator(utils_1.randomAvatarUrl(state.setting.noAvatarImages)))];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                if (!(action.room.type !== _1.RoomType.ONE_ON_ONE)) return [3 /*break*/, 8];
                return [4 /*yield*/, effects_1.put(style_1.updateStyleActionCreator({
                        modalStyle: {
                            roomCreate: {
                                isDisplay: true,
                            }
                        }
                    }))];
            case 7:
                _a.sent();
                return [2 /*return*/];
            case 8:
                if (!(existRoomId === '')) return [3 /*break*/, 10];
                return [4 /*yield*/, effects_1.call(function (room) {
                        return state.client.client.createRoom(room);
                    }, action.room)];
            case 9:
                fetchRoomRes = _a.sent();
                return [3 /*break*/, 12];
            case 10: return [4 /*yield*/, effects_1.call(function (roomId) {
                    return state.client.client.getRoom(roomId);
                }, existRoomId)];
            case 11:
                fetchRoomRes = _a.sent();
                _a.label = 12;
            case 12:
                if (!fetchRoomRes.room) return [3 /*break*/, 21];
                return [4 /*yield*/, effects_1.put(room_1.roomFetchRequestSuccessActionCreator(fetchRoomRes.room))];
            case 13:
                _a.sent();
                return [4 /*yield*/, effects_1.put(message_1.beforeMessagesFetchActionActionCreator(fetchRoomRes.room.messageCount, 20))];
            case 14:
                _a.sent();
                return [4 /*yield*/, effects_1.call(function () {
                        return fetchRoomRes.room.getMessages({
                            limit: 20,
                            offset: (fetchRoomRes.room.messageCount - 20) < 0 ? 0 : fetchRoomRes.room.messageCount - 20,
                        });
                    })];
            case 15:
                fetchMessageRes = _a.sent();
                if (!fetchMessageRes.messages) return [3 /*break*/, 18];
                return [4 /*yield*/, effects_1.put(message_1.messagesFetchRequestSuccessActionCreator(fetchMessageRes.messages))];
            case 16:
                _a.sent();
                return [4 /*yield*/, effects_1.put(user_1.markAsReadRequestActionCreator(fetchRoomRes.room.roomId))];
            case 17:
                _a.sent();
                Scroll.animateScroll.scrollToBottom({ duration: 0 });
                stores_1.store.dispatch(react_router_redux_1.replace('/messages/' + fetchRoomRes.room.roomId));
                fetchRoomRes.room.subscribeMessage(function (message) {
                    console.info('%c[ReactSwagChat]Receive message(push)', 'color:' + _2.logColor);
                    stores_1.store.dispatch(combined_1.combinedUpdateMessagesActionCreator([message]));
                });
                return [3 /*break*/, 20];
            case 18: return [4 /*yield*/, effects_1.put(message_1.messagesFetchRequestFailureActionCreator(fetchMessageRes.error))];
            case 19:
                _a.sent();
                _a.label = 20;
            case 20: return [3 /*break*/, 23];
            case 21: return [4 /*yield*/, effects_1.put(room_1.roomFetchRequestFailureActionCreator(fetchRoomRes.error))];
            case 22:
                _a.sent();
                _a.label = 23;
            case 23: return [2 /*return*/];
        }
    });
}
function assetPostAndRoomUpdate() {
    var state, updateRoom, postAssetRes, fetchRoomRes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.select()];
            case 1:
                state = _a.sent();
                updateRoom = {
                    name: state.room.updateName,
                };
                if (!state.room.updatePicture) return [3 /*break*/, 6];
                return [4 /*yield*/, effects_1.call(function (file) {
                        return state.user.user.fileUpload(file);
                    }, state.room.updatePicture)];
            case 2:
                postAssetRes = _a.sent();
                if (!postAssetRes.asset) return [3 /*break*/, 4];
                return [4 /*yield*/, effects_1.put(asset_1.assetPostRequestSuccessActionCreator(postAssetRes.asset))];
            case 3:
                _a.sent();
                if (postAssetRes.asset.sourceUrl) {
                    updateRoom.pictureUrl = postAssetRes.asset.sourceUrl;
                }
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, effects_1.put(asset_1.assetPostRequestFailureActionCreator(postAssetRes.error))];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [4 /*yield*/, effects_1.call(function () {
                    return state.room.room.update(updateRoom);
                })];
            case 7:
                fetchRoomRes = _a.sent();
                if (!fetchRoomRes.room) return [3 /*break*/, 9];
                return [4 /*yield*/, effects_1.put(room_1.roomFetchRequestSuccessActionCreator(fetchRoomRes.room))];
            case 8:
                _a.sent();
                return [3 /*break*/, 11];
            case 9: return [4 /*yield*/, effects_1.put(room_1.roomFetchRequestFailureActionCreator(fetchRoomRes.error))];
            case 10:
                _a.sent();
                _a.label = 11;
            case 11: return [4 /*yield*/, effects_1.put(room_1.roomUpdateClearActionCreator())];
            case 12:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
function assetPostAndRoomCreateAndFetchMessages() {
    var state, createRoom, postAssetRes, fetchRoomRes, fetchMessageRes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.select()];
            case 1:
                state = _a.sent();
                createRoom = {
                    userId: state.user.userId,
                    name: state.room.updateName,
                    type: state.room.updateType,
                };
                if (state.user.selectContacts) {
                    createRoom.userIds = Object.keys(state.user.selectContacts);
                }
                if (!state.room.updatePicture) return [3 /*break*/, 7];
                return [4 /*yield*/, effects_1.call(function (file) {
                        return state.user.user.fileUpload(file);
                    }, state.room.updatePicture)];
            case 2:
                postAssetRes = _a.sent();
                if (!postAssetRes.asset) return [3 /*break*/, 4];
                return [4 /*yield*/, effects_1.put(asset_1.assetPostRequestSuccessActionCreator(postAssetRes.asset))];
            case 3:
                _a.sent();
                if (postAssetRes.asset.sourceUrl) {
                    createRoom.pictureUrl = postAssetRes.asset.sourceUrl;
                }
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, effects_1.put(asset_1.assetPostRequestFailureActionCreator(postAssetRes.error))];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                if (state.room.updatePictureUrl) {
                    createRoom.pictureUrl = state.room.updatePictureUrl;
                }
                _a.label = 8;
            case 8: return [4 /*yield*/, effects_1.call(function () {
                    return state.client.client.createRoom(createRoom);
                })];
            case 9:
                fetchRoomRes = _a.sent();
                if (!fetchRoomRes.room) return [3 /*break*/, 18];
                return [4 /*yield*/, effects_1.put(room_1.roomFetchRequestSuccessActionCreator(fetchRoomRes.room))];
            case 10:
                _a.sent();
                return [4 /*yield*/, effects_1.put(message_1.beforeMessagesFetchActionActionCreator(fetchRoomRes.room.messageCount, 20))];
            case 11:
                _a.sent();
                return [4 /*yield*/, effects_1.call(function () {
                        return fetchRoomRes.room.getMessages({
                            limit: 20,
                            offset: (fetchRoomRes.room.messageCount - 20) < 0 ? 0 : fetchRoomRes.room.messageCount - 20,
                        });
                    })];
            case 12:
                fetchMessageRes = _a.sent();
                if (!fetchMessageRes.messages) return [3 /*break*/, 15];
                return [4 /*yield*/, effects_1.put(message_1.messagesFetchRequestSuccessActionCreator(fetchMessageRes.messages))];
            case 13:
                _a.sent();
                return [4 /*yield*/, effects_1.put(user_1.markAsReadRequestActionCreator(fetchRoomRes.room.roomId))];
            case 14:
                _a.sent();
                Scroll.animateScroll.scrollToBottom({ duration: 0 });
                stores_1.store.dispatch(react_router_redux_1.replace('/messages/' + fetchRoomRes.room.roomId));
                fetchRoomRes.room.subscribeMessage(function (message) {
                    console.info('%c[ReactSwagChat]Receive message(push)', 'color:' + _2.logColor);
                    stores_1.store.dispatch(combined_1.combinedUpdateMessagesActionCreator([message]));
                });
                return [3 /*break*/, 17];
            case 15: return [4 /*yield*/, effects_1.put(message_1.messagesFetchRequestFailureActionCreator(fetchMessageRes.error))];
            case 16:
                _a.sent();
                _a.label = 17;
            case 17: return [3 /*break*/, 20];
            case 18: return [4 /*yield*/, effects_1.put(room_1.roomFetchRequestFailureActionCreator(fetchRoomRes.error))];
            case 19:
                _a.sent();
                _a.label = 20;
            case 20: return [4 /*yield*/, effects_1.put(room_1.roomUpdateClearActionCreator())];
            case 21:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
function combinedSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeLatest(combined_1.COMBINED_ROOM_AND_MESSAGES_FETCH_REQUEST, fetchRoomAndMessages)];
            case 1:
                _a.sent();
                return [4 /*yield*/, effects_1.takeLatest(combined_1.COMBINED_USER_AND_ROOM_AND_MESSAGES_FETCH_REQUEST, fetchUserAndRoomAndMessages)];
            case 2:
                _a.sent();
                return [4 /*yield*/, effects_1.takeLatest(combined_1.COMBINED_USER_AND_ROOM_FETCH_REQUEST, fetchUserAndRoom)];
            case 3:
                _a.sent();
                return [4 /*yield*/, effects_1.takeLatest(combined_1.COMBINED_ASSET_POST_AND_SEND_MESSAGE_REQUEST, assetPostAndSendMessage)];
            case 4:
                _a.sent();
                return [4 /*yield*/, effects_1.takeLatest(combined_1.COMBINED_UPDATE_MESSAGES, updateMessages)];
            case 5:
                _a.sent();
                return [4 /*yield*/, effects_1.takeLatest(combined_1.COMBINED_CREATE_ROOM_AND_MESSAGES_FETCH_REQUEST, createRoomAndFetchMessages)];
            case 6:
                _a.sent();
                return [4 /*yield*/, effects_1.takeLatest(combined_1.COMBINED_ASSET_POST_AND_ROOM_UPDATE_REQUEST, assetPostAndRoomUpdate)];
            case 7:
                _a.sent();
                return [4 /*yield*/, effects_1.takeLatest(combined_1.COMBINED_ASSET_POST_AND_ROOM_CREATE_AND_MESSAGES_FETCH_REQUEST, assetPostAndRoomCreateAndFetchMessages)];
            case 8:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.combinedSaga = combinedSaga;
//# sourceMappingURL=combined.js.map