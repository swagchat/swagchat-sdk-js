import { takeLatest, call, put, select, ForkEffect } from 'redux-saga/effects';
import {
  IUser, IRoom, IPostAssetResponse, IFetchUserResponse, IFetchRoomResponse, RoomType,
  generateRoomName, isUrl, cookieUserIdKey, cookieRoomIdKey,
} from '../';
import { setClientActionCreator } from '../actions/client';
import {
  uploadAssetRequestSuccessActionCreator,
  uploadAssetRequestFailureActionCreator,
} from '../actions/asset';
import {
  CREATE_ROOM_AND_FETCH_MESSAGES_REQUEST,
  UPLOAD_ASSET_AND_UPDATE_USER_REQUEST, UploadAssetAndUpdateUserRequestAction,
  UPLOAD_ASSET_AND_UPDATE_ROOM_REQUEST, UploadAssetAndUpdateRoomRequestAction,
  CREATE_GUESTUSER_AND_CREATE_ROOM_AND_FETCH_MESSAGES_REQUEST,
} from '../actions/combined';
import {
  setCurrentRoomIdActionCreator,
  setCurrentRoomNameActionCreator,
  fetchRoomRequestSuccessActionCreator,
  fetchRoomRequestFailureActionCreator,
} from '../actions/room';
import {
  fetchUserRequestActionCreator,
  fetchUserRequestSuccessActionCreator,
  fetchUserRequestFailureActionCreator,
} from '../actions/user';
import { State } from '../stores';
import { Cookie } from '../utils/cookie';

function* gCreateRoomAndFetchMessagesRequest() {
  const state: State = yield select();
  const selectedContactUserIds = Object.keys(state.user.selectedContacts);

  if (selectedContactUserIds.length < 1) {
    return;
  }

  let roomType = RoomType.PRIVATE_ROOM;
  if (selectedContactUserIds.length === 1) {
    roomType = RoomType.ONE_ON_ONE;
  }

  let existRoomId = '';
  if (roomType === RoomType.ONE_ON_ONE && Object.keys(state.user.userRooms!).length > 0) {
    // exist check
    for (let roomId of Object.keys(state.user.userRooms!)) {
      const userRoom = state.user.userRooms![roomId];
      if (userRoom.type === RoomType.ONE_ON_ONE) {
        for (let user of userRoom.users) {
          const targetUserId = selectedContactUserIds[0];
          if (user.userId === targetUserId) {
            existRoomId = userRoom.roomId;
            yield put(setCurrentRoomIdActionCreator(userRoom.roomId));
            yield put(setCurrentRoomNameActionCreator(userRoom.name));
            return;
          }
        }
      }
    }
  }

  let room = {
    userId: state.user.user!.userId,
    type: roomType,
    userIds: selectedContactUserIds,
  } as IRoom;

  const roomRes = yield call((room: IRoom) => {
    return state.client.client!.createRoom(room);
  }, room);
  if (roomRes.room !== null) {
    yield put(fetchUserRequestActionCreator(false));
    yield put(setCurrentRoomNameActionCreator(roomRes.room.name === '' ?
      generateRoomName(roomRes.room.users, state.user.user!.userId, roomRes.room.type) : roomRes.room.name));
    yield put(setCurrentRoomIdActionCreator(roomRes.room.roomId!));
  }
}

function* gUploadAssetAndUpdateUserRequest(action: UploadAssetAndUpdateUserRequestAction) {
  const state: State = yield select();

  let user: IUser = {
    userId: state.user.user!.userId,
    name: action.userName,
  };

  if (action.file !== null && action.file !== undefined) {
    const assetRes: IPostAssetResponse = yield call((file: File, mime: string) => {
      return state.client.client!.fileUpload(file, mime);
    }, action.file, action.mime);
    if (assetRes.asset) {
      yield put(uploadAssetRequestSuccessActionCreator(assetRes.asset));
      user.pictureUrl = assetRes.asset.url;
    } else {
      yield put(uploadAssetRequestFailureActionCreator(assetRes.error!));
    }
  }

  const userRes: IFetchUserResponse = yield call(() => {
    return state.client.client!.update(user);
  });
  if (userRes.user) {
    yield put(fetchUserRequestSuccessActionCreator(userRes.user, undefined, undefined));
  } else {
    yield put(fetchUserRequestFailureActionCreator(userRes.error!));
  }
}

function* gUploadAssetAndUpdateRoomRequest(action: UploadAssetAndUpdateRoomRequestAction) {
  const state: State = yield select();

  let room: IRoom = {
    name: action.roomName,
  };

  if (action.file !== null && action.file !== undefined) {
    const assetRes: IPostAssetResponse = yield call((file: File, mime: string) => {
      return state.client.client!.fileUpload(file, mime);
    }, action.file, action.mime);
    if (assetRes.asset) {
      yield put(uploadAssetRequestSuccessActionCreator(assetRes.asset));
      let url = assetRes.asset.url;
      if (!isUrl(assetRes.asset.url)) {
        url = assetRes.asset.assetId + '.' + assetRes.asset.extension;
      }
      room.pictureUrl = url;
    } else {
      yield put(uploadAssetRequestFailureActionCreator(assetRes.error!));
    }
  }

  const roomRes: IFetchRoomResponse = yield call(() => {
    return state.room.room!.update(room);
  });
  if (roomRes.room) {
    yield put(fetchRoomRequestSuccessActionCreator(roomRes.room));
    yield put(setCurrentRoomNameActionCreator(roomRes.room.name === '' ?
      generateRoomName(roomRes.room.users!, state.user.user!.userId, roomRes.room.type) : roomRes.room.name));
  } else {
    yield put(fetchRoomRequestFailureActionCreator(roomRes.error!));
  }
}

function* gCreateGuestuserAndCreateRoomAndFetchMessagesRequest() {
  const state: State = yield select();

  const cookie = new Cookie();
  const userId = cookie.read(cookieUserIdKey);
  const roomId = cookie.read(cookieRoomIdKey);

  let wasCreatedNow = false;
  let client = Object.assign(state.client.client!);
  if (userId === '' || userId === null) {
    const userRes = yield call(() => {
      return client.createGuestUser();
    });
    if (userRes.user !== null) {
      client.userId = userRes.user.userId;
      client.username = userRes.user.name;
      client.accessToken = userRes.user.accessToken;
      client.socketOpen();
      yield put(setClientActionCreator(client));
      yield put(fetchUserRequestActionCreator(false));
      cookie.write(cookieUserIdKey, userRes.user.userId);
      wasCreatedNow = true;
    } else {
      return;
    }
  } else {
    const userRes = yield call(() => {
      return client.getGuestUser(userId);
    });
    if (userRes.user !== null) {
      client.userId = userRes.user.userId;
      client.username = userRes.user.name;
      client.accessToken = userRes.user.accessToken;
      client.socketOpen();
      yield put(setClientActionCreator(client));
      yield put(fetchUserRequestActionCreator(false));
    } else {
      cookie.remove(cookieUserIdKey);
      return;
    }
  }

  if (wasCreatedNow || roomId === '' || roomId === null) {
    cookie.remove(cookieRoomIdKey);
    let room = {
      name: client.guestChatRoomName,
      userId: client.userId,
      type: RoomType.CUSTOMER_ROOM,
    } as IRoom;

    const roomRes = yield call((room: IRoom) => {
      return client.createRoom(room);
    }, room);
    if (roomRes.room !== null) {
      yield put(setCurrentRoomNameActionCreator(roomRes.room.name));
      yield put(setCurrentRoomIdActionCreator(roomRes.room.roomId));
      cookie.write(cookieRoomIdKey, roomRes.room.roomId);
    }
  } else {
    const roomRes = yield call(() => {
      return client.getRoom(roomId);
    });
    if (roomRes.room !== null) {
      yield put(setCurrentRoomNameActionCreator(roomRes.room.name));
      yield put(setCurrentRoomIdActionCreator(roomRes.room.roomId));
    } else {
      cookie.remove(cookieRoomIdKey);
    }
  }
}

export function* combinedSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(CREATE_ROOM_AND_FETCH_MESSAGES_REQUEST, gCreateRoomAndFetchMessagesRequest);
  yield takeLatest(UPLOAD_ASSET_AND_UPDATE_USER_REQUEST, gUploadAssetAndUpdateUserRequest);
  yield takeLatest(UPLOAD_ASSET_AND_UPDATE_ROOM_REQUEST, gUploadAssetAndUpdateRoomRequest);
  yield takeLatest(CREATE_GUESTUSER_AND_CREATE_ROOM_AND_FETCH_MESSAGES_REQUEST, gCreateGuestuserAndCreateRoomAndFetchMessagesRequest);
}