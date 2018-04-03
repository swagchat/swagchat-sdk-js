import { takeLatest, call, put, select, ForkEffect } from 'redux-saga/effects';
import {
  IFetchMessagesResponse, ISendMessagesResponse, IPostAssetResponse,
  isUrl,
} from '../';
import {
  FETCH_MESSAGES_REQUEST,
  fetchMessagesRequestSuccessActionCreator,
  fetchMessagesRequestFailureActionCreator,
  SEND_MESSAGES_REQUEST, sendMessagesRequestActionCreator,
  sendMessagesRequestSuccessActionCreator,
  sendMessagesRequestFailureActionCreator,
  UPLOAD_ASSET_AND_SEND_MESSAGE_REQUEST, UploadAssetAndSendMessageRequestAction,
  createMessageActionCreator,
} from '../actions/message';
import {
  uploadAssetRequestSuccessActionCreator,
  uploadAssetRequestFailureActionCreator,
} from '../actions/asset';
import { State } from '../stores';
import { date2ISO3339String } from '../util';

function* gFetchMessagesRequest() {
  const state: State  = yield select();
  if (state.room.room === null) {
    return;
  }
  let roomId: string;
  if (state.room.room.roomId === undefined) {
    return;
  } else {
    roomId = state.room.room.roomId;
  }
  const {messages, error}: IFetchMessagesResponse = yield call(() => {
    return state.room.room!.getMessages({
      limit: state.message.messagesLimit,
      offset: state.message.messagesOffset,
    });
  });
  if (error) {
    yield put(fetchMessagesRequestFailureActionCreator(error!));
  } else {
    yield put(fetchMessagesRequestSuccessActionCreator(messages!));
  }
}

function* gSendMessagesRequest() {
  const state: State = yield select();
  const {messageIds, error}: ISendMessagesResponse = yield call(() => {
    return state.client.client!.sendMessages(...state.message.createMessages);
  });
  if (error) {
    yield put(sendMessagesRequestFailureActionCreator(error!));
  } else if (messageIds) {
    let messages = state.message.createMessages.slice();
    for (let i = 0; i < messages.length; i++) {
      messages[i].messageId = messageIds[i];
      messages[i].created = date2ISO3339String(new Date());
    }
    yield put(sendMessagesRequestSuccessActionCreator(messages));
  }
}

function* gUploadAssetAndSendMessageRequest(action: UploadAssetAndSendMessageRequestAction) {
  const state: State = yield select();
  const res: IPostAssetResponse = yield call((file: File) => {
    return state.client.client!.fileUpload(file);
  }, action.file);
  if (res.asset) {
    let url = res.asset.url === undefined ? '' : res.asset.url;
    if (!isUrl(url)) {
      url = res.asset.assetId + '.' + res.asset.extension;
    }
    yield put(uploadAssetRequestSuccessActionCreator(res.asset));
    yield put(createMessageActionCreator(state.room.room!.roomId, state.user.user!.userId, 'image', {
      mime: res.asset.mime,
      sourceUrl: url,
    }));
    yield put(sendMessagesRequestActionCreator());
  } else {
    yield put(uploadAssetRequestFailureActionCreator(res.error!));
  }
}

export function* messageSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(FETCH_MESSAGES_REQUEST, gFetchMessagesRequest);
  yield takeLatest(SEND_MESSAGES_REQUEST, gSendMessagesRequest);
  yield takeLatest(UPLOAD_ASSET_AND_SEND_MESSAGE_REQUEST, gUploadAssetAndSendMessageRequest);
}