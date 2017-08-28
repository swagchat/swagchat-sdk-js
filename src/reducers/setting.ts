import {
  SettingActions,
  SET_SETTING,
  SET_ROOM_LIST_TITLE,
  SET_ROOM_LIST_TABBAR,
  SET_NO_ROOM_LIST_TEXT,
  SET_NO_ROOM_LIST_IMAGE,
  SET_NO_MESSAGE_TEXT,
  SET_NO_MESSAGE_IMAGE,
  SET_INPUT_MESSAGE_PLACEHOLDER_TEXT,
  SET_ROOM_SETTING_TITLE,
  SET_SELECT_CONTACT_TITLE,
  SET_NO_CONTACT_LIST_TEXT,
  SET_NO_CONTACT_LIST_IMAGE,
  SET_NO_AVATAR_IMAGES,
  SET_ROOM_LIST_ROUTE_PATH,
  SET_MESSAGE_ROUTE_PATH,
  SET_ROOM_SETTING_ROUTE_PATH,
  SET_SELECT_CONTACT_ROUTE_PATH,
  SET_ROOM_MENBERS_TITLE,
  ISetSettingAction,
  ISetRoomListTitleAction,
  ISetRoomListTabbarAction,
  ISetNoRoomListTextAction,
  ISetNoRoomListImageAction,
  ISetNoMessageTextAction,
  ISetNoMessageImageAction,
  ISetInputMessagePlaceholderTextAction,
  ISetRoomSettingTitleAction,
  ISetSelectContactTitleAction,
  ISetNoContactListTextAction,
  ISetNoContactListImageAction,
  ISetNoAvatarImagesAction,
  ISetRoomMembersTitleAction,
  ISetRoomListRoutePathAction,
  ISetMessageRoutePathAction,
  ISetRoomSettingRoutePathAction,
  ISetSelectContactRoutePathAction,
} from '../actions/setting';
import { ISettingState } from '../stores/setting';

function init(): ISettingState {
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

export const setting = (state: ISettingState = init(), action: SettingActions) => {
  switch (action.type) {
      case SET_SETTING:
      return Object.assign(
        {},
        state,
        {
          setting: (<ISetSettingAction>action).setting,
        }
      );
      case SET_ROOM_LIST_TITLE:
      return Object.assign(
        {},
        state,
        {
          roomListTitle: (<ISetRoomListTitleAction>action).roomListTitle,
        }
      );
    case SET_ROOM_LIST_TABBAR:
      return Object.assign(
        {},
        state,
        {
          roomListTabbar: (<ISetRoomListTabbarAction>action).roomListTabbar,
        }
      );
    case SET_NO_ROOM_LIST_TEXT:
      return Object.assign(
        {},
        state,
        {
          noRoomListText: (<ISetNoRoomListTextAction>action).noRoomListText,
        }
      );
    case SET_NO_ROOM_LIST_IMAGE:
      return Object.assign(
        {},
        state,
        {
          noRoomListImage: (<ISetNoRoomListImageAction>action).noRoomListImage,
        }
      );
      case SET_NO_MESSAGE_TEXT:
      return Object.assign(
        {},
        state,
        {
          noMessageText: (<ISetNoMessageTextAction>action).noMessageText,
        }
      );
    case SET_NO_MESSAGE_IMAGE:
      return Object.assign(
        {},
        state,
        {
          noMessageImage: (<ISetNoMessageImageAction>action).noMessageImage,
        }
      );
    case SET_INPUT_MESSAGE_PLACEHOLDER_TEXT:
      return Object.assign(
        {},
        state,
        {
          inputMessagePlaceholderText: (<ISetInputMessagePlaceholderTextAction>action).inputMessagePlaceholderText,
        }
      );
    case SET_ROOM_SETTING_TITLE:
      return Object.assign(
        {},
        state,
        {
          roomSettingTitle: (<ISetRoomSettingTitleAction>action).roomSettingTitle,
        }
      );
    case SET_SELECT_CONTACT_TITLE:
      return Object.assign(
        {},
        state,
        {
          selectContactTitle: (<ISetSelectContactTitleAction>action).selectContactTitle,
        }
      );
      case SET_NO_CONTACT_LIST_TEXT:
      return Object.assign(
        {},
        state,
        {
          noContactListText: (<ISetNoContactListTextAction>action).noContactListText,
        }
      );
    case SET_NO_CONTACT_LIST_IMAGE:
      return Object.assign(
        {},
        state,
        {
          noContactListImage: (<ISetNoContactListImageAction>action).noContactListImage,
        }
      );
    case SET_NO_AVATAR_IMAGES:
      return Object.assign(
        {},
        state,
        {
          noAvatarImages: (<ISetNoAvatarImagesAction>action).noAvatarImages,
        }
      );
    case SET_ROOM_MENBERS_TITLE:
      return Object.assign(
        {},
        state,
        {
          roomMembersTitle: (<ISetRoomMembersTitleAction>action).roomMembersTitle,
        }
      );
    case SET_ROOM_LIST_ROUTE_PATH:
      return Object.assign(
        {},
        state,
        {
          roomListRoutePath: (<ISetRoomListRoutePathAction>action).roomListRoutePath,
        }
      );
    case SET_MESSAGE_ROUTE_PATH:
      return Object.assign(
        {},
        state,
        {
          messageRoutePath: (<ISetMessageRoutePathAction>action).messageRoutePath,
        }
      );
    case SET_ROOM_SETTING_ROUTE_PATH:
      return Object.assign(
        {},
        state,
        {
          roomSettingRoutePath: (<ISetRoomSettingRoutePathAction>action).roomSettingRoutePath,
        }
      );
    case SET_SELECT_CONTACT_ROUTE_PATH:
      return Object.assign(
        {},
        state,
        {
          selectContactRoutePath: (<ISetSelectContactRoutePathAction>action).selectContactRoutePath,
        }
      );

      default:
          return state;
  }
};