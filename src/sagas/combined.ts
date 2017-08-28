import { takeLatest, call, put, select, ForkEffect } from 'redux-saga/effects';
import {
  User,
  IRoom,
  IMessage,
  IFetchUserResponse,
  IFetchRoomResponse,
  IPostAssetResponse,
  IFetchMessagesResponse,
  RoomType
} from '../';
import * as Scroll from 'react-scroll';
import { replace } from 'react-router-redux';

import {
  setClientActionCreator,
} from '../actions/client';
import {
  userFetchRequestSuccessActionCreator,
  markAsReadRequestActionCreator,
  userFetchRequestFailureActionCreator,
} from  '../actions/user';
import {
  IRoomFetchRequestAction,
  roomFetchRequestSuccessActionCreator,
  roomFetchRequestFailureActionCreator,
  roomUpdateClearActionCreator,
  roomUpdateNameActionCreator,
  roomUpdatePictureUrlActionCreator,
  roomUpdateTypeActionCreator,
} from '../actions/room';
import { updateStyleActionCreator } from '../actions/style';
import {
  ICombinedAssetPostAndSendMessageRequestAction,
  ICombinedUserAndRoomAndMessagesFetchRequestAction,
  ICombinedUserAndRoomFetchRequestAction,
  ICombinedUpdateMessagesAction,
  ICombinedCreateRoomAndMessagesFetchRequestAction,
  combinedUpdateMessagesActionCreator,
  COMBINED_ROOM_AND_MESSAGES_FETCH_REQUEST,
  COMBINED_USER_AND_ROOM_AND_MESSAGES_FETCH_REQUEST,
  COMBINED_USER_AND_ROOM_FETCH_REQUEST,
  COMBINED_ASSET_POST_AND_SEND_MESSAGE_REQUEST,
  COMBINED_UPDATE_MESSAGES,
  COMBINED_CREATE_ROOM_AND_MESSAGES_FETCH_REQUEST,
  COMBINED_ASSET_POST_AND_ROOM_UPDATE_REQUEST,
  COMBINED_ASSET_POST_AND_ROOM_CREATE_AND_MESSAGES_FETCH_REQUEST,
} from '../actions/combined';
import {
  updateMessagesActionCreator,
  createMessageActionCreator,
  messagesSendRequestActionCreator,
  beforeMessagesFetchActionActionCreator,
  messagesFetchRequestSuccessActionCreator,
  messagesFetchRequestFailureActionCreator,
} from '../actions/message';
import {
  assetPostRequestSuccessActionCreator,
  assetPostRequestFailureActionCreator,
} from '../actions/asset';
import { State, store } from '../stores';
import { logColor } from '../';
import { randomAvatarUrl } from '../utils';

function* fetchRoomAndMessages(action: IRoomFetchRequestAction) {
  const state: State = yield select();
  const fetchRoomRes: IFetchRoomResponse = yield call((roomId: string) => {
    return state.client.client!.getRoom(roomId);
  }, action.roomId);
  if (fetchRoomRes.room) {
    yield put(roomFetchRequestSuccessActionCreator(fetchRoomRes.room));
    yield put(beforeMessagesFetchActionActionCreator(fetchRoomRes.room.messageCount, 20));
    const fetchMessageRes: IFetchMessagesResponse = yield call(() => {
      return fetchRoomRes.room!.getMessages({
        limit: 20,
        offset: (fetchRoomRes.room!.messageCount - 20) < 0 ? 0 : fetchRoomRes.room!.messageCount - 20,
      });
    });
    if (fetchMessageRes.messages) {
      yield put(messagesFetchRequestSuccessActionCreator(fetchMessageRes.messages!));
      yield put(markAsReadRequestActionCreator(fetchRoomRes.room.roomId));
      Scroll.animateScroll.scrollToBottom({duration: 0});
    } else {
      yield put(messagesFetchRequestFailureActionCreator(fetchMessageRes.error!));
    }

    const subMsgFunc = (message: IMessage) => {
      console.info('%c[ReactSwagChat]Receive message(push)', 'color:' + logColor);
      store.dispatch(updateMessagesActionCreator([message]));
      Scroll.animateScroll.scrollToBottom({duration: 300});
    };

    if (state.client.client!.connection && state.client.client!.connection.conn) {
      if (state.client.client!.connection.conn.readyState === state.client.client!.connection.conn.OPEN) {
        fetchRoomRes.room!.subscribeMessage(subMsgFunc);
      } else {
        state.client.client!.onConnected = () => {
          fetchRoomRes.room!.subscribeMessage(subMsgFunc);
        };
      }
    }
  } else {
    yield put(roomFetchRequestFailureActionCreator(fetchRoomRes.error!));
  }
}

function* fetchUserAndRoomAndMessages(action: ICombinedUserAndRoomAndMessagesFetchRequestAction) {
  const fetchUserRes: IFetchUserResponse = yield call((apiKey: string, apiEndpoint: string, realtimeEndpoint: string, userId: string, accessToken: string) => {
    return User.auth({
      apiKey: apiKey!,
      apiEndpoint: apiEndpoint!,
      realtimeEndpoint: realtimeEndpoint!,
      userId: userId!,
      accessToken: accessToken!,
    });
  }, action.apiKey, action.apiEndpoint, action.realtimeEndpoint, action.userId, action.accessToken);
  if (fetchUserRes.user) {
    yield put(userFetchRequestSuccessActionCreator(fetchUserRes.user));
    yield put(setClientActionCreator(fetchUserRes.user._client));
    const fetchRoomRes: IFetchRoomResponse = yield call((roomId: string) => {
      return fetchUserRes.user!._client.getRoom(roomId);
    }, action.roomId);
    if (fetchRoomRes.room) {
      yield put(roomFetchRequestSuccessActionCreator(fetchRoomRes.room));
      yield put(beforeMessagesFetchActionActionCreator(fetchRoomRes.room.messageCount, 20));
      const state: State = yield select();
      const fetchMessageRes: IFetchMessagesResponse = yield call(() => {
        return fetchRoomRes.room!.getMessages({
          limit: state.message.messagesLimit,
          offset: state.message.messagesOffset,
        });
      });
      if (fetchMessageRes.messages) {
        yield put(messagesFetchRequestSuccessActionCreator(fetchMessageRes.messages!));
        yield put(markAsReadRequestActionCreator(fetchRoomRes.room.roomId));
        Scroll.animateScroll.scrollToBottom({duration: 0});

        // fetchRoomRes.room.subscribeMessage((message: IMessage) => {
        //   console.info('%c[ReactSwagChat]Receive message(push)', 'color:' + logColor);
        //   store.dispatch(combinedUpdateMessagesActionCreator([message]));
        // });
      } else {
        yield put(messagesFetchRequestFailureActionCreator(fetchMessageRes.error!));
      }
    } else {
      yield put(roomFetchRequestFailureActionCreator(fetchRoomRes.error!));
    }
  } else {
    yield put(userFetchRequestFailureActionCreator(fetchUserRes.error!));
  }
}

function* fetchUserAndRoom(action: ICombinedUserAndRoomFetchRequestAction) {
  const fetchUserRes: IFetchUserResponse = yield call((apiKey: string, apiEndpoint: string, realtimeEndpoint: string, userId: string, accessToken: string) => {
    return User.auth({
      apiKey: apiKey!,
      apiEndpoint: apiEndpoint!,
      realtimeEndpoint: realtimeEndpoint!,
      userId: userId!,
      accessToken: accessToken!,
    });
  }, action.apiKey, action.apiEndpoint, action.realtimeEndpoint, action.userId, action.accessToken);
  if (fetchUserRes.user) {
    yield put(userFetchRequestSuccessActionCreator(fetchUserRes.user));
    yield put(setClientActionCreator(fetchUserRes.user._client));
    const fetchRoomRes: IFetchRoomResponse = yield call((roomId: string) => {
      return fetchUserRes.user!._client.getRoom(roomId);
    }, action.roomId);
    if (fetchRoomRes.room) {
      yield put(roomFetchRequestSuccessActionCreator(fetchRoomRes.room));
    } else {
      yield put(roomFetchRequestFailureActionCreator(fetchRoomRes.error!));
    }
  } else {
    yield put(userFetchRequestFailureActionCreator(fetchUserRes.error!));
  }
}

function* assetPostAndSendMessage(action: ICombinedAssetPostAndSendMessageRequestAction) {
  const state = yield select();
  const res: IPostAssetResponse = yield call((file: Blob) => {
    return state.user.user.fileUpload(file);
  }, action.file);
  if (res.asset) {
    yield put(assetPostRequestSuccessActionCreator(res.asset));
    yield put(createMessageActionCreator('image', {
      mime: res.asset.mime,
      sourceUrl: res.asset.sourceUrl,
    }));
    yield put(messagesSendRequestActionCreator());
  } else {
    yield put(assetPostRequestFailureActionCreator(res.error!));
  }
}

function* updateMessages(action: ICombinedUpdateMessagesAction) {
  yield put(updateMessagesActionCreator(action.messages));
  Scroll.animateScroll.scrollToBottom({duration: 300});
}

function* createRoomAndFetchMessages(action: ICombinedCreateRoomAndMessagesFetchRequestAction) {
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
  yield put(roomUpdateTypeActionCreator(action.room.type));
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
    yield put(roomUpdateNameActionCreator(roomName));
    yield put(roomUpdatePictureUrlActionCreator(randomAvatarUrl(state.setting.noAvatarImages)));
  }

  if (action.room.type !== RoomType.ONE_ON_ONE) {
    yield put(updateStyleActionCreator({
      modalStyle: {
        roomCreate: {
          isDisplay: true,
        }
      }
    }));
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
    yield put(roomFetchRequestSuccessActionCreator(fetchRoomRes.room));
    yield put(beforeMessagesFetchActionActionCreator(fetchRoomRes.room.messageCount, 20));
    const fetchMessageRes: IFetchMessagesResponse = yield call(() => {
      return fetchRoomRes.room!.getMessages({
        limit: 20,
        offset: (fetchRoomRes.room!.messageCount - 20) < 0 ? 0 : fetchRoomRes.room!.messageCount - 20,
      });
    });
    if (fetchMessageRes.messages) {
      yield put(messagesFetchRequestSuccessActionCreator(fetchMessageRes.messages!));
      yield put(markAsReadRequestActionCreator(fetchRoomRes.room.roomId));
      Scroll.animateScroll.scrollToBottom({duration: 0});
      store.dispatch(replace('/messages/' + fetchRoomRes.room.roomId));
      fetchRoomRes.room.subscribeMessage((message: IMessage) => {
        console.info('%c[ReactSwagChat]Receive message(push)', 'color:' + logColor);
        store.dispatch(combinedUpdateMessagesActionCreator([message]));
      });
    } else {
      yield put(messagesFetchRequestFailureActionCreator(fetchMessageRes.error!));
    }
  } else {
    yield put(roomFetchRequestFailureActionCreator(fetchRoomRes.error!));
  }
}

function* assetPostAndRoomUpdate() {
  const state: State = yield select();

  let updateRoom: IRoom = {
    name: state.room.updateName,
  };

  if (state.room.updatePicture) {
    const postAssetRes: IPostAssetResponse = yield call((file: Blob) => {
      return state.user.user!.fileUpload(file);
    }, state.room.updatePicture);
    if (postAssetRes.asset) {
      yield put(assetPostRequestSuccessActionCreator(postAssetRes.asset));
      if (postAssetRes.asset.sourceUrl) {
        updateRoom.pictureUrl = postAssetRes.asset.sourceUrl;
      }
    } else {
      yield put(assetPostRequestFailureActionCreator(postAssetRes.error!));
    }
  }
  const fetchRoomRes: IFetchRoomResponse = yield call(() => {
    return state.room.room!.update(updateRoom);
  });
  if (fetchRoomRes.room) {
    yield put(roomFetchRequestSuccessActionCreator(fetchRoomRes.room));
  } else {
    yield put(roomFetchRequestFailureActionCreator(fetchRoomRes.error!));
  }
  yield put(roomUpdateClearActionCreator());
}

function* assetPostAndRoomCreateAndFetchMessages() {
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
      return state.user.user!.fileUpload(file);
    }, state.room.updatePicture);
    if (postAssetRes.asset) {
      yield put(assetPostRequestSuccessActionCreator(postAssetRes.asset));
      if (postAssetRes.asset.sourceUrl) {
        createRoom.pictureUrl = postAssetRes.asset.sourceUrl;
      }
    } else {
      yield put(assetPostRequestFailureActionCreator(postAssetRes.error!));
    }
  } else if (state.room.updatePictureUrl) {
    createRoom.pictureUrl = state.room.updatePictureUrl;
  }

  const fetchRoomRes: IFetchRoomResponse = yield call(() => {
    return state.client.client!.createRoom(createRoom);
  });
  if (fetchRoomRes.room) {
    yield put(roomFetchRequestSuccessActionCreator(fetchRoomRes.room));
    yield put(beforeMessagesFetchActionActionCreator(fetchRoomRes.room.messageCount, 20));
    const fetchMessageRes: IFetchMessagesResponse = yield call(() => {
      return fetchRoomRes.room!.getMessages({
        limit: 20,
        offset: (fetchRoomRes.room!.messageCount - 20) < 0 ? 0 : fetchRoomRes.room!.messageCount - 20,
      });
    });
    if (fetchMessageRes.messages) {
      yield put(messagesFetchRequestSuccessActionCreator(fetchMessageRes.messages!));
      yield put(markAsReadRequestActionCreator(fetchRoomRes.room.roomId));
      Scroll.animateScroll.scrollToBottom({duration: 0});
      store.dispatch(replace('/messages/' + fetchRoomRes.room.roomId));
      fetchRoomRes.room.subscribeMessage((message: IMessage) => {
        console.info('%c[ReactSwagChat]Receive message(push)', 'color:' + logColor);
        store.dispatch(combinedUpdateMessagesActionCreator([message]));
      });
    } else {
      yield put(messagesFetchRequestFailureActionCreator(fetchMessageRes.error!));
    }
  } else {
    yield put(roomFetchRequestFailureActionCreator(fetchRoomRes.error!));
  }
  yield put(roomUpdateClearActionCreator());
}

export function* combinedSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(COMBINED_ROOM_AND_MESSAGES_FETCH_REQUEST, fetchRoomAndMessages);
  yield takeLatest(COMBINED_USER_AND_ROOM_AND_MESSAGES_FETCH_REQUEST, fetchUserAndRoomAndMessages);
  yield takeLatest(COMBINED_USER_AND_ROOM_FETCH_REQUEST, fetchUserAndRoom);
  yield takeLatest(COMBINED_ASSET_POST_AND_SEND_MESSAGE_REQUEST, assetPostAndSendMessage);
  yield takeLatest(COMBINED_UPDATE_MESSAGES, updateMessages);
  yield takeLatest(COMBINED_CREATE_ROOM_AND_MESSAGES_FETCH_REQUEST, createRoomAndFetchMessages);
  yield takeLatest(COMBINED_ASSET_POST_AND_ROOM_UPDATE_REQUEST, assetPostAndRoomUpdate);
  yield takeLatest(COMBINED_ASSET_POST_AND_ROOM_CREATE_AND_MESSAGES_FETCH_REQUEST, assetPostAndRoomCreateAndFetchMessages);
}
