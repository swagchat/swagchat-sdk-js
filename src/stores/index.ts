import { createLogger } from 'redux-logger';
import sagaMiddlewareFactory from 'redux-saga';
import { SagaMiddleware } from 'redux-saga';
import { routerMiddleware, routerReducer, RouterState } from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import { Store, createStore, combineReducers, applyMiddleware, Middleware } from 'redux';

import { IAddonState } from './addon';
import { IAssetState } from './asset';
import { IClientState } from './client';
import { IMessageState } from './message';
import { IRoomState } from './room';
import { ISettingState } from './setting';
import { IStyleState } from './style';
import { IUserState } from './user';

import { addon } from '../reducers/addon';
import { asset } from '../reducers/asset';
import { client } from '../reducers/client';
import { message } from '../reducers/message';
import { room } from '../reducers/room';
import { setting } from '../reducers/setting';
import { style } from '../reducers/style';
import { user } from '../reducers/user';

import { rootSaga } from '../sagas';

export { IAddonState } from './addon';
export { IAssetState } from './asset';
export { IClientState } from './client';
export { IMessageState } from './message';
export { IRoomState } from './room';
export { ISettingState } from './setting';
export { IStyleState, IMessageBodyMenuStyle, IPluginMessageTextInteractionStyle } from './style';
export { IUserState } from './user';

const middleware: Middleware[] = [];
export const routerHistory: any = createHistory();

export const sagaMiddleware: SagaMiddleware<{}> = sagaMiddlewareFactory();
if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({
    level: 'info',
    duration: true,
  });
  middleware.push(sagaMiddleware, logger);
}
middleware.push(routerMiddleware(routerHistory));

export const store: Store<any> = createStore(
  combineReducers({
    addon,
    asset,
    client,
    message,
    room,
    setting,
    style,
    user,
    router: routerReducer,
  }),
  applyMiddleware(...middleware)
);
sagaMiddleware.run(rootSaga);

export type State = {
  addon: IAddonState,
  asset: IAssetState,
  client: IClientState,
  message: IMessageState,
  room: IRoomState,
  setting: ISettingState,
  style: IStyleState,
  user: IUserState,
  router: RouterState,
};
