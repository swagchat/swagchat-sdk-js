"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createQueryParams(params) {
    return Object.keys(params)
        .map(function (key) { return encodeURIComponent(key) + "=" + encodeURIComponent(String(params[key])); })
        .join("&");
}
exports.createQueryParams = createQueryParams;
function createMessage(roomId, userId, type, payload) {
    if (!roomId || !userId || !payload || typeof (roomId) !== "string" || !(payload instanceof Object) || !(payload instanceof Object)) {
        throw Error("Creating message failure. Parameter invalid.");
    }
    if (Object.keys(payload).length === 0) {
        throw Error("Creating message failure. Parameter invalid.");
    }
    return {
        roomId: roomId,
        userId: userId,
        type: type,
        eventName: "message",
        payload: payload
    };
}
exports.createMessage = createMessage;
var apiLogColor = "#039BE5";
var realtimeLogColor = "#304FFE";
var normalLogColor = "#33333";
var debugLogColor = "#33333";
var infoLogColor = "#03A9F4";
var errorLogColor = "#F44336";
function logger(label, level, message) {
    var labelName = "SwagChatSDK";
    var logColor = apiLogColor;
    if (label === "realtime") {
        labelName = "SwagChatSDK-REAL";
        logColor = realtimeLogColor;
    }
    switch (level) {
        case "normal":
            console.log("%c[" + labelName + "]%c" + message, "color:" + logColor, "color: " + normalLogColor);
            break;
        case "debug":
            console.debug("%c[" + labelName + "]%c" + message, "color:" + logColor, "color: " + debugLogColor);
            break;
        case "info":
            console.info("%c[" + labelName + "]%c" + message, "color:" + logColor, "color: " + infoLogColor);
            break;
        case "error":
            console.log("%c[" + labelName + "]%c" + message, "color:" + logColor, "color: " + errorLogColor);
            break;
        default:
            break;
    }
}
exports.logger = logger;
//# sourceMappingURL=util.js.map