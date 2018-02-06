import { takeLatest, call, put, select, ForkEffect } from 'redux-saga/effects';
import {
  IRoom,
  IMessage,
  IFetchRoomResponse,
  IPostAssetResponse,
  IFetchMessagesResponse,
  RoomType,
  Client,
  ITextPayload,
  setSpeechSynthesisUtteranceActionCreator,
} from '../';
import { replace } from 'react-router-redux';

import { setCurrentRoomActionCreator } from '../actions/client';
import {
  markAsReadRequestActionCreator,
} from  '../actions/user';
import {
  IFetchRoomRequestAction,
  fetchRoomRequestSuccessActionCreator,
  fetchRoomRequestFailureActionCreator,
  clearRoomActionCreator,
  updateRoomNameActionCreator,
  updateRoomPictureUrlActionCreator,
  updateRoomTypeActionCreator,
} from '../actions/room';
import {
  IUploadAssetAndSendMessageRequestAction,
  ICreateRoomAndFetchMessagesRequestAction,
  updateMessagesAndScrollBottomActionCreator,
  FETCH_ROOM_AND_MESSAGES_REQUEST,
  UPLOAD_ASSET_AND_SEND_MESSAGE_REQUEST,
  CREATE_ROOM_AND_FETCH_MESSAGES_REQUEST,
  UPLOAD_ASSET_AND_UPDATE_ROOM_REQUEST,
  UPLOAD_ASSET_AND_CREATE_ROOM_AND_FETCH_MESSAGES_REQUEST,
} from '../actions/combined';
import {
  updateMessagesActionCreator,
  createMessageActionCreator,
  sendMessagesRequestActionCreator,
  beforeFetchMessagesRequestActionCreator,
  fetchMessagesRequestSuccessActionCreator,
  fetchMessagesRequestFailureActionCreator,
} from '../actions/message';
import {
  uploadAssetRequestSuccessActionCreator,
  uploadAssetRequestFailureActionCreator,
} from '../actions/asset';
import { State, store } from '../stores';
import { logColor } from '../';
import { randomAvatarUrl } from '../util';

function* gFetchRoomAndMessagesRequest(action: IFetchRoomRequestAction) {
  const state: State = yield select();
  const roomRes: IFetchRoomResponse = yield call((roomId: string) => {
    return state.client.client!.getRoom(roomId);
  }, action.roomId);
  if (roomRes.room) {
    yield put(setCurrentRoomActionCreator(roomRes.room));
    yield put(fetchRoomRequestSuccessActionCreator(roomRes.room.data));
    yield put(beforeFetchMessagesRequestActionCreator(roomRes.room.messageCount!, 20));
    const fetchMessageRes: IFetchMessagesResponse = yield call(() => {
      return roomRes.room!.getMessages({
        limit: 20,
        offset: (roomRes.room!.messageCount! - 20) < 0 ? 0 : roomRes.room!.messageCount! - 20,
      });
    });
    if (fetchMessageRes.messages) {
      yield put(fetchMessagesRequestSuccessActionCreator(fetchMessageRes.messages!));
      yield put(markAsReadRequestActionCreator(action.roomId));
    } else {
      yield put(fetchMessagesRequestFailureActionCreator(fetchMessageRes.error!));
    }

    let speechSynthesisUtterance: SpeechSynthesisUtterance;
    if (window.speechSynthesis) {
      speechSynthesisUtterance = new SpeechSynthesisUtterance();
      yield put(setSpeechSynthesisUtteranceActionCreator(speechSynthesisUtterance));
    }
    const subMsgFunc = (message: IMessage) => {
      console.info('%c[ReactSwagChat]Receive message(push)', 'color:' + logColor);
      const state: State = store.getState();
      if (window.speechSynthesis && state.message.isSpeechMode && message.userId !== state.user.user!.userId) {
        const payload = message.payload as ITextPayload;
        speechSynthesisUtterance.text = payload.text;
        speechSynthesisUtterance.lang = state.client.client!.user.lang;
        window.speechSynthesis.speak(speechSynthesisUtterance!);
      }
      store.dispatch(updateMessagesActionCreator([message]));
      store.dispatch(markAsReadRequestActionCreator(roomRes.room!.roomId));
    };

    if (Client.CONNECTION && Client.CONNECTION.conn) {
      if (Client.CONNECTION.conn.readyState === Client.CONNECTION.conn.OPEN) {
        roomRes.room!.subscribeMessage(subMsgFunc);
      } else {
        state.client.client!.onConnected = () => {
          roomRes.room!.subscribeMessage(subMsgFunc);
        };
      }
    }
  } else {
    yield put(fetchRoomRequestFailureActionCreator(roomRes.error!));
  }
}

function* gUploadAssetAndSendMessageRequest(action: IUploadAssetAndSendMessageRequestAction) {
  const state: State = yield select();
  const res: IPostAssetResponse = yield call((file: Blob) => {
    return state.client.client!.user.fileUpload(file);
  }, action.file);
  if (res.asset) {
    yield put(uploadAssetRequestSuccessActionCreator(res.asset));
    yield put(createMessageActionCreator('image', {
      mime: res.asset.mime,
      sourceUrl: res.asset.sourceUrl,
    }));
    yield put(sendMessagesRequestActionCreator());
  } else {
    yield put(uploadAssetRequestFailureActionCreator(res.error!));
  }
}

function* gCreateRoomAndFetchMessagesRequest(action: ICreateRoomAndFetchMessagesRequestAction) {
  const state: State = yield select();

  const selectContactUserKeys = Object.keys(state.user.selectContacts);
  let selectContactUserIds = new Array();
  let selectContactUserNames = new Array();
  for (let i = 0; i < selectContactUserKeys.length; i++) {
    let user = state.user.selectContacts[selectContactUserKeys[i]];
    selectContactUserIds.push(user.userId);
    selectContactUserNames.push(user.name);
  }
  if (selectContactUserIds.length === 1) {
    action.room.type = RoomType.ONE_ON_ONE;
  } else {
    action.room.type = RoomType.PRIVATE_ROOM;
  }
  yield put(updateRoomTypeActionCreator(action.room.type));
  action.room.userIds = selectContactUserIds;

  let existRoomId = '';
  if (action.room.type === RoomType.ONE_ON_ONE) {
    // exist check
    for (let i = 0; i < state.user.userRooms.length; i++) {
      let userRoom = state.user.userRooms[i];
      if (userRoom.type === RoomType.ONE_ON_ONE) {
        for (let j = 0; j < userRoom.users.length; j++) {
          let user = userRoom.users[j];
          if (user.userId === selectContactUserIds[0]) {
            existRoomId = user.roomId;
          }
        }
      }
    }
  } else {
    let roomName = state.user.user!.name + ', ';
    for (let i = 0; i < selectContactUserNames.length; i++) {
      if (i === selectContactUserNames.length - 1) {
        roomName += selectContactUserNames[i];
      } else {
        roomName += selectContactUserNames[i] + ', ';
      }
    }
    action.room.name = roomName;
    yield put(updateRoomNameActionCreator(roomName));
    yield put(updateRoomPictureUrlActionCreator(randomAvatarUrl(state.setting.server!.values.noAvatarImages)));
  }

  if (action.room.type !== RoomType.ONE_ON_ONE) {
    return;
  }

  let roomRes: IFetchRoomResponse;
  if (existRoomId === '') {
    roomRes = yield call((room: IRoom) => {
      return state.client.client!.createRoom(room);
    }, action.room);
  } else {
    roomRes = yield call((roomId: string) => {
      return state.client.client!.getRoom(roomId);
    }, existRoomId);
  }

  if (roomRes.room) {
    yield put(fetchRoomRequestSuccessActionCreator(roomRes.room.data));
    yield put(beforeFetchMessagesRequestActionCreator(roomRes.room.messageCount!, 20));
    const fetchMessageRes: IFetchMessagesResponse = yield call(() => {
      return roomRes.room!.getMessages({
        limit: 20,
        offset: (roomRes.room!.messageCount! - 20) < 0 ? 0 : roomRes.room!.messageCount! - 20,
      });
    });
    if (fetchMessageRes.messages) {
      yield put(fetchMessagesRequestSuccessActionCreator(fetchMessageRes.messages!));
      yield put(markAsReadRequestActionCreator(roomRes.room!.roomId!));
      store.dispatch(replace('/messages/' + roomRes.room.roomId));
      roomRes.room!.subscribeMessage((message: IMessage) => {
        console.info('%c[ReactSwagChat]Receive message(push)', 'color:' + logColor);
        store.dispatch(updateMessagesAndScrollBottomActionCreator([message]));
      });
    } else {
      yield put(fetchMessagesRequestFailureActionCreator(fetchMessageRes.error!));
    }
  } else {
    yield put(fetchRoomRequestFailureActionCreator(roomRes.error!));
  }
}

function* gUploadAssetAndUpdateRoomRequest() {
  const state: State = yield select();

  let room: IRoom = {
    roomId: state.room.room!.roomId,
    name: state.room.updateName,
  };

  if (state.room.updatePicture) {
    const state: State = yield select();
    const postAssetRes: IPostAssetResponse = yield call((file: Blob) => {
      return state.client.client!.user.fileUpload(file);
    }, state.room.updatePicture);
    if (postAssetRes.asset) {
      yield put(uploadAssetRequestSuccessActionCreator(postAssetRes.asset));
      if (postAssetRes.asset.sourceUrl) {
        room.pictureUrl = postAssetRes.asset.sourceUrl;
      }
    } else {
      yield put(uploadAssetRequestFailureActionCreator(postAssetRes.error!));
    }
  }
  const roomRes: IFetchRoomResponse = yield call(() => {
    return state.client.currentRoom!.update(room);
  });
  if (roomRes.room) {
    yield put(setCurrentRoomActionCreator(roomRes.room));
    yield put(fetchRoomRequestSuccessActionCreator(roomRes.room.data));
  } else {
    yield put(fetchRoomRequestFailureActionCreator(roomRes.error!));
  }
  yield put(clearRoomActionCreator());
}

function* gUploadAssetAndCreateRoomAndFetchMessagesRequest() {
  const state: State = yield select();

  let createRoom: IRoom = {
    userId: state.client.client!.user.userId,
    name: state.room.updateName,
    type: state.room.updateType,
  };

  if (state.user.selectContacts) {
    createRoom.userIds = Object.keys(state.user.selectContacts);
  }

  if (state.room.updatePicture) {
    const state: State = yield select();
    const postAssetRes: IPostAssetResponse = yield call((file: Blob) => {
      return state.client.client!.user.fileUpload(file);
    }, state.room.updatePicture);
    if (postAssetRes.asset) {
      yield put(uploadAssetRequestSuccessActionCreator(postAssetRes.asset));
      if (postAssetRes.asset.sourceUrl) {
        createRoom.pictureUrl = postAssetRes.asset.sourceUrl;
      }
    } else {
      yield put(uploadAssetRequestFailureActionCreator(postAssetRes.error!));
    }
  } else if (state.room.updatePictureUrl) {
    createRoom.pictureUrl = state.room.updatePictureUrl;
  }

  const roomRes: IFetchRoomResponse = yield call(() => {
    return state.client.client!.createRoom(createRoom);
  });
  if (roomRes.room) {
    yield put(setCurrentRoomActionCreator(roomRes.room));
    yield put(fetchRoomRequestSuccessActionCreator(roomRes.room.data));
    yield put(beforeFetchMessagesRequestActionCreator(roomRes.room!.messageCount!, 20));
    const fetchMessageRes: IFetchMessagesResponse = yield call(() => {
      return roomRes.room!.getMessages({
        limit: 20,
        offset: (roomRes.room!.messageCount! - 20) < 0 ? 0 : roomRes.room!.messageCount! - 20,
      });
    });
    if (fetchMessageRes.messages) {
      yield put(fetchMessagesRequestSuccessActionCreator(fetchMessageRes.messages!));
      yield put(markAsReadRequestActionCreator(roomRes.room!.roomId!));
      store.dispatch(replace('/messages/' + roomRes.room.roomId));
      roomRes.room!.subscribeMessage((message: IMessage) => {
        console.info('%c[ReactSwagChat]Receive message(push)', 'color:' + logColor);
        store.dispatch(updateMessagesAndScrollBottomActionCreator([message]));
      });
    } else {
      yield put(fetchMessagesRequestFailureActionCreator(fetchMessageRes.error!));
    }
  } else {
    yield put(fetchRoomRequestFailureActionCreator(roomRes.error!));
  }
  yield put(clearRoomActionCreator());
}

export function* combinedSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(FETCH_ROOM_AND_MESSAGES_REQUEST, gFetchRoomAndMessagesRequest);
  yield takeLatest(CREATE_ROOM_AND_FETCH_MESSAGES_REQUEST, gCreateRoomAndFetchMessagesRequest);
  yield takeLatest(UPLOAD_ASSET_AND_SEND_MESSAGE_REQUEST, gUploadAssetAndSendMessageRequest);
  yield takeLatest(UPLOAD_ASSET_AND_UPDATE_ROOM_REQUEST, gUploadAssetAndUpdateRoomRequest);
  yield takeLatest(UPLOAD_ASSET_AND_CREATE_ROOM_AND_FETCH_MESSAGES_REQUEST, gUploadAssetAndCreateRoomAndFetchMessagesRequest);
}
