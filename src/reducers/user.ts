import { UserState } from '../stores/user';
import {
  FetchUserRequestSuccessAction,
  FetchUserRequestFailureAction,
  FETCH_USER_REQUEST_SUCCESS,
  FETCH_USER_REQUEST_FAILURE,
  UserActions,
} from '../actions/user';

const getInitialState = (): UserState => ({
  user: null,
  userRooms: null,
  users: [],
  contacts: [],
  selectContacts: {},
  blocks: [],
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
    default:
      return state;
  }
}
