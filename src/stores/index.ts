export { IAssetState } from './asset';
export { IClientState } from './client';
export { IMessageState } from './message';
export { IPluginState } from './plugin';
export { IRoomState } from './room';
export { ISettingState } from './setting';
export { IStyleState, IMessageBodyMenuStyle, IPluginMessageTextInteractionStyle } from './style';
export { IUserState } from './user';

import { ISettingState } from './setting';
import { Store, createStore, combineReducers, applyMiddleware, Middleware } from 'redux';
import { createLogger } from 'redux-logger';
import sagaMiddlewareFactory from 'redux-saga';
import { SagaMiddleware } from 'redux-saga';
import { routerMiddleware, routerReducer, RouterState } from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import { setting } from '../reducers/setting';
import { client } from '../reducers/client';
import { IClientState } from './client';
import { IPluginState } from './plugin';
import { plugin } from '../reducers/plugin';
import { user } from '../reducers/user';
import { IUserState } from './user';
import { room } from '../reducers/room';
import { IRoomState } from './room';
import { message } from '../reducers/message';
import { IMessageState } from './message';
import { asset } from '../reducers/asset';
import { IAssetState } from './asset';
import { style } from '../reducers/style';
import { IStyleState } from './style';
import { rootSaga } from '../sagas';

const middleware: Middleware[] = [];
export const routerHistory: any = createHistory();

export const sagaMiddleware: SagaMiddleware<{}> = sagaMiddlewareFactory();
if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({
    level: 'info',
    duration: true,
  });
  middleware.push(sagaMiddleware, logger);
  middleware.push(routerMiddleware(routerHistory));
}

export const store: Store<any> = createStore(
  combineReducers({
    setting,
    client,
    plugin,
    user,
    room,
    message,
    asset,
    style,
    router: routerReducer,
  }),
  applyMiddleware(...middleware)
);
sagaMiddleware.run(rootSaga);

export type State = {
  setting: ISettingState,
  client: IClientState,
  plugin: IPluginState,
  user: IUserState,
  room: IRoomState,
  message: IMessageState,
  asset: IAssetState,
  style: IStyleState,
  router: RouterState,
};
