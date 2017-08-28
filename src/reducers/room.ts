import { IUserForRoom, IRoomUser } from '../';
import { IRoomState } from '../stores/room';
import {
  IRoomFetchRequestSuccessAction,
  IRoomFetchRequestFailureAction,
  IRoomUserAddFetchRequestSuccessAction,
  IRoomUserAddFetchRequestFailureAction,
  IRoomUserRemoveFetchRequestSuccessAction,
  IRoomUserRemoveFetchRequestFailureAction,
  IRoomUpdateNameAction,
  IRoomUpdatePictureAction,
  IRoomUpdatePictureUrlAction,
  IRoomUpdateTypeAction,
  ROOM_FETCH_REQUEST_SUCCESS,
  ROOM_FETCH_REQUEST_FAILURE,
  ROOM_USER_ADD_FETCH_REQUEST_SUCCESS,
  ROOM_USER_ADD_FETCH_REQUEST_FAILURE,
  ROOM_USER_REMOVE_FETCH_REQUEST_SUCCESS,
  ROOM_USER_REMOVE_FETCH_REQUEST_FAILURE,
  ROOM_UPDATE_NAME,
  ROOM_UPDATE_PICTURE,
  ROOM_UPDATE_PICTURE_URL,
  ROOM_UPDATE_TYPE,
  ROOM_UPDATE_CLEAR,
  RoomActions,
} from '../actions/room';

const getInitialState = (): IRoomState => ({
  roomId: '',
  room: null,
  problemDetail: null,
  roomUsers: null,
  updateName: '',
  updatePicture: null,
  updatePictureUrl: '',
  updateType: 0,
});

export function room(state: IRoomState = getInitialState(), action: RoomActions): IRoomState {
  switch (action.type) {
    case ROOM_FETCH_REQUEST_SUCCESS:
      const roomFetchRequestSuccessAction = <IRoomFetchRequestSuccessAction>action;
      let roomUsers: {[key: string]: IUserForRoom} = {};
      if (roomFetchRequestSuccessAction.room.users) {
        roomFetchRequestSuccessAction.room.users!.map((user: IUserForRoom) => {
          roomUsers[user.userId] = user;
        });
      } else {
        roomUsers = state.roomUsers!;
      }
      return Object.assign(
        {},
        state,
        {
          room: roomFetchRequestSuccessAction.room,
          roomUsers: roomUsers,
        }
      );
    case ROOM_FETCH_REQUEST_FAILURE:
      return Object.assign(
        {},
        state,
        {
          room: null,
          problemDetail: (<IRoomFetchRequestFailureAction>action).problemDetail,
        }
      );
    case ROOM_USER_ADD_FETCH_REQUEST_SUCCESS:
      let addRoomUsers: {[key: string]: IRoomUser} = {};
      (<IRoomUserAddFetchRequestSuccessAction>action).roomUsers!.map((user: IRoomUser) => {
        addRoomUsers[user.userId] = user;
      });
      return Object.assign(
        {},
        state,
        {
          roomUsers: addRoomUsers,
        }
      );
    case ROOM_USER_ADD_FETCH_REQUEST_FAILURE:
      return Object.assign(
        {},
        state,
        {
          problemDetail: (<IRoomUserAddFetchRequestFailureAction>action).problemDetail,
        }
      );
    case ROOM_USER_REMOVE_FETCH_REQUEST_SUCCESS:
      let removeRoomUsers: {[key: string]: IRoomUser} = {};
      for (let roomUser of (<IRoomUserRemoveFetchRequestSuccessAction>action).roomUsers) {
        removeRoomUsers[roomUser.userId] = roomUser;
      }
      return Object.assign(
        {},
        state,
        {
          roomUsers: removeRoomUsers,
        }
      );
    case ROOM_USER_REMOVE_FETCH_REQUEST_FAILURE:
      return Object.assign(
        {},
        state,
        {
          problemDetail: (<IRoomUserRemoveFetchRequestFailureAction>action).problemDetail,
        }
      );
    case ROOM_UPDATE_NAME:
      return Object.assign(
        {},
        state,
        {
          updateName: (<IRoomUpdateNameAction>action).updateName,
        }
      );
    case ROOM_UPDATE_PICTURE:
      return Object.assign(
        {},
        state,
        {
          updatePicture: (<IRoomUpdatePictureAction>action).updatePicture,
        }
      );
    case ROOM_UPDATE_PICTURE_URL:
      return Object.assign(
        {},
        state,
        {
          updatePictureUrl: (<IRoomUpdatePictureUrlAction>action).updatePictureUrl,
        }
      );
    case ROOM_UPDATE_TYPE:
      return Object.assign(
        {},
        state,
        {
          updateType: (<IRoomUpdateTypeAction>action).updateType,
        }
      );
    case ROOM_UPDATE_CLEAR:
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
