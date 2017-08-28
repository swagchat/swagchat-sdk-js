"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../actions/user");
var getInitialState = function () { return ({
    apiKey: '',
    apiEndpoint: '',
    realtimeEndpoint: '',
    userId: '',
    accessToken: '',
    user: null,
    userRooms: [],
    users: [],
    contacts: [],
    selectContacts: {},
    blocks: [],
    problemDetail: null,
}); };
function user(state, action) {
    if (state === void 0) { state = getInitialState(); }
    switch (action.type) {
        case user_1.SET_USER_AUTH_PARAMS:
            var setUserAuthParamsAction = action;
            return Object.assign({}, state, {
                apiKey: setUserAuthParamsAction.apiKey,
                apiEndpoint: setUserAuthParamsAction.apiEndpoint,
                realtimeEndpoint: setUserAuthParamsAction.realtimeEndpoint,
                userId: setUserAuthParamsAction.userId,
                accessToken: setUserAuthParamsAction.accessToken,
            });
        case user_1.CONTACTS_FETCH_REQUEST_SUCCESS:
            return Object.assign({}, state, {
                contacts: action.contacts,
            });
        case user_1.CONTACTS_FETCH_REQUEST_FAILURE:
            return Object.assign({}, state, {
                users: null,
                problemDetail: action.problemDetail,
            });
        case user_1.USER_FETCH_REQUEST_SUCCESS:
            var userFetchRequestSuccessAction = action;
            return Object.assign({}, state, {
                user: userFetchRequestSuccessAction.user,
                userRooms: userFetchRequestSuccessAction.user.rooms,
                blocks: userFetchRequestSuccessAction.user.blocks,
            });
        case user_1.USER_FETCH_REQUEST_FAILURE:
            return Object.assign({}, state, {
                user: null,
                problemDetail: action.problemDetail,
            });
        case user_1.MARK_AS_READ_REQUEST_SUCCESS:
            return state;
        case user_1.MARK_AS_READ_REQUEST_FAILURE:
            return Object.assign({}, state, {
                problemDetail: action.problemDetail,
            });
        case user_1.USER_BLOCK_FETCH_REQUEST_SUCCESS:
            return Object.assign({}, state, {
                blocks: action.blocks,
            });
        case user_1.USER_BLOCK_FETCH_REQUEST_FAILURE:
            return Object.assign({}, state, {
                user: null,
                problemDetail: action.problemDetail,
            });
        case user_1.USER_UNBLOCK_FETCH_REQUEST_SUCCESS:
            return Object.assign({}, state, {
                blocks: action.blocks,
            });
        case user_1.USER_UNBLOCK_FETCH_REQUEST_FAILURE:
            return Object.assign({}, state, {
                user: null,
                problemDetail: action.problemDetail,
            });
        case user_1.UPDATE_SELECT_CONTACTS:
            var updateSelectContactsAction = action;
            var contactUserId = updateSelectContactsAction.contact.userId;
            var selectContacts = Object.assign({}, state.selectContacts);
            if (selectContacts[contactUserId]) {
                delete selectContacts[contactUserId];
            }
            else {
                selectContacts[contactUserId] = updateSelectContactsAction.contact;
            }
            return Object.assign({}, state, {
                selectContacts: selectContacts,
            });
        case user_1.CLEAR_SELECT_CONTACTS:
            return Object.assign({}, state, {
                selectContacts: {},
            });
        default:
            return state;
    }
}
exports.user = user;
//# sourceMappingURL=user.js.map