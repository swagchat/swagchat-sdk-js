import { IMiniRoom, userRoomList2map } from '..';
import {
    CLEAR_USER_ROOMS_ONLINE, RETRIEVE_USER_ROOMS_ONLINE_REQUEST_FAILURE,
    RETRIEVE_USER_ROOMS_ONLINE_REQUEST_SUCCESS, RetrieveUserRoomsOnlineRequestFailureAction,
    RetrieveUserRoomsOnlineRequestSuccessAction, UPDATE_USER_ROOMS_ONLINE, UpdateUserRoomsOnlineAction,
    UserRoomsOnlineActions
} from '../actions/userRoomsOnline';
import { UserRoomsOnlineState } from '../stores/userRoomsOnline';

const R = require('ramda');

const getInitialState = (): UserRoomsOnlineState => ({
  userRoomsMap: {},
  userRooms: new Array<IMiniRoom>(),
  allCount: 0,
  limit: 0,
  offset: 0,
  errorResponse: null
});

export function userRoomsOnline(state: UserRoomsOnlineState = getInitialState(), action: UserRoomsOnlineActions): UserRoomsOnlineState {
  let userRoomsMap: {[key: string]: IMiniRoom};
  let userRooms: IMiniRoom[];

  switch (action.type) {
    case RETRIEVE_USER_ROOMS_ONLINE_REQUEST_SUCCESS:
      const userRoomsResponse = (action as RetrieveUserRoomsOnlineRequestSuccessAction).userRoomsResponse;
      return R.merge(
        state,
        {
          userRoomsMap: R.merge(userRoomList2map(userRoomsResponse.rooms), state.userRoomsMap),
          userRooms: R.concat(state.userRooms, userRoomsResponse.rooms),
          allCount: userRoomsResponse.allCount,
          limit: userRoomsResponse.limit,
          offset: userRoomsResponse.offset! + userRoomsResponse.limit!,
        }
      );
    case RETRIEVE_USER_ROOMS_ONLINE_REQUEST_FAILURE:
      return R.merge(
        state,
        {
          errorResponse: (action as RetrieveUserRoomsOnlineRequestFailureAction).errorResponse,
        }
      );
    case CLEAR_USER_ROOMS_ONLINE:
      return R.merge(
        state,
        {
          userRoomsMap: null,
          userRooms: new Array<IMiniRoom>(),
          allCount: 0,
          limit: 0,
          offset: 0,
        }
      );
    case UPDATE_USER_ROOMS_ONLINE:
      const uura = (action as UpdateUserRoomsOnlineAction);
      userRoomsMap = R.clone(state.userRoomsMap);
      userRooms = R.clone(state.userRooms);

      uura.userRooms.forEach(userRoom => {
        if (userRoomsMap[userRoom.roomId!]) {
          delete(userRoomsMap[userRoom.roomId!]);
        }
        userRoomsMap[userRoom.roomId!] = userRoom;

        const deleteIndex = R.findIndex(R.propEq('roomId', userRoom.roomId!))(userRooms);
        if (deleteIndex > -1) {
          userRooms = R.remove(deleteIndex, 1, userRooms);
        }
        userRooms = R.insert(0, userRoom, userRooms);
      });

      return R.merge(
        state,
        {
          userRoomsMap,
          userRooms
        }
      );
    default:
      return state;
  }
}
