"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var style_1 = require("../actions/style");
var getInitialState = function () { return ({
    messageBodyMenuStyle: {
        paddingBottom: '5px',
    },
    pluginMessageTextInteractionStyle: {
        textAreaStyle: {
            fontSize: '0px',
            padding: '0px',
            height: '0px',
            overflowY: 'hidden',
        },
    },
}); };
function style(state, action) {
    if (state === void 0) { state = getInitialState(); }
    switch (action.type) {
        case style_1.UPDATE_STYLE:
            return Object.assign({}, state, action.style);
        case style_1.UPDATE_MESSAGE_BODY_MENU_STYLE:
            return Object.assign({}, state, {
                messageBodyMenuStyle: action.messageBodyMenuStyle,
            });
        case style_1.UPDATE_PLUGIN_MESSAGE_TEXT_INTERACTION_STYLE:
            return Object.assign({}, state, {
                pluginMessageTextInteractionStyle: action.pluginMessageTextInteractionStyle,
            });
        default:
            return state;
    }
}
exports.style = style;
//# sourceMappingURL=style.js.map