import { createLogger } from 'redux-logger';
import { routerReducer, RouterState } from 'react-router-redux';
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

export function generateMiddleware(middleware: Middleware[]): Middleware[] {
  if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger({
      level: 'info',
      duration: true,
    });
    middleware.push(logger);
  }

  return middleware;
}

export function generateStore(middleware: Middleware[]): Store<State> {
  return createStore(
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
}

export type State = {
  addon: AddonState,
  client: ClientState,
  message: MessageState,
  room: RoomState,
  user: UserState,
  router: RouterState,
};
