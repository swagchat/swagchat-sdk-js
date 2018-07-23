import { createLogger } from 'redux-logger';
import { routerReducer, RouterState } from 'react-router-redux';
import { Store, createStore, combineReducers, applyMiddleware, Middleware, ReducersMapObject } from 'redux';

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

const R = require('ramda');

export function generateMiddleware(middleware: Middleware[]): Middleware[] {
  if (process.env.REACT_APP_ENV !== 'production') {
    const logger = createLogger({
      level: 'info',
      duration: true,
    });
    middleware.push(logger);
  }

  return middleware;
}

export function generateStore(middleware: Middleware[]): Store<any>;
export function generateStore(middleware: Middleware[], addReducers: ReducersMapObject): Store<any>;
export function generateStore(middleware: Middleware[], addReducers?: ReducersMapObject): Store<any> {
  let reducers = {
    addon,
    client,
    message,
    room,
    user,
    router: routerReducer,
  };
  if (addReducers) {
    reducers = R.merge(reducers, addReducers);
  }

  return createStore(
    combineReducers(reducers),
    applyMiddleware(...middleware)
  );
}

export type State = {
  addon: AddonState,
  client: ClientState,
  message: MessageState,
  room: RoomState,
  user: UserState,
  router: RouterState,
};
