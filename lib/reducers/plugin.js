"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var plugin_1 = require("../actions/plugin");
var getInitialState = function () { return ({
    messages: [],
    customMessages: [],
    currentMenuIndex: 0,
    roomListItems: {},
    customRoomListItems: null,
}); };
function plugin(state, action) {
    if (state === void 0) { state = getInitialState(); }
    switch (action.type) {
        case plugin_1.SET_PLUGIN_MESSAGE:
            return Object.assign({}, state, {
                messages: action.messages,
            });
        case plugin_1.SET_CUSTOM_PLUGIN_MESSAGE:
            return Object.assign({}, state, {
                customMessages: action.customMessages,
            });
        case plugin_1.PLUGIN_MESSAGE_UPDATE_MENU_INDEX:
            return Object.assign({}, state, {
                currentMenuIndex: action.currentMenuIndex,
            });
        case plugin_1.SET_PLUGIN_ROOM_LIST_ITEM:
            return Object.assign({}, state, {
                roomListItems: action.roomListItems,
            });
        case plugin_1.SET_CUSTOM_PLUGIN_ROOM_LIST_ITEM:
            return Object.assign({}, state, {
                customRoomListItems: action.customRoomListItems,
            });
        default:
            return state;
    }
}
exports.plugin = plugin;
//# sourceMappingURL=plugin.js.map