import { fork, ForkEffect } from 'redux-saga/effects';
import { userSaga } from './user';
import { roomSaga } from './room';
import { messageSaga } from './message';
import { assetSaga } from './asset';
import { combinedSaga } from './combined';
import { routerSaga } from './router';

export function* rootSaga(): IterableIterator<ForkEffect> {
  yield fork(userSaga);
  yield fork(roomSaga);
  yield fork(messageSaga);
  yield fork(assetSaga);
  yield fork(combinedSaga);
  yield fork(routerSaga);
}
