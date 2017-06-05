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
    ;
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
//# sourceMappingURL=util.js.map