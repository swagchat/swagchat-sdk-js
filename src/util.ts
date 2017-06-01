import * as I from "./interface";

export function createQueryParams(params: {[key: string]: string | number}) {
    return Object.keys(params)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(String(params[key])))
        .join("&");
}

export function createMessage(roomId: string, userId: string, type: string, payload: Object): I.IMessage {
    if (!roomId || !userId || !payload || typeof(roomId) !== "string" || !(payload instanceof Object) || !(payload instanceof Object)) {
        throw Error("Creating message failure. Parameter invalid.");
    };
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