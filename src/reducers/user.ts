import { UserState } from '../stores/user';
import {
  FetchUserRequestSuccessAction,
  FetchUserRequestFailureAction,
  FetchUsersRequestSuccessAction,
  FetchUsersRequestFailureAction,
  FetchContactsRequestSuccessAction,
  FetchContactsRequestFailureAction,
  UpdateSelectContactsAction,
  FETCH_USER_REQUEST_SUCCESS,
  FETCH_USER_REQUEST_FAILURE,
  FETCH_USERS_REQUEST_SUCCESS,
  FETCH_USERS_REQUEST_FAILURE,
  FETCH_CONTACTS_REQUEST_SUCCESS,
  FETCH_CONTACTS_REQUEST_FAILURE,
  UPDATE_SELECT_CONTACTS,
  CLEAR_SELECT_CONTACTS,
  UserActions,
} from '../actions/user';
import { IUser } from '../';

const getInitialState = (): UserState => ({
  user: null,
  userRooms: null,
  usersAllCount: 0,
  usersLimit: 0,
  usersOffset: 0,
  users: null,
  contacts: null,
  selectedContacts: {},
  blocks: [],
  problemDetail: null,
});

export function user(state: UserState = getInitialState(), action: UserActions): UserState {
  switch (action.type) {
    case FETCH_USER_REQUEST_SUCCESS:
      const fursAction = action as FetchUserRequestSuccessAction;
      return Object.assign(
        {},
        state,
        {
          user: fursAction.user,
          userRooms: fursAction.userRooms,
          blocks: fursAction.user.blocks,
        }
      );
    case FETCH_USER_REQUEST_FAILURE:
      return Object.assign(
        {},
        state,
        {
          user: null,
          problemDetail: (action as FetchUserRequestFailureAction).problemDetail,
        }
      );
    case FETCH_USERS_REQUEST_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          users: (action as FetchUsersRequestSuccessAction).users,
        }
      );
    case FETCH_USERS_REQUEST_FAILURE:
      return Object.assign(
        {},
        state,
        {
          users: null,
          problemDetail: (action as FetchUsersRequestFailureAction).problemDetail,
        }
      );
    case FETCH_CONTACTS_REQUEST_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          contacts: (<FetchContactsRequestSuccessAction>action).contacts,
        }
      );
    case FETCH_CONTACTS_REQUEST_FAILURE:
      return Object.assign(
        {},
        state,
        {
          users: null,
          problemDetail: (<FetchContactsRequestFailureAction>action).problemDetail,
        }
      );
    case UPDATE_SELECT_CONTACTS:
      const updateSelectContactsAction = action as UpdateSelectContactsAction;
      const contactUserId = updateSelectContactsAction.contact.userId;
      let selectedContacts = Object.assign({}, state.selectedContacts) as {[key: string]: IUser};
      // if (Object.keys(selectContacts).length > 0) {}
        if (selectedContacts[contactUserId]) {
          delete selectedContacts[contactUserId];
        } else {
          selectedContacts[contactUserId] = updateSelectContactsAction.contact;
        }
      // }
      return Object.assign(
        {},
        state,
        {
          selectedContacts: selectedContacts,
        }
      );
    case CLEAR_SELECT_CONTACTS:
      return Object.assign(
        {},
        state,
        {
          selectedContacts: {},
        }
      );
    default:
      return state;
  }
}
