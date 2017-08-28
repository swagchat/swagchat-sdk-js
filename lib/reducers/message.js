"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("../");
var message_1 = require("../actions/message");
var stores_1 = require("../stores");
var getInitialState = function () { return ({
    messagesAllCount: 0,
    messagesLimit: 0,
    messagesOffset: 0,
    messages: {},
    problemDetail: null,
    createMessages: [],
}); };
function message(state, action) {
    if (state === void 0) { state = getInitialState(); }
    switch (action.type) {
        case message_1.BEFORE_MESSAGES_FETCH:
            var beforeMessagesFetchAction = action;
            var beforeLimit = beforeMessagesFetchAction.messagesLimit;
            var beforeOffset = beforeMessagesFetchAction.messagesAllCount - beforeMessagesFetchAction.messagesLimit;
            if (beforeOffset < 0) {
                beforeLimit = beforeMessagesFetchAction.messagesAllCount;
                beforeOffset = 0;
            }
            return Object.assign({}, state, {
                messagesAllCount: beforeMessagesFetchAction.messagesAllCount,
                messagesLimit: beforeLimit,
                messagesOffset: beforeOffset,
            });
        case message_1.MESSAGES_FETCH_REQUEST_SUCCESS:
            if (state.messagesAllCount === 0) {
                return state;
            }
            var newLimit = state.messagesLimit;
            var newOffset = state.messagesOffset - state.messagesLimit;
            if (newOffset < 0) {
                newLimit = state.messagesOffset;
                newOffset = 0;
            }
            var messagesFetchAction = action;
            var tmpMessages_1 = {};
            messagesFetchAction.messages.messages.map(function (message) {
                tmpMessages_1[message.messageId] = message;
            });
            var newMessages = Object.assign(tmpMessages_1, state.messages);
            return Object.assign({}, state, {
                messages: newMessages,
                messagesLimit: newLimit,
                messagesOffset: newOffset,
            });
        case message_1.MESSAGES_FETCH_REQUEST_FAILURE:
            return Object.assign({}, state, {
                user: null,
                problemDetail: action.problemDetail,
            });
        case message_1.CREATE_MESSAGE:
            var createMessageAction = action;
            var rootState = stores_1.store.getState();
            var message_2 = _1.createMessage(rootState.room.room.roomId, rootState.user.user.userId, createMessageAction.messageType, createMessageAction.payload);
            var createMessages = state.createMessages.slice();
            createMessages.push(message_2);
            return Object.assign({}, state, {
                createMessages: createMessages,
            });
        case message_1.MESSAGES_SEND_REQUEST_SUCCESS:
            var messagesSendAction = action;
            var tmpAddMessages_1 = {};
            messagesSendAction.messages.map(function (message) {
                tmpAddMessages_1[message.messageId] = message;
            });
            var addMessages = void 0;
            if (state.messages) {
                addMessages = Object.assign(state.messages, tmpAddMessages_1);
            }
            else {
                addMessages = tmpAddMessages_1;
            }
            return Object.assign({}, state, {
                createMessages: [],
                messages: addMessages,
            });
        case message_1.MESSAGES_SEND_REQUEST_FAILURE:
            return Object.assign({}, state, {
                user: null,
                problemDetail: action.problemDetail,
            });
        case message_1.UPDATE_MESSAGES:
            var updateMessageAction = action;
            var tmpUpdateMessages_1 = {};
            updateMessageAction.messages.forEach(function (message) {
                tmpUpdateMessages_1[message.messageId] = message;
            });
            var updateMessages = {};
            if (state.messages) {
                updateMessages = Object.assign(state.messages, tmpUpdateMessages_1);
            }
            else {
                updateMessages = tmpUpdateMessages_1;
            }
            return Object.assign({}, state, {
                messages: updateMessages,
            });
        case message_1.CLEAR_MESSAGES:
            return Object.assign({}, state, {
                messages: null,
                messagesAllCount: 0,
                messagesLimit: 0,
                messagesOffset: 0,
            });
        default:
            return state;
    }
}
exports.message = message;
// case MESSAGES_FETCH:
//   if (state.messagesAllCount === 0) {
//     return state;
//   }
//   let newLimit = state.messagesLimit;
//   let newOffset = state.messagesOffset - state.messagesLimit;
//   if (newOffset < 0) {
//     newLimit = state.messagesOffset;
//     newOffset = 0;
//   }
//   const messagesFetchAction = <IMessagesFetchAction>action;
//   let tmpMessages: {[key: string]: IMessage} = {};
//   messagesFetchAction.messages.messages.map((message: IMessage) => {
//     tmpMessages[message.messageId!] = message;
//   });
//   const newMessages = Object.assign(tmpMessages, state.messages);
//   return Object.assign(
//     {},
//     state,
//     {
//       messagesAllCount: messagesFetchAction.messages.allCount,
//       messages: newMessages,
//       messagesLimit: newLimit,
//       messagesOffset: newOffset,
//     }
//   ); 
//# sourceMappingURL=message.js.map