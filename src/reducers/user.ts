import { IUserState } from '../stores/user';
import {
  IFetchContactsRequestSuccessAction,
  IFetchContactsRequestFailureAction,
  IFetchUserRequestSuccessAction,
  IFetchUserRequestFailureAction,
  IMarkAsReadRequestFailureAction,
  IUserBlockRequestSuccessAction,
  IUserBlockRequestFailureAction,
  IUserUnBlockRequestSuccessAction,
  IUserUnBlockRequestFailureAction,
  IUpdateSelectContactsAction,
  FETCH_CONTACTS_REQUEST_SUCCESS,
  FETCH_CONTACTS_REQUEST_FAILURE,
  FETCH_USER_REQUEST_SUCCESS,
  FETCH_USER_REQUEST_FAILURE,
  MARK_AS_READ_REQUEST_SUCCESS,
  MARK_AS_READ_REQUEST_FAILURE,
  USER_BLOCK_REQUEST_SUCCESS,
  USER_BLOCK_REQUEST_FAILURE,
  USER_UNBLOCK_REQUEST_SUCCESS,
  USER_UNBLOCK_REQUEST_FAILURE,
  UPDATE_SELECT_CONTACTS,
  CLEAR_SELECT_CONTACTS,
  UserActions,
} from '../actions/user';

const getInitialState = (): IUserState => ({
  user: null,
  userRooms: [],
  users: [],
  contacts: [],
  selectContacts: {},
  blocks: [],
});

export function user(state: IUserState = getInitialState(), action: UserActions): IUserState {
  switch (action.type) {
    case FETCH_CONTACTS_REQUEST_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          contacts: (<IFetchContactsRequestSuccessAction>action).contacts,
        }
      );
    case FETCH_CONTACTS_REQUEST_FAILURE:
      return Object.assign(
        {},
        state,
        {
          users: null,
          problemDetail: (<IFetchContactsRequestFailureAction>action).problemDetail,
        }
      );
    case FETCH_USER_REQUEST_SUCCESS:
      const fursAction = <IFetchUserRequestSuccessAction>action;
      return Object.assign(
        {},
        state,
        {
          user: fursAction.user,
          userRooms: fursAction.user.rooms,
          blocks: fursAction.user.blocks,
        }
      );
    case FETCH_USER_REQUEST_FAILURE:
      return Object.assign(
        {},
        state,
        {
          user: null,
          problemDetail: (<IFetchUserRequestFailureAction>action).problemDetail,
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
    case USER_BLOCK_REQUEST_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          blocks: (<IUserBlockRequestSuccessAction>action).blocks,
        }
      );
    case USER_BLOCK_REQUEST_FAILURE:
      return Object.assign(
        {},
        state,
        {
          user: null,
          problemDetail: (<IUserBlockRequestFailureAction>action).problemDetail,
        }
      );
    case USER_UNBLOCK_REQUEST_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          blocks: (<IUserUnBlockRequestSuccessAction>action).blocks,
        }
      );
    case USER_UNBLOCK_REQUEST_FAILURE:
      return Object.assign(
        {},
        state,
        {
          user: null,
          problemDetail: (<IUserUnBlockRequestFailureAction>action).problemDetail,
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
