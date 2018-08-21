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
});

export function userRoomsOnline(state: UserRoomsOnlineState = getInitialState(), action: UserRoomsOnlineActions): UserRoomsOnlineState {
  let userRoomsMap: {[key: string]: IMiniRoom};
  let userRooms: IMiniRoom[];

  switch (action.type) {
    case RETRIEVE_USER_ROOMS_ONLINE_REQUEST_SUCCESS:
      const userRoomsResponse = (action as RetrieveUserRoomsOnlineRequestSuccessAction).userRoomsResponse;
      // userRoomsMap = R.clone(state.userRoomsMap);
      // let userRooms = new Array<IMiniRoom>();
      // let j = 0;
      // for (let i = userRoomsResponse.offset!; i < userRoomsResponse.limit!; i++) {
      //   userRooms[i] = userRoomsResponse.rooms[j];
      //   j++;
      // }
      // userRoomsResponse.rooms.forEach(room => {
      //   userRoomsMap[room.roomId!] = room;
      // });
      // Object.keys(userRoomsMap).forEach((roomId: string) => {
      //   userRooms.push(userRoomsMap[roomId]);
      // });

      return Object.assign(
        {},
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
      return Object.assign(
        {},
        state,
        {
          rooms: new Array<IMiniRoom>(),
          errorResponse: (action as RetrieveUserRoomsOnlineRequestFailureAction).errorResponse,
        }
      );
    // case UPDATE_USER_ROOMS_LOADED:
    //   const uurlAction = (action as UpdateUserRoomsLoadedAction);
    //   return Object.assign(
    //     {},
    //     state,
    //     {
    //       userRoomsLoadedRowCount: uurlAction.userRoomsLoadedRowCount,
    //       userRoomsLoadedRowsMap: uurlAction.userRoomsLoadedRowsMap
    //     }
    //   );
    case CLEAR_USER_ROOMS_ONLINE:
      return Object.assign(
        {},
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

      return Object.assign(
        {},
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
