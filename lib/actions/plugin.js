"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SET_PLUGIN_MESSAGE = 'SET_PLUGIN_MESSAGE';
exports.SET_CUSTOM_PLUGIN_MESSAGE = 'SET_CUSTOM_PLUGIN_MESSAGE';
exports.PLUGIN_MESSAGE_UPDATE_MENU_INDEX = 'UPDATE_MENU_INDEX';
exports.SET_PLUGIN_ROOM_LIST_ITEM = 'SET_PLUGIN_ROOM_LIST_ITEM';
exports.SET_CUSTOM_PLUGIN_ROOM_LIST_ITEM = 'SET_CUSTOM_PLUGIN_ROOM_LIST_ITEM';
exports.setPluginMessageActionCreator = function (messages) { return ({
    type: exports.SET_PLUGIN_MESSAGE,
    messages: messages,
}); };
exports.setCustomPluginMessageActionCreator = function (customMessages) { return ({
    type: exports.SET_CUSTOM_PLUGIN_MESSAGE,
    customMessages: customMessages,
}); };
exports.pluginMessageUpdateMenuIndexActionCreator = function (currentMenuIndex) { return ({
    type: exports.PLUGIN_MESSAGE_UPDATE_MENU_INDEX,
    currentMenuIndex: currentMenuIndex,
}); };
exports.setPluginRoomListItemActionCreator = function (roomListItems) { return ({
    type: exports.SET_PLUGIN_ROOM_LIST_ITEM,
    roomListItems: roomListItems,
}); };
exports.setCustomPluginRoomListItemActionCreator = function (customRoomListItems) { return ({
    type: exports.SET_CUSTOM_PLUGIN_ROOM_LIST_ITEM,
    customRoomListItems: customRoomListItems,
}); };
//# sourceMappingURL=plugin.js.map