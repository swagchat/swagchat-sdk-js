import { IUserState } from '../stores/user';
import {
  ISetUserAuthParamsAction,
  IContactsFetchRequestSuccessAction,
  IContactsFetchRequestFailureAction,
  IUserFetchRequestSuccessAction,
  IUserFetchRequestFailureAction,
  IMarkAsReadRequestFailureAction,
  IUserBlockFetchRequestSuccessAction,
  IUserBlockFetchRequestFailureAction,
  IUserUnBlockFetchRequestSuccessAction,
  IUserUnBlockFetchRequestFailureAction,
  IUpdateSelectContactsAction,
  SET_USER_AUTH_PARAMS,
  CONTACTS_FETCH_REQUEST_SUCCESS,
  CONTACTS_FETCH_REQUEST_FAILURE,
  USER_FETCH_REQUEST_SUCCESS,
  USER_FETCH_REQUEST_FAILURE,
  MARK_AS_READ_REQUEST_SUCCESS,
  MARK_AS_READ_REQUEST_FAILURE,
  USER_BLOCK_FETCH_REQUEST_SUCCESS,
  USER_BLOCK_FETCH_REQUEST_FAILURE,
  USER_UNBLOCK_FETCH_REQUEST_SUCCESS,
  USER_UNBLOCK_FETCH_REQUEST_FAILURE,
  UPDATE_SELECT_CONTACTS,
  CLEAR_SELECT_CONTACTS,
  UserActions,
} from '../actions/user';

const getInitialState = (): IUserState => ({
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
});

export function user(state: IUserState = getInitialState(), action: UserActions): IUserState {
  switch (action.type) {
    case SET_USER_AUTH_PARAMS:
      const setUserAuthParamsAction = <ISetUserAuthParamsAction>action;
      return Object.assign(
        {},
        state,
        {
          apiKey: setUserAuthParamsAction.apiKey,
          apiEndpoint: setUserAuthParamsAction.apiEndpoint,
          realtimeEndpoint: setUserAuthParamsAction.realtimeEndpoint,
          userId: setUserAuthParamsAction.userId,
          accessToken: setUserAuthParamsAction.accessToken,
        }
      );
    case CONTACTS_FETCH_REQUEST_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          contacts: (<IContactsFetchRequestSuccessAction>action).contacts,
        }
      );
    case CONTACTS_FETCH_REQUEST_FAILURE:
      return Object.assign(
        {},
        state,
        {
          users: null,
          problemDetail: (<IContactsFetchRequestFailureAction>action).problemDetail,
        }
      );
    case USER_FETCH_REQUEST_SUCCESS:
      const userFetchRequestSuccessAction = <IUserFetchRequestSuccessAction>action;
      return Object.assign(
        {},
        state,
        {
          user: userFetchRequestSuccessAction.user,
          userRooms: userFetchRequestSuccessAction.user.rooms,
          blocks: userFetchRequestSuccessAction.user.blocks,
        }
      );
    case USER_FETCH_REQUEST_FAILURE:
      return Object.assign(
        {},
        state,
        {
          user: null,
          problemDetail: (<IUserFetchRequestFailureAction>action).problemDetail,
        }
      );
    case MARK_AS_READ_REQUEST_SUCCESS:
      return state;
    case MARK_AS_READ_REQUEST_FAILURE:
      return Object.assign(
        {},
        state,
        {
          problemDetail: (<IMarkAsReadRequestFailureAction>action).problemDetail,
        }
      );
    case USER_BLOCK_FETCH_REQUEST_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          blocks: (<IUserBlockFetchRequestSuccessAction>action).blocks,
        }
      );
    case USER_BLOCK_FETCH_REQUEST_FAILURE:
      return Object.assign(
        {},
        state,
        {
          user: null,
          problemDetail: (<IUserBlockFetchRequestFailureAction>action).problemDetail,
        }
      );
    case USER_UNBLOCK_FETCH_REQUEST_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          blocks: (<IUserUnBlockFetchRequestSuccessAction>action).blocks,
        }
      );
    case USER_UNBLOCK_FETCH_REQUEST_FAILURE:
      return Object.assign(
        {},
        state,
        {
          user: null,
          problemDetail: (<IUserUnBlockFetchRequestFailureAction>action).problemDetail,
        }
      );
    case UPDATE_SELECT_CONTACTS:
      const updateSelectContactsAction = <IUpdateSelectContactsAction>action;
      const contactUserId = updateSelectContactsAction.contact.userId;
      let selectContacts = Object.assign({}, state.selectContacts);
      if (selectContacts[contactUserId]) {
        delete selectContacts[contactUserId];
      } else {
        selectContacts[contactUserId] = updateSelectContactsAction.contact;
      }
      return Object.assign(
        {},
        state,
        {
          selectContacts: selectContacts,
        }
      );
    case CLEAR_SELECT_CONTACTS:
      return Object.assign(
        {},
        state,
        {
          selectContacts: {},
        }
      );
    default:
      return state;
  }
}
