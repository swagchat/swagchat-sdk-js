import { IUserForRoom, IRoomUser } from '../';
import { RoomState } from '../stores/room';
import {
  RoomActions,
  SET_CURRENT_ROOM_ID, SetCurrentRoomIdAction,
  SET_CURRENT_ROOM_NAME, SetCurrentRoomNameAction,
  FETCH_ROOM_REQUEST_SUCCESS, FetchRoomRequestSuccessAction,
  FETCH_ROOM_REQUEST_FAILURE, FetchRoomRequestFailureAction,
  ADD_ROOM_USER_REQUEST_SUCCESS, AddRoomUserRequestSuccessAction,
  ADD_ROOM_USER_REQUEST_FAILURE, AddRoomUserRequestFailureAction,
  REMOVE_ROOM_USER_REQUEST_SUCCESS, RemoveRoomUserRequestSuccessAction,
  REMOVE_ROOM_USER_REQUEST_FAILURE, RemoveRoomUserRequestFailureAction,
} from '../actions/room';

const getInitialState = (): RoomState => ({
  currentRoomId: '',
  currentRoomName: '',
  room: null,
  roomUsers: null,
  roomsAllCount: 0,
  roomsLimit: 0,
  roomsOffset: 0,
  rooms: null,
  problemDetail: null,
});

export function room(state: RoomState = getInitialState(), action: RoomActions): RoomState {
  switch (action.type) {
    case SET_CURRENT_ROOM_ID:
      return Object.assign(
        {},
        state,
        {
          currentRoomId: (action as SetCurrentRoomIdAction).currentRoomId,
        }
      );
    case SET_CURRENT_ROOM_NAME:
      return Object.assign(
        {},
        state,
        {
          currentRoomName: (action as SetCurrentRoomNameAction).currentRoomName,
        }
      );
    case FETCH_ROOM_REQUEST_SUCCESS:
      const rfrsAction = action as FetchRoomRequestSuccessAction;
      let roomUsers: {[key: string]: IUserForRoom} = {};
      if (rfrsAction.room.users) {
        rfrsAction.room.users!.map((user: IUserForRoom) => {
          roomUsers[user.userId] = user;
        });
      } else {
        roomUsers = state.roomUsers!;
      }
      return Object.assign(
        {},
        state,
        {
          room: rfrsAction.room,
          roomUsers: roomUsers,
        }
      );
    case FETCH_ROOM_REQUEST_FAILURE:
      return Object.assign(
        {},
        state,
        {
          room: null,
          problemDetail: (action as FetchRoomRequestFailureAction).problemDetail,
        }
      );
    case ADD_ROOM_USER_REQUEST_SUCCESS:
      let addRoomUsers: {[key: string]: IRoomUser} = {};
      (action as AddRoomUserRequestSuccessAction).roomUsers!.map((user: IRoomUser) => {
        addRoomUsers[user.userId] = user;
      });
      return Object.assign(
        {},
        state,
        {
          roomUsers: addRoomUsers,
        }
      );
    case ADD_ROOM_USER_REQUEST_FAILURE:
      return Object.assign(
        {},
        state,
        {
          problemDetail: (action as AddRoomUserRequestFailureAction).problemDetail,
        }
      );
    case REMOVE_ROOM_USER_REQUEST_SUCCESS:
      let removeRoomUsers: {[key: string]: IRoomUser} = {};
      for (let roomUser of (action as RemoveRoomUserRequestSuccessAction).roomUsers) {
        removeRoomUsers[roomUser.userId] = roomUser;
      }
      return Object.assign(
        {},
        state,
        {
          roomUsers: removeRoomUsers,
        }
      );
    case REMOVE_ROOM_USER_REQUEST_FAILURE:
      return Object.assign(
        {},
        state,
        {
          problemDetail: (action as RemoveRoomUserRequestFailureAction).problemDetail,
        }
      );
    default:
      return state;
  }
}