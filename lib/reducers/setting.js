"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setting_1 = require("../actions/setting");
function init() {
    return {
        setting: {},
        roomListTitle: 'Room list',
        roomListTabbar: null,
        noRoomListText: 'No rooms.',
        noRoomListImage: '',
        noMessageText: 'No messages.',
        noMessageImage: '',
        inputMessagePlaceholderText: '',
        roomSettingTitle: 'Settings',
        roomMembersTitle: 'Members',
        selectContactTitle: 'Select Contacts',
        noContactListText: 'No contacts.',
        noContactListImage: '',
        noAvatarImages: [],
        roomListRoutePath: '',
        messageRoutePath: '',
        roomSettingRoutePath: '',
        selectContactRoutePath: '',
    };
}
exports.setting = function (state, action) {
    if (state === void 0) { state = init(); }
    switch (action.type) {
        case setting_1.SET_SETTING:
            return Object.assign({}, state, {
                setting: action.setting,
            });
        case setting_1.SET_ROOM_LIST_TITLE:
            return Object.assign({}, state, {
                roomListTitle: action.roomListTitle,
            });
        case setting_1.SET_ROOM_LIST_TABBAR:
            return Object.assign({}, state, {
                roomListTabbar: action.roomListTabbar,
            });
        case setting_1.SET_NO_ROOM_LIST_TEXT:
            return Object.assign({}, state, {
                noRoomListText: action.noRoomListText,
            });
        case setting_1.SET_NO_ROOM_LIST_IMAGE:
            return Object.assign({}, state, {
                noRoomListImage: action.noRoomListImage,
            });
        case setting_1.SET_NO_MESSAGE_TEXT:
            return Object.assign({}, state, {
                noMessageText: action.noMessageText,
            });
        case setting_1.SET_NO_MESSAGE_IMAGE:
            return Object.assign({}, state, {
                noMessageImage: action.noMessageImage,
            });
        case setting_1.SET_INPUT_MESSAGE_PLACEHOLDER_TEXT:
            return Object.assign({}, state, {
                inputMessagePlaceholderText: action.inputMessagePlaceholderText,
            });
        case setting_1.SET_ROOM_SETTING_TITLE:
            return Object.assign({}, state, {
                roomSettingTitle: action.roomSettingTitle,
            });
        case setting_1.SET_SELECT_CONTACT_TITLE:
            return Object.assign({}, state, {
                selectContactTitle: action.selectContactTitle,
            });
        case setting_1.SET_NO_CONTACT_LIST_TEXT:
            return Object.assign({}, state, {
                noContactListText: action.noContactListText,
            });
        case setting_1.SET_NO_CONTACT_LIST_IMAGE:
            return Object.assign({}, state, {
                noContactListImage: action.noContactListImage,
            });
        case setting_1.SET_NO_AVATAR_IMAGES:
            return Object.assign({}, state, {
                noAvatarImages: action.noAvatarImages,
            });
        case setting_1.SET_ROOM_MENBERS_TITLE:
            return Object.assign({}, state, {
                roomMembersTitle: action.roomMembersTitle,
            });
        case setting_1.SET_ROOM_LIST_ROUTE_PATH:
            return Object.assign({}, state, {
                roomListRoutePath: action.roomListRoutePath,
            });
        case setting_1.SET_MESSAGE_ROUTE_PATH:
            return Object.assign({}, state, {
                messageRoutePath: action.messageRoutePath,
            });
        case setting_1.SET_ROOM_SETTING_ROUTE_PATH:
            return Object.assign({}, state, {
                roomSettingRoutePath: action.roomSettingRoutePath,
            });
        case setting_1.SET_SELECT_CONTACT_ROUTE_PATH:
            return Object.assign({}, state, {
                selectContactRoutePath: action.selectContactRoutePath,
            });
        default:
            return state;
    }
};
//# sourceMappingURL=setting.js.map