import { IUserForRoom, IRoomUser } from '../';
import { IRoomState } from '../stores/room';
import {
  IFetchRoomRequestSuccessAction,
  IFetchRoomRequestFailureAction,
  IAddRoomUserRequestSuccessAction,
  IAddRoomUserRequestFailureAction,
  IRemoveRoomUserRequestSuccessAction,
  IRemoveRoomUserRequestFailureAction,
  IUpdateRoomNameAction,
  IUpdateRoomPictureAction,
  IUpdateRoomPictureUrlAction,
  IUpdateRoomTypeAction,
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

const getInitialState = (): IRoomState => ({
  roomId: '',
  room: null,
  roomUsers: null,
  updateName: '',
  updatePicture: null,
  updatePictureUrl: '',
  updateType: 0,
});

export function room(state: IRoomState = getInitialState(), action: RoomActions): IRoomState {
  switch (action.type) {
    case FETCH_ROOM_REQUEST_SUCCESS:
      const rfrsAction = <IFetchRoomRequestSuccessAction>action;
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
          problemDetail: (<IFetchRoomRequestFailureAction>action).problemDetail,
        }
      );
    case ADD_ROOM_USER_REQUEST_SUCCESS:
      let addRoomUsers: {[key: string]: IRoomUser} = {};
      (<IAddRoomUserRequestSuccessAction>action).roomUsers!.map((user: IRoomUser) => {
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
          problemDetail: (<IAddRoomUserRequestFailureAction>action).problemDetail,
        }
      );
    case REMOVE_ROOM_USER_REQUEST_SUCCESS:
      let removeRoomUsers: {[key: string]: IRoomUser} = {};
      for (let roomUser of (<IRemoveRoomUserRequestSuccessAction>action).roomUsers) {
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
          problemDetail: (<IRemoveRoomUserRequestFailureAction>action).problemDetail,
        }
      );
    case UPDATE_ROOM_NAME:
      return Object.assign(
        {},
        state,
        {
          updateName: (<IUpdateRoomNameAction>action).updateName,
        }
      );
    case UPDATE_ROOM_PICTURE:
      return Object.assign(
        {},
        state,
        {
          updatePicture: (<IUpdateRoomPictureAction>action).updatePicture,
        }
      );
    case UPDATE_ROOM_PICTURE_URL:
      return Object.assign(
        {},
        state,
        {
          updatePictureUrl: (<IUpdateRoomPictureUrlAction>action).updatePictureUrl,
        }
      );
    case UPDATE_ROOM_TYPE:
      return Object.assign(
        {},
        state,
        {
          updateType: (<IUpdateRoomTypeAction>action).updateType,
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
