import { takeLatest, call, put, select, ForkEffect } from 'redux-saga/effects';
import { updateRoom, getMessages, subscribeMessage } from '../room';
import {
  Client,
  IRoom,
  IMessage,
  IFetchUserResponse,
  IFetchRoomResponse,
  IPostAssetResponse,
  IFetchMessagesResponse,
  RoomType,
  fileUpload,
} from '../';
import * as Scroll from 'react-scroll';
import { replace } from 'react-router-redux';

import {
  setClientActionCreator,
} from '../actions/client';
import {
  fetchUserRequestSuccessActionCreator,
  markAsReadRequestActionCreator,
  fetchUserRequestFailureActionCreator,
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
// import { updateStyleActionCreator } from '../actions/style';
import {
  IUploadAssetAndSendMessageRequestAction,
  IFetchUserAndRoomAndMessagesRequestAction,
  IFetchUserAndRoomRequestAction,
  IUpdateMessagesAndScrollBottomAction,
  ICreateRoomAndFetchMessagesRequestAction,
  updateMessagesAndScrollBottomActionCreator,
  FETCH_ROOM_AND_MESSAGES_REQUEST,
  FETCH_USER_AND_ROOM_AND_MESSAGES_REQUEST,
  FETCH_USER_AND_ROOM_REQUEST,
  UPLOAD_ASSET_AND_SEND_MESSAGE_REQUEST,
  UPDATE_MESSAGES_AND_SCROLL_BOTTOM,
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
import { randomAvatarUrl } from '../utils';

function* gFetchRoomAndMessagesRequest(action: IFetchRoomRequestAction) {
  const state: State = yield select();
  const fetchRoomRes: IFetchRoomResponse = yield call((roomId: string) => {
    return state.client.client!.getRoom(roomId);
  }, action.roomId);
  if (fetchRoomRes.room) {
    yield put(fetchRoomRequestSuccessActionCreator(fetchRoomRes.room));
    yield put(beforeFetchMessagesRequestActionCreator(fetchRoomRes.room.messageCount!, 20));
    const fetchMessageRes: IFetchMessagesResponse = yield call(() => {
      return getMessages(action.roomId, {
        limit: 20,
        offset: (fetchRoomRes.room!.messageCount! - 20) < 0 ? 0 : fetchRoomRes.room!.messageCount! - 20,
      });
    });
    if (fetchMessageRes.messages) {
      yield put(fetchMessagesRequestSuccessActionCreator(fetchMessageRes.messages!));
      yield put(markAsReadRequestActionCreator(action.roomId));
      Scroll.animateScroll.scrollToBottom({duration: 0});
    } else {
      yield put(fetchMessagesRequestFailureActionCreator(fetchMessageRes.error!));
    }

    const subMsgFunc = (message: IMessage) => {
      console.info('%c[ReactSwagChat]Receive message(push)', 'color:' + logColor);
      store.dispatch(updateMessagesActionCreator([message]));
      Scroll.animateScroll.scrollToBottom({duration: 300});
    };

    if (state.client.client!.connection && state.client.client!.connection.conn) {
      if (state.client.client!.connection.conn.readyState === state.client.client!.connection.conn.OPEN) {
        subscribeMessage(action.roomId, subMsgFunc);
      } else {
        state.client.client!.onConnected = () => {
          subscribeMessage(action.roomId, subMsgFunc);
        };
      }
    }
  } else {
    yield put(fetchRoomRequestFailureActionCreator(fetchRoomRes.error!));
  }
}

function* gFetchUserAndRoomAndMessagesRequest(action: IFetchUserAndRoomAndMessagesRequestAction) {
  const state = yield select();
  const fetchUserRes: IFetchUserResponse = yield call((apiKey: string, apiEndpoint: string, realtimeEndpoint: string, userId: string, accessToken: string) => {
    return Client.auth({
      apiKey: apiKey!,
      apiEndpoint: apiEndpoint!,
      realtimeEndpoint: realtimeEndpoint!,
      userId: userId!,
      accessToken: accessToken!,
    });
  }, action.apiKey, action.apiEndpoint, action.realtimeEndpoint, action.userId, action.accessToken);
  if (fetchUserRes.user) {
    yield put(fetchUserRequestSuccessActionCreator(fetchUserRes.user));
    const client = new Client({
      apiKey: state.user.apiKey,
      apiEndpoint: state.user.apiEndpoint,
      realtime: {
        endpoint: state.user.realtimeEndpoint,
      },
      userId: state.user.userId,
      userAccessToken: state.user.accessToken,
    });
    yield put(setClientActionCreator(client));
    const fetchRoomRes: IFetchRoomResponse = yield call((roomId: string) => {
      return client.getRoom(roomId);
    }, action.roomId);
    if (fetchRoomRes.room) {
      yield put(fetchRoomRequestSuccessActionCreator(fetchRoomRes.room));
      yield put(beforeFetchMessagesRequestActionCreator(fetchRoomRes.room.messageCount!, 20));
      const state: State = yield select();
      const fetchMessageRes: IFetchMessagesResponse = yield call(() => {
        return getMessages(action.roomId, {
          limit: state.message.messagesLimit,
          offset: state.message.messagesOffset,
        });
      });
      if (fetchMessageRes.messages) {
        yield put(fetchMessagesRequestSuccessActionCreator(fetchMessageRes.messages!));
        yield put(markAsReadRequestActionCreator(action.roomId));
        Scroll.animateScroll.scrollToBottom({duration: 0});

        // fetchRoomRes.room.subscribeMessage((message: IMessage) => {
        //   console.info('%c[ReactSwagChat]Receive message(push)', 'color:' + logColor);
        //   store.dispatch(combinedUpdateMessagesActionCreator([message]));
        // });
      } else {
        yield put(fetchMessagesRequestFailureActionCreator(fetchMessageRes.error!));
      }
    } else {
      yield put(fetchRoomRequestFailureActionCreator(fetchRoomRes.error!));
    }
  } else {
    yield put(fetchUserRequestFailureActionCreator(fetchUserRes.error!));
  }
}

function* gFetchUserAndRoomRequest(action: IFetchUserAndRoomRequestAction) {
  const state = yield select();
  const fetchUserRes: IFetchUserResponse = yield call((apiKey: string, apiEndpoint: string, realtimeEndpoint: string, userId: string, accessToken: string) => {
    return Client.auth({
      apiKey: apiKey!,
      apiEndpoint: apiEndpoint!,
      realtimeEndpoint: realtimeEndpoint!,
      userId: userId!,
      accessToken: accessToken!,
    });
  }, action.apiKey, action.apiEndpoint, action.realtimeEndpoint, action.userId, action.accessToken);
  if (fetchUserRes.user) {
    yield put(fetchUserRequestSuccessActionCreator(fetchUserRes.user));
    const client = new Client({
      apiKey: state.user.apiKey,
      apiEndpoint: state.user.apiEndpoint,
      realtime: {
        endpoint: state.user.realtimeEndpoint,
      },
      userId: state.user.userId,
      userAccessToken: state.user.accessToken,
    });
    yield put(setClientActionCreator(client));
    const fetchRoomRes: IFetchRoomResponse = yield call((roomId: string) => {
      return client.getRoom(roomId);
    }, action.roomId);
    if (fetchRoomRes.room) {
      yield put(fetchRoomRequestSuccessActionCreator(fetchRoomRes.room));
    } else {
      yield put(fetchRoomRequestFailureActionCreator(fetchRoomRes.error!));
    }
  } else {
    yield put(fetchUserRequestFailureActionCreator(fetchUserRes.error!));
  }
}

function* gUploadAssetAndSendMessageRequest(action: IUploadAssetAndSendMessageRequestAction) {
  const res: IPostAssetResponse = yield call((file: Blob) => {
    return fileUpload(file);
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

function* gUpdateMessagesAndScrollBottom(action: IUpdateMessagesAndScrollBottomAction) {
  yield put(updateMessagesActionCreator(action.messages));
  Scroll.animateScroll.scrollToBottom({duration: 300});
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
    yield put(updateRoomPictureUrlActionCreator(randomAvatarUrl(state.setting.noAvatarImages)));
  }

  if (action.room.type !== RoomType.ONE_ON_ONE) {
    // yield put(updateStyleActionCreator({
    //   modalStyle: {
    //     roomCreate: {
    //       isDisplay: true,
    //     }
    //   }
    // }));
    return;
  }

  let fetchRoomRes: IFetchRoomResponse;
  if (existRoomId === '') {
    fetchRoomRes = yield call((room: IRoom) => {
      return state.client.client!.createRoom(room);
    }, action.room);
  } else {
    fetchRoomRes = yield call((roomId: string) => {
      return state.client.client!.getRoom(roomId);
    }, existRoomId);
  }

  if (fetchRoomRes.room) {
    yield put(fetchRoomRequestSuccessActionCreator(fetchRoomRes.room));
    yield put(beforeFetchMessagesRequestActionCreator(fetchRoomRes.room.messageCount!, 20));
    const fetchMessageRes: IFetchMessagesResponse = yield call(() => {
      return getMessages(fetchRoomRes.room!.roomId!, {
        limit: 20,
        offset: (fetchRoomRes.room!.messageCount! - 20) < 0 ? 0 : fetchRoomRes.room!.messageCount! - 20,
      });
    });
    if (fetchMessageRes.messages) {
      yield put(fetchMessagesRequestSuccessActionCreator(fetchMessageRes.messages!));
      yield put(markAsReadRequestActionCreator(fetchRoomRes.room!.roomId!));
      Scroll.animateScroll.scrollToBottom({duration: 0});
      store.dispatch(replace('/messages/' + fetchRoomRes.room.roomId));
      subscribeMessage(fetchRoomRes.room!.roomId!, (message: IMessage) => {
        console.info('%c[ReactSwagChat]Receive message(push)', 'color:' + logColor);
        store.dispatch(updateMessagesAndScrollBottomActionCreator([message]));
      });
    } else {
      yield put(fetchMessagesRequestFailureActionCreator(fetchMessageRes.error!));
    }
  } else {
    yield put(fetchRoomRequestFailureActionCreator(fetchRoomRes.error!));
  }
}

function* gUploadAssetAndUpdateRoomRequest() {
  const state: State = yield select();

  let room: IRoom = {
    roomId: state.room.room!.roomId,
    name: state.room.updateName,
  };

  if (state.room.updatePicture) {
    const postAssetRes: IPostAssetResponse = yield call((file: Blob) => {
      return fileUpload(file);
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
  const fetchRoomRes: IFetchRoomResponse = yield call(() => {
    return updateRoom(room);
  });
  if (fetchRoomRes.room) {
    yield put(fetchRoomRequestSuccessActionCreator(fetchRoomRes.room));
  } else {
    yield put(fetchRoomRequestFailureActionCreator(fetchRoomRes.error!));
  }
  yield put(clearRoomActionCreator());
}

function* gUploadAssetAndCreateRoomAndFetchMessagesRequest() {
  const state: State = yield select();

  let createRoom: IRoom = {
    userId: state.user.userId,
    name: state.room.updateName,
    type: state.room.updateType,
  };

  if (state.user.selectContacts) {
    createRoom.userIds = Object.keys(state.user.selectContacts);
  }

  if (state.room.updatePicture) {
    const postAssetRes: IPostAssetResponse = yield call((file: Blob) => {
      return fileUpload(file);
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

  const fetchRoomRes: IFetchRoomResponse = yield call(() => {
    return state.client.client!.createRoom(createRoom);
  });
  if (fetchRoomRes.room) {
    yield put(fetchRoomRequestSuccessActionCreator(fetchRoomRes.room));
    yield put(beforeFetchMessagesRequestActionCreator(fetchRoomRes.room!.messageCount!, 20));
    const fetchMessageRes: IFetchMessagesResponse = yield call(() => {
      return getMessages(fetchRoomRes.room!.roomId!, {
        limit: 20,
        offset: (fetchRoomRes.room!.messageCount! - 20) < 0 ? 0 : fetchRoomRes.room!.messageCount! - 20,
      });
    });
    if (fetchMessageRes.messages) {
      yield put(fetchMessagesRequestSuccessActionCreator(fetchMessageRes.messages!));
      yield put(markAsReadRequestActionCreator(fetchRoomRes.room!.roomId!));
      Scroll.animateScroll.scrollToBottom({duration: 0});
      store.dispatch(replace('/messages/' + fetchRoomRes.room.roomId));
      subscribeMessage(fetchRoomRes.room!.roomId!, (message: IMessage) => {
        console.info('%c[ReactSwagChat]Receive message(push)', 'color:' + logColor);
        store.dispatch(updateMessagesAndScrollBottomActionCreator([message]));
      });
    } else {
      yield put(fetchMessagesRequestFailureActionCreator(fetchMessageRes.error!));
    }
  } else {
    yield put(fetchRoomRequestFailureActionCreator(fetchRoomRes.error!));
  }
  yield put(clearRoomActionCreator());
}

export function* combinedSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(FETCH_ROOM_AND_MESSAGES_REQUEST, gFetchRoomAndMessagesRequest);
  yield takeLatest(FETCH_USER_AND_ROOM_AND_MESSAGES_REQUEST, gFetchUserAndRoomAndMessagesRequest);
  yield takeLatest(FETCH_USER_AND_ROOM_REQUEST, gFetchUserAndRoomRequest);
  yield takeLatest(UPLOAD_ASSET_AND_SEND_MESSAGE_REQUEST, gUploadAssetAndSendMessageRequest);
  yield takeLatest(UPDATE_MESSAGES_AND_SCROLL_BOTTOM, gUpdateMessagesAndScrollBottom);
  yield takeLatest(CREATE_ROOM_AND_FETCH_MESSAGES_REQUEST, gCreateRoomAndFetchMessagesRequest);
  yield takeLatest(UPLOAD_ASSET_AND_UPDATE_ROOM_REQUEST, gUploadAssetAndUpdateRoomRequest);
  yield takeLatest(UPLOAD_ASSET_AND_CREATE_ROOM_AND_FETCH_MESSAGES_REQUEST, gUploadAssetAndCreateRoomAndFetchMessagesRequest);
}
