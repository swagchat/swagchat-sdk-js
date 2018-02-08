import { createLogger } from 'redux-logger';
import sagaMiddlewareFactory from 'redux-saga';
import { SagaMiddleware } from 'redux-saga';
import { routerMiddleware, routerReducer, RouterState } from 'react-router-redux';
import { History } from 'history';
import createHistory from 'history/createBrowserHistory';
import { Store, createStore, combineReducers, applyMiddleware, Middleware } from 'redux';

import { AddonState } from './addon';
import { ClientState } from './client';
import { MessageState } from './message';
import { RoomState } from './room';
import { UserState } from './user';

import { addon } from '../reducers/addon';
import { client } from '../reducers/client';
import { message } from '../reducers/message';
import { room } from '../reducers/room';
import { user } from '../reducers/user';
import { rootSaga } from '../sagas';

const middleware: Middleware[] = [];
export const routerHistory: History = createHistory();

export const sagaMiddleware: SagaMiddleware<{}> = sagaMiddlewareFactory();
if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({
    level: 'info',
    duration: true,
  });
  middleware.push(logger);
}
middleware.push(sagaMiddleware);
middleware.push(routerMiddleware(routerHistory));

export const store: Store<State> = createStore(
  combineReducers({
    addon,
    client,
    message,
    room,
    user,
    router: routerReducer,
  }),
  applyMiddleware(...middleware)
);

sagaMiddleware.run(rootSaga);

export type State = {
  addon: AddonState,
  client: ClientState,
  message: MessageState,
  room: RoomState,
  user: UserState,
  router: RouterState,
};
