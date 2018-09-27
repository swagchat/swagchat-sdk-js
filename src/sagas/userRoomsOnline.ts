import { call, ForkEffect, put, select, takeLatest } from 'redux-saga/effects';

import { IRetrieveUserRoomsRequest } from '..';
import {
    RETRIEVE_USER_ROOMS_ONLINE_REQUEST, RetrieveUserRoomsOnlineRequestAction,
    retrieveUserRoomsOnlineRequestFailureActionCreator, retrieveUserRoomsOnlineRequestSuccessActionCreator
} from '../actions/userRoomsOnline';
import { IRetrieveUserRoomsResponse } from '../interface';
import { State } from '../stores';
import { UserRoomsFilter } from '../const';

function* gRetrieveUserRoomsOnlineRequest(action: RetrieveUserRoomsOnlineRequestAction) {
  const state: State = yield select();
  const user = state.user;
  const userRoomsOnline = state.userRoomsOnline;
  const res: IRetrieveUserRoomsResponse = yield call(() => {
    const req = {
      userId: user.user!.userId,
      limit: action.limit !== undefined ? action.limit : state.client.settings!.roomListPagingCount,
      offset: action.offset !== undefined ? action.offset : userRoomsOnline.offset,
      filter: UserRoomsFilter.ONLINE
    } as IRetrieveUserRoomsRequest;
    return user.user!.retrieveRooms(req);
  });
  if (res.error) {
    yield put(retrieveUserRoomsOnlineRequestFailureActionCreator(res.error));
  } else {
    yield put(retrieveUserRoomsOnlineRequestSuccessActionCreator(res.userRoomsResponse!));
  }
}

export function* userRoomsOnlineSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(RETRIEVE_USER_ROOMS_ONLINE_REQUEST, gRetrieveUserRoomsOnlineRequest);
}
