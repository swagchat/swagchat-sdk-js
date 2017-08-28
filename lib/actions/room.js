"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROOM_FETCH_REQUEST = 'ROOM_FETCH_REQUEST';
exports.ROOM_FETCH_REQUEST_SUCCESS = 'ROOM_FETCH_REQUEST_SUCCESS';
exports.ROOM_FETCH_REQUEST_FAILURE = 'ROOM_FETCH_REQUEST_FAILURE';
exports.ROOM_UPDATE_REQUEST = 'ROOM_UPDATE_REQUEST';
exports.ROOM_USER_ADD_FETCH_REQUEST = 'ROOM_USER_ADD_FETCH_REQUEST';
exports.ROOM_USER_ADD_FETCH_REQUEST_SUCCESS = 'ROOM_USER_ADD_FETCH_REQUEST_SUCCESS';
exports.ROOM_USER_ADD_FETCH_REQUEST_FAILURE = 'ROOM_USER_ADD_FETCH_REQUEST_FAILURE';
exports.ROOM_USER_REMOVE_FETCH_REQUEST = 'ROOM_USER_REMOVE_FETCH_REQUEST';
exports.ROOM_USER_REMOVE_FETCH_REQUEST_SUCCESS = 'ROOM_USER_REMOVE_FETCH_REQUEST_SUCCESS';
exports.ROOM_USER_REMOVE_FETCH_REQUEST_FAILURE = 'ROOM_USER_REMOVE_FETCH_REQUEST_FAILURE';
exports.ROOM_UPDATE_NAME = 'ROOM_UPDATE_NAME';
exports.ROOM_UPDATE_PICTURE = 'ROOM_UPDATE_PICTURE';
exports.ROOM_UPDATE_PICTURE_URL = 'ROOM_UPDATE_PICTURE_URL';
exports.ROOM_UPDATE_TYPE = 'ROOM_UPDATE_TYPE';
exports.ROOM_UPDATE_CLEAR = 'ROOM_UPDATE_CLEAR';
exports.roomFetchRequestActionCreator = function (roomId) { return ({
    type: exports.ROOM_FETCH_REQUEST,
    roomId: roomId,
}); };
exports.roomFetchRequestSuccessActionCreator = function (room) { return ({
    type: exports.ROOM_FETCH_REQUEST_SUCCESS,
    room: room,
}); };
exports.roomFetchRequestFailureActionCreator = function (problemDetail) { return ({
    type: exports.ROOM_FETCH_REQUEST_FAILURE,
    problemDetail: problemDetail,
}); };
exports.roomUpdateRequestActionCreator = function (putRoom) { return ({
    type: exports.ROOM_UPDATE_REQUEST,
    putRoom: putRoom,
}); };
exports.roomUserAddFetchRequestActionCreator = function (userIds) { return ({
    type: exports.ROOM_USER_ADD_FETCH_REQUEST,
    userIds: userIds,
}); };
exports.roomUserAddFetchRequestSuccessActionCreator = function (roomUsers) { return ({
    type: exports.ROOM_USER_ADD_FETCH_REQUEST_SUCCESS,
    roomUsers: roomUsers,
}); };
exports.roomUserAddFetchRequestFailureActionCreator = function (problemDetail) { return ({
    type: exports.ROOM_USER_ADD_FETCH_REQUEST_FAILURE,
    problemDetail: problemDetail,
}); };
exports.roomUserRemoveFetchRequestActionCreator = function (userIds) { return ({
    type: exports.ROOM_USER_REMOVE_FETCH_REQUEST,
    userIds: userIds,
}); };
exports.roomUserRemoveFetchRequestSuccessActionCreator = function (roomUsers) { return ({
    type: exports.ROOM_USER_REMOVE_FETCH_REQUEST_SUCCESS,
    roomUsers: roomUsers,
}); };
exports.roomUserRemoveFetchRequestFailureActionCreator = function (problemDetail) { return ({
    type: exports.ROOM_USER_REMOVE_FETCH_REQUEST_FAILURE,
    problemDetail: problemDetail,
}); };
exports.roomUpdateNameActionCreator = function (updateName) { return ({
    type: exports.ROOM_UPDATE_NAME,
    updateName: updateName,
}); };
exports.roomUpdatePictureActionCreator = function (updatePicture) { return ({
    type: exports.ROOM_UPDATE_PICTURE,
    updatePicture: updatePicture,
}); };
exports.roomUpdatePictureUrlActionCreator = function (updatePictureUrl) { return ({
    type: exports.ROOM_UPDATE_PICTURE_URL,
    updatePictureUrl: updatePictureUrl,
}); };
exports.roomUpdateTypeActionCreator = function (updateType) { return ({
    type: exports.ROOM_UPDATE_TYPE,
    updateType: updateType,
}); };
exports.roomUpdateClearActionCreator = function () { return ({
    type: exports.ROOM_UPDATE_CLEAR,
}); };
//# sourceMappingURL=room.js.map