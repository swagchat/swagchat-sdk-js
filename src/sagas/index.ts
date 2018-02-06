import { fork, ForkEffect } from 'redux-saga/effects';
import { assetSaga } from './asset';
import { combinedSaga } from './combined';
import { messageSaga } from './message';
import { roomSaga } from './room';
import { routerSaga } from './router';
import { settingSaga } from './setting';
import { userSaga } from './user';

export function* rootSaga(): IterableIterator<ForkEffect> {
  yield fork(assetSaga);
  yield fork(combinedSaga);
  yield fork(messageSaga);
  yield fork(roomSaga);
  yield fork(routerSaga);
  yield fork(settingSaga);
  yield fork(userSaga);
}
