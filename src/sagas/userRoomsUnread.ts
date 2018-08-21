import { call, ForkEffect, put, select, takeLatest } from 'redux-saga/effects';

import { IRetrieveUserRoomsRequest } from '..';
import {
    RETRIEVE_USER_ROOMS_UNREAD_REQUEST, RetrieveUserRoomsUnreadRequestAction,
    retrieveUserRoomsUnreadRequestFailureActionCreator, retrieveUserRoomsUnreadRequestSuccessActionCreator
} from '../actions/userRoomsUnread';
import { IRetrieveUserRoomsResponse } from '../interface';
import { State } from '../stores';
import { UserRoomsFilter } from '../const';

function* gRetrieveUserRoomsUnreadRequest(action: RetrieveUserRoomsUnreadRequestAction) {
  const state: State = yield select();
  const user = state.user;
  const userRoomsUnread = state.userRoomsUnread;
  const res: IRetrieveUserRoomsResponse = yield call(() => {
    const req = {
      userId: user.user!.userId,
      limit: action.limit !== undefined ? action.limit : state.client.client!.settings.roomListPagingCount,
      offset: action.offset !== undefined ? action.offset : userRoomsUnread.offset,
      filter: UserRoomsFilter.UNREAD
    } as IRetrieveUserRoomsRequest;
    return user.user!.retrieveRooms(req);
  });
  if (res.error) {
    yield put(retrieveUserRoomsUnreadRequestFailureActionCreator(res.error));
  } else {
    yield put(retrieveUserRoomsUnreadRequestSuccessActionCreator(res.userRoomsResponse!));
  }
}

export function* userRoomsUnreadSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(RETRIEVE_USER_ROOMS_UNREAD_REQUEST, gRetrieveUserRoomsUnreadRequest);
}
