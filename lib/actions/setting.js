"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SET_SETTING = 'SET_SETTING';
exports.SET_ROOM_LIST_TITLE = 'SET_ROOM_LIST_TITLE';
exports.SET_ROOM_LIST_TABBAR = 'SET_ROOM_LIST_TABBAR';
exports.SET_NO_ROOM_LIST_TEXT = 'SET_NO_ROOM_LIST_TEXT';
exports.SET_NO_ROOM_LIST_IMAGE = 'SET_NO_ROOM_LIST_IMAGE';
exports.SET_NO_MESSAGE_TEXT = 'SET_NO_MESSAGE_TEXT';
exports.SET_NO_MESSAGE_IMAGE = 'SET_NO_MESSAGE_IMAGE';
exports.SET_INPUT_MESSAGE_PLACEHOLDER_TEXT = 'SET_INPUT_MESSAGE_PLACEHOLDER_TEXT';
exports.SET_ROOM_SETTING_TITLE = 'SET_ROOM_SETTING_TITLE';
exports.SET_ROOM_MENBERS_TITLE = 'SET_ROOM_MENBERS_TITLE';
exports.SET_SELECT_CONTACT_TITLE = 'SET_SELECT_CONTACT_TITLE';
exports.SET_NO_CONTACT_LIST_TEXT = 'SET_NO_CONTACT_LIST_TEXT';
exports.SET_NO_CONTACT_LIST_IMAGE = 'SET_NO_CONTACT_LIST_IMAGE';
exports.SET_ROOM_LIST_ROUTE_PATH = 'SET_ROOM_LIST_ROUTE_PATH';
exports.SET_NO_AVATAR_IMAGES = 'SET_NO_AVATAR_IMAGES';
exports.SET_MESSAGE_ROUTE_PATH = 'SET_MESSAGE_ROUTE_PATH';
exports.SET_ROOM_SETTING_ROUTE_PATH = 'SET_ROOM_SETTING_ROUTE_PATH';
exports.SET_SELECT_CONTACT_ROUTE_PATH = 'SET_SELECT_CONTACT_ROUTE_PATH';
exports.setSettingActionCreator = function (setting) { return ({
    type: exports.SET_SETTING,
    setting: setting,
}); };
exports.setRoomListTitleActionCreator = function (roomListTitle) { return ({
    type: exports.SET_ROOM_LIST_TITLE,
    roomListTitle: roomListTitle,
}); };
exports.setRoomListTabbarActionCreator = function (roomListTabbar) { return ({
    type: exports.SET_ROOM_LIST_TABBAR,
    roomListTabbar: roomListTabbar,
}); };
exports.setNoRoomListTextActionCreator = function (noRoomListText) { return ({
    type: exports.SET_NO_ROOM_LIST_TEXT,
    noRoomListText: noRoomListText,
}); };
exports.setNoRoomListImageActionCreator = function (noRoomListImage) { return ({
    type: exports.SET_NO_ROOM_LIST_IMAGE,
    noRoomListImage: noRoomListImage,
}); };
exports.setNoMessageTextActionCreator = function (noMessageText) { return ({
    type: exports.SET_NO_MESSAGE_TEXT,
    noMessageText: noMessageText,
}); };
exports.setNoMessageImageActionCreator = function (noMessageImage) { return ({
    type: exports.SET_NO_MESSAGE_IMAGE,
    noMessageImage: noMessageImage,
}); };
exports.setInputMessagePlaceholderTextActionCreator = function (inputMessagePlaceholderText) { return ({
    type: exports.SET_INPUT_MESSAGE_PLACEHOLDER_TEXT,
    inputMessagePlaceholderText: inputMessagePlaceholderText,
}); };
exports.setRoomSettingTitleActionCreator = function (roomSettingTitle) { return ({
    type: exports.SET_ROOM_SETTING_TITLE,
    roomSettingTitle: roomSettingTitle,
}); };
exports.setRoomMembersTitleActionCreator = function (roomMembersTitle) { return ({
    type: exports.SET_ROOM_MENBERS_TITLE,
    roomMembersTitle: roomMembersTitle,
}); };
exports.setSelectContactTitleActionCreator = function (selectContactTitle) { return ({
    type: exports.SET_SELECT_CONTACT_TITLE,
    selectContactTitle: selectContactTitle,
}); };
exports.setNoContactListTextActionCreator = function (noContactListText) { return ({
    type: exports.SET_NO_ROOM_LIST_TEXT,
    noContactListText: noContactListText,
}); };
exports.setNoContactListImageActionCreator = function (noContactListImage) { return ({
    type: exports.SET_NO_ROOM_LIST_IMAGE,
    noContactListImage: noContactListImage,
}); };
exports.setNoAvatarImagesActionCreator = function (noAvatarImages) { return ({
    type: exports.SET_NO_AVATAR_IMAGES,
    noAvatarImages: noAvatarImages,
}); };
exports.setRoomListRoutePathActionCreator = function (roomListRoutePath) { return ({
    type: exports.SET_ROOM_LIST_ROUTE_PATH,
    roomListRoutePath: roomListRoutePath,
}); };
exports.setMessageRoutePathActionCreator = function (messageRoutePath) { return ({
    type: exports.SET_MESSAGE_ROUTE_PATH,
    messageRoutePath: messageRoutePath,
}); };
exports.setRoomSettingRoutePathActionCreator = function (roomSettingRoutePath) { return ({
    type: exports.SET_ROOM_SETTING_ROUTE_PATH,
    roomSettingRoutePath: roomSettingRoutePath,
}); };
exports.setSelectContactRoutePathActionCreator = function (selectContactRoutePath) { return ({
    type: exports.SET_SELECT_CONTACT_ROUTE_PATH,
    selectContactRoutePath: selectContactRoutePath,
}); };
//# sourceMappingURL=setting.js.map