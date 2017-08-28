"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stores_1 = require("../stores");
exports.UPDATE_STYLE = 'UPDATE_STYLE';
exports.UPDATE_MESSAGE_BODY_MENU_STYLE = 'UPDATE_MESSAGE_BODY_MENU_STYLE';
exports.UPDATE_PLUGIN_MESSAGE_TEXT_INTERACTION_STYLE = 'UPDATE_PLUGIN_MESSAGE_TEXT_INTERACTION_STYLE';
exports.updateStyleActionCreator = function (style) { return ({
    type: exports.UPDATE_STYLE,
    style: style,
}); };
exports.updateMessageBodyMenuStyleActionCreator = function (messageBodyMenuStyle) { return ({
    type: exports.UPDATE_MESSAGE_BODY_MENU_STYLE,
    messageBodyMenuStyle: messageBodyMenuStyle,
}); };
exports.updatePluginMessageTextInteractionStyleActionCreator = function (pluginMessageTextInteractionStyle) { return ({
    type: exports.UPDATE_PLUGIN_MESSAGE_TEXT_INTERACTION_STYLE,
    pluginMessageTextInteractionStyle: pluginMessageTextInteractionStyle,
}); };
exports.dispatchUpdateStyle = function (style) { return stores_1.store.dispatch(exports.updateStyleActionCreator(style)); };
//# sourceMappingURL=style.js.map