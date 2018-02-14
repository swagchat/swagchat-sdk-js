import { IUserForRoom, IRoomUser } from '../';
import { RoomState } from '../stores/room';
import {
  FetchRoomRequestSuccessAction,
  FetchRoomRequestFailureAction,
  AddRoomUserRequestSuccessAction,
  AddRoomUserRequestFailureAction,
  RemoveRoomUserRequestSuccessAction,
  RemoveRoomUserRequestFailureAction,
  UpdateRoomNameAction,
  UpdateRoomPictureAction,
  UpdateRoomPictureUrlAction,
  UpdateRoomTypeAction,
  FETCH_ROOM_REQUEST_SUCCESS,
  FETCH_ROOM_REQUEST_FAILURE,
  ADD_ROOM_USER_REQUEST_SUCCESS,
  ADD_ROOM_USER_REQUEST_FAILURE,
  REMOVE_ROOM_USER_REQUEST_SUCCESS,
  REMOVE_ROOM_USER_REQUEST_FAILURE,
  UPDATE_ROOM_NAME,
  UPDATE_ROOM_PICTURE,
  UPDATE_ROOM_PICTURE_URL,
  UPDATE_ROOM_TYPE,
  CLEAR_ROOM,
  RoomActions,
} from '../actions/room';

const getInitialState = (): RoomState => ({
  room: null,
  roomUsers: null,
  roomsAllCount: 0,
  roomsLimit: 0,
  roomsOffset: 0,
  rooms: null,
  updateName: '',
  updatePicture: null,
  updatePictureUrl: '',
  updateType: 0,
  problemDetail: null,
});

export function room(state: RoomState = getInitialState(), action: RoomActions): RoomState {
  switch (action.type) {
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
    case UPDATE_ROOM_NAME:
      return Object.assign(
        {},
        state,
        {
          updateName: (action as UpdateRoomNameAction).updateName,
        }
      );
    case UPDATE_ROOM_PICTURE:
      return Object.assign(
        {},
        state,
        {
          updatePicture: (action as UpdateRoomPictureAction).updatePicture,
        }
      );
    case UPDATE_ROOM_PICTURE_URL:
      return Object.assign(
        {},
        state,
        {
          updatePictureUrl: (action as UpdateRoomPictureUrlAction).updatePictureUrl,
        }
      );
    case UPDATE_ROOM_TYPE:
      return Object.assign(
        {},
        state,
        {
          updateType: (action as UpdateRoomTypeAction).updateType,
        }
      );
    case CLEAR_ROOM:
      return Object.assign(
        {},
        state,
        {
          updateName: '',
          updatePicture: null,
          updatePictureUrl: '',
          updateType: 0,
        }
      );
    default:
      return state;
  }
}