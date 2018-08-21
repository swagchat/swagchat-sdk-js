import { call, ForkEffect, put, select, takeLatest } from 'redux-saga/effects';

import { IRetrieveUserRoomsRequest } from '..';
import {
    RETRIEVE_USER_ROOMS_ALL_REQUEST, RetrieveUserRoomsAllRequestAction,
    retrieveUserRoomsAllRequestFailureActionCreator, retrieveUserRoomsAllRequestSuccessActionCreator
} from '../actions/userRoomsAll';
import { IRetrieveUserRoomsResponse } from '../interface';
import { State } from '../stores';
import { UserRoomsFilter } from '../const';

function* gRetrieveUserRoomsAllRequest(action: RetrieveUserRoomsAllRequestAction) {
  const state: State = yield select();
  const user = state.user;
  const userRoomsAll = state.userRoomsAll;
  const res: IRetrieveUserRoomsResponse = yield call(() => {
    const req = {
      userId: user.user!.userId,
      limit: action.limit !== undefined ? action.limit : state.client.client!.settings.roomListPagingCount,
      offset: action.offset !== undefined ? action.offset : userRoomsAll.offset,
      filter: UserRoomsFilter.NONE
    } as IRetrieveUserRoomsRequest;
    return user.user!.retrieveRooms(req);
  });
  if (res.error) {
    yield put(retrieveUserRoomsAllRequestFailureActionCreator(res.error));
  } else {
    yield put(retrieveUserRoomsAllRequestSuccessActionCreator(res.userRoomsResponse!));
  }
}

export function* userRoomsAllSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(RETRIEVE_USER_ROOMS_ALL_REQUEST, gRetrieveUserRoomsAllRequest);
}
