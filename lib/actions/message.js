"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BEFORE_MESSAGES_FETCH = 'BEFORE_MESSAGES_FETCH';
exports.MESSAGES_FETCH_REQUEST = 'MESSAGES_FETCH_REQUEST';
exports.MESSAGES_FETCH_REQUEST_SUCCESS = 'MESSAGES_FETCH_REQUEST_SUCCESS';
exports.MESSAGES_FETCH_REQUEST_FAILURE = 'MESSAGES_FETCH_REQUEST_FAILURE';
exports.CREATE_MESSAGE = 'CREATE_MESSAGE';
exports.MESSAGES_SEND_REQUEST = 'MESSAGES_SEND_REQUEST';
exports.MESSAGES_SEND_REQUEST_SUCCESS = 'MESSAGES_SEND_REQUEST_SUCCESS';
exports.MESSAGES_SEND_REQUEST_FAILURE = 'MESSAGES_SEND_REQUEST_FAILURE';
exports.UPDATE_MESSAGES = 'UPDATE_MESSAGES';
exports.CLEAR_MESSAGES = 'CLEAR_MESSAGES';
exports.beforeMessagesFetchActionActionCreator = function (messagesAllCount, messagesLimit) { return ({
    type: exports.BEFORE_MESSAGES_FETCH,
    messagesAllCount: messagesAllCount,
    messagesLimit: messagesLimit,
}); };
exports.messagesFetchRequestActionCreator = function () { return ({
    type: exports.MESSAGES_FETCH_REQUEST,
}); };
exports.messagesFetchRequestSuccessActionCreator = function (messages) { return ({
    type: exports.MESSAGES_FETCH_REQUEST_SUCCESS,
    messages: messages,
}); };
exports.messagesFetchRequestFailureActionCreator = function (problemDetail) { return ({
    type: exports.MESSAGES_FETCH_REQUEST_FAILURE,
    problemDetail: problemDetail,
}); };
exports.createMessageActionCreator = function (messageType, payload) { return ({
    type: exports.CREATE_MESSAGE,
    messageType: messageType,
    payload: payload,
}); };
exports.messagesSendRequestActionCreator = function () { return ({
    type: exports.MESSAGES_SEND_REQUEST,
}); };
exports.messageSendRequestSuccessActionCreator = function (messages) { return ({
    type: exports.MESSAGES_SEND_REQUEST_SUCCESS,
    messages: messages,
}); };
exports.messagesSendRequestFailureActionCreator = function (problemDetail) { return ({
    type: exports.MESSAGES_SEND_REQUEST_FAILURE,
    problemDetail: problemDetail,
}); };
exports.sendMessagesActionCreator = function () { return ({
    type: exports.MESSAGES_SEND_REQUEST,
}); };
exports.updateMessagesActionCreator = function (messages) { return ({
    type: exports.UPDATE_MESSAGES,
    messages: messages,
}); };
exports.clearMessagesActionCreator = function () { return ({
    type: exports.CLEAR_MESSAGES
}); };
//# sourceMappingURL=message.js.map