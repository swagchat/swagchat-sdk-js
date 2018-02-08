import { fork, ForkEffect } from 'redux-saga/effects';
import { componentSaga } from './component';
import { messageSaga } from './message';
import { roomSaga } from './room';
import { routerSaga } from './router';
import { userSaga } from './user';

export function* rootSaga(): IterableIterator<ForkEffect> {
  yield fork(componentSaga);
  yield fork(messageSaga);
  yield fork(roomSaga);
  yield fork(routerSaga);
  yield fork(userSaga);
}
