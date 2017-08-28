"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMBINED_ROOM_AND_MESSAGES_FETCH_REQUEST = 'COMBINED_ROOM_AND_MESSAGES_FETCH_REQUEST';
exports.COMBINED_USER_AND_ROOM_AND_MESSAGES_FETCH_REQUEST = 'COMBINED_USER_AND_ROOM_AND_MESSAGES_FETCH_REQUEST';
exports.COMBINED_USER_AND_ROOM_FETCH_REQUEST = 'COMBINED_USER_AND_ROOM_FETCH_REQUEST';
exports.COMBINED_ASSET_POST_AND_SEND_MESSAGE_REQUEST = 'COMBINED_ASSET_POST_AND_SEND_MESSAGE_REQUEST';
exports.COMBINED_UPDATE_MESSAGES = 'COMBINED_UPDATE_MESSAGES';
exports.COMBINED_CREATE_ROOM_AND_MESSAGES_FETCH_REQUEST = 'COMBINED_CREATE_ROOM_AND_MESSAGES_FETCH_REQUEST';
exports.COMBINED_ASSET_POST_AND_ROOM_UPDATE_REQUEST = 'COMBINED_ASSET_POST_AND_ROOM_UPDATE_REQUEST';
exports.COMBINED_ASSET_POST_AND_ROOM_CREATE_AND_MESSAGES_FETCH_REQUEST = 'COMBINED_ASSET_POST_AND_ROOM_CREATE_AND_MESSAGES_FETCH_REQUEST';
exports.combinedRoomAndMessagesFetchRequestActionCreator = function (roomId) { return ({
    type: exports.COMBINED_ROOM_AND_MESSAGES_FETCH_REQUEST,
    roomId: roomId,
}); };
exports.combinedUserAndRoomAndMessagesFetchRequestActionCreator = function (apiKey, apiEndpoint, realtimeEndpoint, userId, accessToken, roomId) { return ({
    type: exports.COMBINED_USER_AND_ROOM_AND_MESSAGES_FETCH_REQUEST,
    apiKey: apiKey,
    apiEndpoint: apiEndpoint,
    realtimeEndpoint: realtimeEndpoint,
    userId: userId,
    accessToken: accessToken,
    roomId: roomId,
}); };
exports.combinedUserAndRoomFetchRequestActionCreator = function (apiKey, apiEndpoint, realtimeEndpoint, userId, accessToken, roomId) { return ({
    type: exports.COMBINED_USER_AND_ROOM_FETCH_REQUEST,
    apiKey: apiKey,
    apiEndpoint: apiEndpoint,
    realtimeEndpoint: realtimeEndpoint,
    userId: userId,
    accessToken: accessToken,
    roomId: roomId,
}); };
exports.combinedAssetPostAndSendMessageRequestActionCreator = function (file) { return ({
    type: exports.COMBINED_ASSET_POST_AND_SEND_MESSAGE_REQUEST,
    file: file,
}); };
exports.combinedUpdateMessagesActionCreator = function (messages) { return ({
    type: exports.COMBINED_UPDATE_MESSAGES,
    messages: messages,
}); };
exports.combinedCreateRoomAndMessagesFetchRequestActionCreator = function (room) { return ({
    type: exports.COMBINED_CREATE_ROOM_AND_MESSAGES_FETCH_REQUEST,
    room: room,
}); };
exports.combinedAssetPostAndRoomUpdateRequestActionCreator = function () { return ({
    type: exports.COMBINED_ASSET_POST_AND_ROOM_UPDATE_REQUEST,
}); };
exports.combinedAssetPostAndRoomCreateAndMessageFetchRequestActionCreator = function () { return ({
    type: exports.COMBINED_ASSET_POST_AND_ROOM_CREATE_AND_MESSAGES_FETCH_REQUEST,
}); };
//# sourceMappingURL=combined.js.map