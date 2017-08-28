import * as I from './interface';

export function createQueryParams(params: {[key: string]: string | number}) {
    return Object.keys(params)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(String(params[key])))
        .join('&');
}

export function createMessage(roomId: string, userId: string, type: string, payload: Object): I.IMessage {
    if (!roomId || !userId || !payload || typeof(roomId) !== 'string' || !(payload instanceof Object) || !(payload instanceof Object)) {
        throw Error('Creating message failure. Parameter invalid.');
    }
    if (Object.keys(payload).length === 0) {
        throw Error('Creating message failure. Parameter invalid.');
    }
    return {
        roomId: roomId,
        userId: userId,
        type: type,
        eventName: 'message',
        payload: payload
    };
}

const apiLogColor = '#039BE5';
const realtimeLogColor = '#304FFE';

const normalLogColor = '#33333';
const debugLogColor = '#33333';
const infoLogColor = '#03A9F4';
const errorLogColor = '#F44336';

export function logger(label: string, level: string, message: string) {
    let labelName = 'SwagChatSDK';
    let logColor = apiLogColor;
    if (label === 'realtime') {
        labelName = 'SwagChatSDK-REAL';
        logColor = realtimeLogColor;
    }
    switch (level) {
        case 'normal':
            console.log('%c[' + labelName + ']%c' + message, 'color:' + logColor, 'color: ' + normalLogColor);
            break;
        case 'debug':
            console.debug('%c[' + labelName + ']%c' + message, 'color:' + logColor, 'color: ' + debugLogColor);
            break;
        case 'info':
            console.info('%c[' + labelName + ']%c' + message, 'color:' + logColor, 'color: ' + infoLogColor);
            break;
        case 'error':
            console.log('%c[' + labelName + ']%c' + message, 'color:' + logColor, 'color: ' + errorLogColor);
            break;
        default:
            break;
    }
}