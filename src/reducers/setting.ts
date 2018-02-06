import {
  SettingActions,
  FETCH_SETTING_REQUEST_SUCCESS,
  FETCH_SETTING_REQUEST_FAILURE,
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
  IFetchSettingRequestSuccessAction,
  IFetchSettingRequestFailureAction,
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
  ISettingState,
} from '../';

function init(): ISettingState {
  return {
    server: null,
    client: null,
  };
}

export const setting = (state: ISettingState = init(), action: SettingActions) => {
  const server = state.server ? state.client : {};
  const client = state.client ? state.client : {};
  switch (action.type) {
    case FETCH_SETTING_REQUEST_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          server: (<IFetchSettingRequestSuccessAction>action).setting,
        }
      );
    case FETCH_SETTING_REQUEST_FAILURE:
      return Object.assign(
        {},
        state,
        {
          server: {},
          problemDetail: (<IFetchSettingRequestFailureAction>action).problemDetail,
        }
      );
    case SET_SETTING:
      return Object.assign(
        {},
        state,
        {
          server: (<ISetSettingAction>action).setting,
        }
      );
    case SET_ROOM_LIST_TITLE:
      return Object.assign(
        {},
        state,
        Object.assign(
          server,
          {
            roomListTitle: (<ISetRoomListTitleAction>action).roomListTitle,
          },
        ),
      );
    case SET_NO_ROOM_LIST_TEXT:
      return Object.assign(
        {},
        state,
        Object.assign(
          server,
          {
            noRoomListText: (<ISetNoRoomListTextAction>action).noRoomListText,
          },
        ),
      );
    case SET_NO_ROOM_LIST_IMAGE:
      return Object.assign(
        {},
        state,
        Object.assign(
          server,
          {
            noRoomListImage: (<ISetNoRoomListImageAction>action).noRoomListImage,
          },
        ),
      );
    case SET_NO_MESSAGE_TEXT:
      return Object.assign(
        {},
        state,
        Object.assign(
          server,
          {
            noMessageText: (<ISetNoMessageTextAction>action).noMessageText,
          },
        ),
      );
    case SET_NO_MESSAGE_IMAGE:
      return Object.assign(
        {},
        state,
        Object.assign(
          server,
          {
            noMessageImage: (<ISetNoMessageImageAction>action).noMessageImage,
          },
        ),
      );
    case SET_INPUT_MESSAGE_PLACEHOLDER_TEXT:
      return Object.assign(
        {},
        state,
        Object.assign(
          server,
          {
            inputMessagePlaceholderText: (<ISetInputMessagePlaceholderTextAction>action).inputMessagePlaceholderText,
          },
        ),
      );
    case SET_ROOM_SETTING_TITLE:
      return Object.assign(
        {},
        state,
        Object.assign(
          server,
          {
            roomSettingTitle: (<ISetRoomSettingTitleAction>action).roomSettingTitle,
          },
        ),
      );
    case SET_SELECT_CONTACT_TITLE:
      return Object.assign(
        {},
        state,
        Object.assign(
          server,
          {
            selectContactTitle: (<ISetSelectContactTitleAction>action).selectContactTitle,
          },
        ),
      );
      case SET_NO_CONTACT_LIST_TEXT:
      return Object.assign(
        {},
        state,
        Object.assign(
          server,
          {
            noContactListText: (<ISetNoContactListTextAction>action).noContactListText,
          },
        ),
      );
    case SET_NO_CONTACT_LIST_IMAGE:
      return Object.assign(
        {},
        state,
        Object.assign(
          server,
          {
            noContactListImage: (<ISetNoContactListImageAction>action).noContactListImage,
          },
        ),
      );
    case SET_NO_AVATAR_IMAGES:
      return Object.assign(
        {},
        state,
        Object.assign(
          server,
          {
            noAvatarImages: (<ISetNoAvatarImagesAction>action).noAvatarImages,
          },
        ),
      );
    case SET_ROOM_MENBERS_TITLE:
      return Object.assign(
        {},
        state,
        Object.assign(
          server,
          {
            roomMembersTitle: (<ISetRoomMembersTitleAction>action).roomMembersTitle,
          },
        ),
      );
    case SET_ROOM_LIST_ROUTE_PATH:
      return Object.assign(
        {},
        state,
        {
          client: Object.assign(
            client,
            {
              roomListRoutePath: (<ISetRoomListRoutePathAction>action).roomListRoutePath,
            },
          ),
        },
      );
    case SET_MESSAGE_ROUTE_PATH:
      return Object.assign(
        {},
        state,
        {
          client: Object.assign(
            client,
            {
              messageRoutePath: (<ISetMessageRoutePathAction>action).messageRoutePath,
            },
          ),
        },
      );
    case SET_ROOM_SETTING_ROUTE_PATH:
      return Object.assign(
        {},
        state,
        {
          client: Object.assign(
            client,
            {
              roomSettingRoutePath: (<ISetRoomSettingRoutePathAction>action).roomSettingRoutePath,
            },
          ),
        },
      );
    case SET_SELECT_CONTACT_ROUTE_PATH:
      return Object.assign(
        {},
        state,
        {
          client: Object.assign(
            client,
            {
              selectContactRoutePath: (<ISetSelectContactRoutePathAction>action).selectContactRoutePath,
            },
          ),
        },
      );
    case SET_ROOM_LIST_TABBAR:
      return Object.assign(
        {},
        state,
        {
          client: Object.assign(
            client,
            {
              roomListTabbar: (<ISetRoomListTabbarAction>action).roomListTabbar,
            },
          ),
        },
      );
    default:
      return state;
  }
};