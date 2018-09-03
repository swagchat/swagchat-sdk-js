import { UserState } from '../stores/user';
import {
  UserActions,
  FETCH_USER_REQUEST_SUCCESS, FetchUserRequestSuccessAction,
  FETCH_USER_REQUEST_FAILURE, FetchUserRequestFailureAction,
  SET_PROFILE_USER_ID, SetProfileUserIdAction,
  FETCH_PROFILE_USER_REQUEST_SUCCESS, FetchProfileUserRequestSuccessAction,
  FETCH_PROFILE_USER_REQUEST_FAILURE, FetchProfileUserRequestFailureAction,
  CLEAR_PROFILE_USER,
  FETCH_CONTACTS_REQUEST_SUCCESS, FetchContactsRequestSuccessAction,
  FETCH_CONTACTS_REQUEST_FAILURE, FetchContactsRequestFailureAction,
  UPDATE_SELECT_CONTACTS, UpdateSelectContactsAction,
  CLEAR_SELECT_CONTACTS,
  MARK_AS_READ_REQUEST_SUCCESS,
  MARK_AS_READ_REQUEST_FAILURE, MarkAsReadRequestFailureAction,
  USER_BLOCK_REQUEST_SUCCESS, UserBlockRequestSuccessAction,
  USER_BLOCK_REQUEST_FAILURE, UserBlockRequestFailureAction,
  USER_UNBLOCK_REQUEST_SUCCESS, UserUnBlockRequestSuccessAction,
  USER_UNBLOCK_REQUEST_FAILURE, UserUnBlockRequestFailureAction,
  SET_ON_MESSAGE_RECEIVED, SetOnMessageReceivedAction,
  SET_ON_ROOM_RECEIVED, SetOnRoomReceivedAction,
} from '../actions/user';
import { IUser } from '..';
import * as R from 'ramda';

const getInitialState = (): UserState => ({
  user: null,
  blocks: [],

  // users
  usersAllCount: 0,
  usersLimit: 0,
  usersOffset: 0,
  users: null,

  // contacts
  contacts: null,
  selectedContacts: {},

  profileUserId: '',
  profileUser: null,
  errorResponse: null,

  // event listenner
  onMessageReceived: () => {},
  onRoomReceived: () => {}
});

export function user(state: UserState = getInitialState(), action: UserActions): UserState {
  switch (action.type) {
    case FETCH_USER_REQUEST_SUCCESS:
      const fursAction = action as FetchUserRequestSuccessAction;
      let resUser = R.merge(
        state,
        {user: fursAction.user}
      );
      if (fursAction.user.blockUsers !== undefined) {
        resUser = Object.assign(resUser, {blocks: fursAction.user.blockUsers});
      }
      return resUser;
    case FETCH_USER_REQUEST_FAILURE:
      return R.merge(
        state,
        {
          user: null,
          errorResponse: (action as FetchUserRequestFailureAction).errorResponse,
        }
      );
    case SET_PROFILE_USER_ID:
      return R.merge(
        state,
        {
          profileUserId: (action as SetProfileUserIdAction).profileUserId,
        }
      );
    case FETCH_PROFILE_USER_REQUEST_SUCCESS:
      return R.merge(
        state,
        {
          profileUser: (action as FetchProfileUserRequestSuccessAction).profileUser,
          errorResponse: null,
        }
      );
    case FETCH_PROFILE_USER_REQUEST_FAILURE:
      return R.merge(
        state,
        {
          profileUser: null,
          errorResponse: (action as FetchProfileUserRequestFailureAction).errorResponse,
        }
      );
    case CLEAR_PROFILE_USER:
      return R.merge(
        state,
        {
          profileUser: null,
        }
      );
    case FETCH_CONTACTS_REQUEST_SUCCESS:
      return R.merge(
        state,
        {
          contacts: (<FetchContactsRequestSuccessAction>action).contacts,
        }
      );
    case FETCH_CONTACTS_REQUEST_FAILURE:
      return R.merge(
        state,
        {
          users: null,
          errorResponse: (<FetchContactsRequestFailureAction>action).errorResponse,
        }
      );
    case UPDATE_SELECT_CONTACTS:
      const updateSelectContactsAction = action as UpdateSelectContactsAction;
      const contactUserId = updateSelectContactsAction.contact.userId!;
      let selectedContacts = Object.assign({}, state.selectedContacts) as {[key: string]: IUser};
      if (selectedContacts[contactUserId]) {
        delete selectedContacts[contactUserId];
      } else {
        selectedContacts[contactUserId] = updateSelectContactsAction.contact;
      }
      return R.merge(
        state,
        {
          selectedContacts: selectedContacts,
        }
      );
    case CLEAR_SELECT_CONTACTS:
      return R.merge(
        state,
        {
          selectedContacts: {},
        }
      );
    case MARK_AS_READ_REQUEST_SUCCESS:
      return state;
    case MARK_AS_READ_REQUEST_FAILURE:
      return R.merge(
        state,
        {
          errorResponse: (action as MarkAsReadRequestFailureAction).errorResponse,
        }
      );
    case USER_BLOCK_REQUEST_SUCCESS:
      return R.merge(
        state,
        {
          blocks: (action as UserBlockRequestSuccessAction).blocks,
        }
      );
    case USER_BLOCK_REQUEST_FAILURE:
      return R.merge(
        state,
        {
          user: null,
          errorResponse: (action as UserBlockRequestFailureAction).errorResponse,
        }
      );
    case USER_UNBLOCK_REQUEST_SUCCESS:
      return R.merge(
        state,
        {
          blocks: (action as UserUnBlockRequestSuccessAction).blocks,
        }
      );
    case USER_UNBLOCK_REQUEST_FAILURE:
      return R.merge(
        state,
        {
          user: null,
          errorResponse: (action as UserUnBlockRequestFailureAction).errorResponse,
        }
      );
    case SET_ON_MESSAGE_RECEIVED:
      return R.merge(
        state,
        {
          onMessageReceived: (action as SetOnMessageReceivedAction).onMessageReceived,
        }
      );
    case SET_ON_ROOM_RECEIVED:
      return R.merge(
        state,
        {
          onRoomReceived: (action as SetOnRoomReceivedAction).onRoomReceived,
        }
      );
    default:
      return state;
  }
}
