"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SET_USER_AUTH_PARAMS = 'SET_USER_AUTH_PARAMS';
exports.USER_AUTH_REQUEST = 'USER_AUTH_REQUEST';
exports.CONTACTS_FETCH_REQUEST = 'CONTACTS_FETCH_REQUEST';
exports.CONTACTS_FETCH_REQUEST_SUCCESS = 'CONTACTS_FETCH_REQUEST_SUCCESS';
exports.CONTACTS_FETCH_REQUEST_FAILURE = 'CONTACTS_FETCH_REQUEST_FAILURE';
exports.USER_FETCH_REQUEST = 'USER_FETCH_REQUEST';
exports.USER_FETCH_REQUEST_SUCCESS = 'USER_FETCH_REQUEST_SUCCESS';
exports.USER_FETCH_REQUEST_FAILURE = 'USER_FETCH_REQUEST_FAILURE';
exports.MARK_AS_READ_REQUEST = 'MARK_AS_READ_REQUEST';
exports.MARK_AS_READ_REQUEST_SUCCESS = 'MARK_AS_READ_REQUEST_SUCCESS';
exports.MARK_AS_READ_REQUEST_FAILURE = 'MARK_AS_READ_REQUEST_FAILURE';
exports.USER_BLOCK_FETCH_REQUEST = 'USER_BLOCK_FETCH_REQUEST';
exports.USER_BLOCK_FETCH_REQUEST_SUCCESS = 'USER_BLOCK_FETCH_REQUEST_SUCCESS';
exports.USER_BLOCK_FETCH_REQUEST_FAILURE = 'USER_BLOCK_FETCH_REQUEST_FAILURE';
exports.USER_UNBLOCK_FETCH_REQUEST = 'USER_UNBLOCK_FETCH_REQUEST';
exports.USER_UNBLOCK_FETCH_REQUEST_SUCCESS = 'USER_UNBLOCK_FETCH_REQUEST_SUCCESS';
exports.USER_UNBLOCK_FETCH_REQUEST_FAILURE = 'USER_UNBLOCK_FETCH_REQUEST_FAILURE';
exports.UPDATE_SELECT_CONTACTS = 'UPDATE_SELECT_CONTACTS';
exports.CLEAR_SELECT_CONTACTS = 'CLEAR_SELECT_CONTACTS';
exports.setUserAuthParamsActionCreator = function (apiKey, apiEndpoint, realtimeEndpoint, userId, accessToken) { return ({
    type: exports.SET_USER_AUTH_PARAMS,
    apiKey: apiKey,
    apiEndpoint: apiEndpoint,
    realtimeEndpoint: realtimeEndpoint,
    userId: userId,
    accessToken: accessToken,
}); };
exports.userAuthRequestActionCreator = function () { return ({
    type: exports.USER_AUTH_REQUEST,
}); };
exports.contactsFetchRequestActionCreator = function () { return ({
    type: exports.CONTACTS_FETCH_REQUEST,
}); };
exports.contactsFetchRequestSuccessActionCreator = function (contacts) { return ({
    type: exports.CONTACTS_FETCH_REQUEST_SUCCESS,
    contacts: contacts,
}); };
exports.contactsFetchRequestFailureActionCreator = function (problemDetail) { return ({
    type: exports.CONTACTS_FETCH_REQUEST_FAILURE,
    problemDetail: problemDetail,
}); };
exports.userFetchRequestActionCreator = function (userId, accessToken) { return ({
    type: exports.USER_FETCH_REQUEST,
    userId: userId,
    accessToken: accessToken,
}); };
exports.userFetchRequestSuccessActionCreator = function (user) { return ({
    type: exports.USER_FETCH_REQUEST_SUCCESS,
    user: user,
}); };
exports.userFetchRequestFailureActionCreator = function (problemDetail) { return ({
    type: exports.USER_FETCH_REQUEST_FAILURE,
    problemDetail: problemDetail,
}); };
exports.markAsReadRequestActionCreator = function (roomId) { return ({
    type: exports.MARK_AS_READ_REQUEST,
    roomId: roomId,
}); };
exports.markAsReadRequestSuccessActionCreator = function () { return ({
    type: exports.MARK_AS_READ_REQUEST_SUCCESS,
}); };
exports.markAsReadRequestFailureActionCreator = function (problemDetail) { return ({
    type: exports.MARK_AS_READ_REQUEST_FAILURE,
    problemDetail: problemDetail,
}); };
exports.userBlockFetchRequestActionCreator = function (blockUserIds) { return ({
    type: exports.USER_BLOCK_FETCH_REQUEST,
    blockUserIds: blockUserIds,
}); };
exports.userBlockFetchRequestSuccessActionCreator = function (blocks) { return ({
    type: exports.USER_BLOCK_FETCH_REQUEST_SUCCESS,
    blocks: blocks,
}); };
exports.userBlockFetchRequestFailureActionCreator = function (problemDetail) { return ({
    type: exports.USER_BLOCK_FETCH_REQUEST_FAILURE,
    problemDetail: problemDetail,
}); };
exports.userUnBlockFetchRequestActionCreator = function (blockUserIds) { return ({
    type: exports.USER_UNBLOCK_FETCH_REQUEST,
    blockUserIds: blockUserIds,
}); };
exports.userUnBlockFetchRequestSuccessActionCreator = function (blocks) { return ({
    type: exports.USER_UNBLOCK_FETCH_REQUEST_SUCCESS,
    blocks: blocks,
}); };
exports.userUnBlockFetchRequestFailureActionCreator = function (problemDetail) { return ({
    type: exports.USER_UNBLOCK_FETCH_REQUEST_FAILURE,
    problemDetail: problemDetail,
}); };
exports.updateSelectContactsActionCreator = function (contact) { return ({
    type: exports.UPDATE_SELECT_CONTACTS,
    contact: contact,
}); };
exports.clearSelectContactsActionCreator = function () { return ({
    type: exports.CLEAR_SELECT_CONTACTS,
}); };
//# sourceMappingURL=user.js.map