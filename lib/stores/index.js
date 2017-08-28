"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var redux_logger_1 = require("redux-logger");
var redux_saga_1 = require("redux-saga");
var react_router_redux_1 = require("react-router-redux");
var createHashHistory_1 = require("history/createHashHistory");
var setting_1 = require("../reducers/setting");
var client_1 = require("../reducers/client");
var plugin_1 = require("../reducers/plugin");
var user_1 = require("../reducers/user");
var room_1 = require("../reducers/room");
var message_1 = require("../reducers/message");
var asset_1 = require("../reducers/asset");
var style_1 = require("../reducers/style");
var sagas_1 = require("../sagas");
var middleware = [];
exports.routerHistory = createHashHistory_1.default();
exports.sagaMiddleware = redux_saga_1.default();
if (process.env.NODE_ENV !== 'production') {
    var logger = redux_logger_1.createLogger({
        level: 'info',
        duration: true,
    });
    middleware.push(exports.sagaMiddleware, logger);
    middleware.push(react_router_redux_1.routerMiddleware(exports.routerHistory));
}
exports.store = redux_1.createStore(redux_1.combineReducers({
    setting: setting_1.setting,
    client: client_1.client,
    plugin: plugin_1.plugin,
    user: user_1.user,
    room: room_1.room,
    message: message_1.message,
    asset: asset_1.asset,
    style: style_1.style,
    router: react_router_redux_1.routerReducer,
}), redux_1.applyMiddleware.apply(void 0, middleware));
exports.sagaMiddleware.run(sagas_1.rootSaga);
//# sourceMappingURL=index.js.map