import { IUserForRoom, IMessage, Room, MessageType } from '../';
import * as I from '../interface';

export function dateHumanize(ISO3339: string): string {
  const nowDate = new Date();
  const itemDate = new Date(ISO3339);
  const nowYYYYMMDD = nowDate.getFullYear() + (nowDate.getMonth() + 1) + nowDate.getDate();
  const itemYYYYMMDD = itemDate.getFullYear() + (itemDate.getMonth() + 1) + itemDate.getDate();
  if (nowYYYYMMDD === itemYYYYMMDD) {
    // Today
    return itemDate.getHours() + ':' + ('00' + itemDate.getMinutes()).slice(-2);
  } else {
    let beforeOneWeekDate = new Date();
    beforeOneWeekDate.setDate(nowDate.getDate() - 7 );
    if (beforeOneWeekDate <= itemDate) {
      // Within one week
      const dayList = ['日', '月', '火', '水', '木', '金', '土'];
      return dayList[itemDate.getDay()] + '曜日';
    } else {
      if (nowDate.getFullYear() === itemDate.getFullYear()) {
        // Within one year
        return itemDate.getMonth() + 1 + '/' + itemDate.getDate();
      } else {
        // Over one year ago
        return String(itemDate.getFullYear());
      }
    }
  }
}

export function dateFormateHHMM(ISO3339: string): string {
  const itemDate = new Date(ISO3339);
  return itemDate.getHours() + ':' + ('00' + itemDate.getMinutes()).slice(-2);
}

export function dateFormateMMDD(ISO3339: string): string {
  const itemDate = new Date(ISO3339);
  return (itemDate.getMonth() + 1) + '/' + itemDate.getDate();
}

export function ISO3339String2Number(iso3339: string) {
  const date = new Date(iso3339);
  return Math.floor(date.getTime() / 1000);
}

export function opponentUser(users: IUserForRoom[], myUserId: string): (IUserForRoom[] | null) {
  let userForRooms = new Array;
  (users as IUserForRoom[]).forEach((user) => {
    if (user.userId !== myUserId) {
      userForRooms.push(user);
    }
  });
  return userForRooms;
}

export function generateUUID() {
  let uuid = '', i, random;
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-';
    }
    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
}

// export function generateUUID() {
//   let chars = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.split('');
//   for (let i = 0, len = chars.length; i < len; i++) {
//       switch (chars[i]) {
//           case 'x':
//               chars[i] = Math.floor(Math.random() * 16).toString(16);
//               break;
//           case 'y':
//               chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
//               break;
//       }
//   }
//   return chars.join('');
// }

export function generateRoomName(users: IUserForRoom[], myUserId: string): string {
  const separator = ', ';
  let roomName = '';

  for (let i = 0; i < users.length; i++) {
    if (users[i].userId !== myUserId && users[i].ruDisplay) {
      roomName += users[i].name;
      roomName += separator;
    }
  }
  roomName = roomName.slice(0, -1 * separator.length);

  return roomName;
}

export function generateRoomPictureUrl(room: Room, myUserId: string): string {
  let roomPictureUrl = room.pictureUrl;

  if (room.users === null || room.users === undefined || room.users.length === 0) {
    return roomPictureUrl;
  }

  if (roomPictureUrl === '') {
    const user = opponentUser(room.users, myUserId);
    if (user !== null && user.length !== 0) {
      roomPictureUrl = user[0].pictureUrl;
    }
  }

  return roomPictureUrl;
}

export function randomAvatarUrl(avatars: string[]): string {
  const min = 0;
  const max = avatars.length - 1;
  const randomIndex = Math.floor(Math.random() * (max + 1 - min) ) + min;
  return avatars[randomIndex];
}

export interface IAuthInfo {
  apiKey: string;
  userId: string;
  userAccessToken: string;
}

export function getAuthInfoFromStorage(): IAuthInfo {
  let scObj: IAuthInfo = {
    apiKey: '',
    userId: '',
    userAccessToken: '',
  };

  const ssSc = sessionStorage.getItem('swagchat');
  if (ssSc) {
    scObj = JSON.parse(ssSc);
    return scObj;
  }

  const lsSc = localStorage.getItem('swagchat');
  if (lsSc) {
    scObj = JSON.parse(lsSc);
    return scObj;
  }

  return scObj;
}

export const isIphone = (): Boolean => {
  const ua = 'iPhone';
  return window.navigator.userAgent.indexOf(ua) > 0;
};

export const countString = (str: string): number => {
  let r = 0;
  for (let i = 0; i < str.length; ++i) {
    let c = str.charCodeAt(i);
    if (c >= 0x0 && c <= 0x7f) {
      r += 1;
    } else {
      r += 2;
    }
  }
  return r;
};

export function createQueryParams(params: {[key: string]: string | number}) {
  return Object.keys(params)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(String(params[key])))
    .join('&');
}

export function createMessage(messageId: string, roomId: string, userId: string, type: MessageType, payload: Object): I.IMessage {
  if (!roomId || !userId || !payload || typeof(roomId) !== 'string' || !(payload instanceof Object) || !(payload instanceof Object)) {
    throw Error('Creating message failure. Parameter invalid.');
  }
  if (Object.keys(payload).length === 0) {
    throw Error('Creating message failure. Parameter invalid.');
  }
  const iso3339 = new Date().toISOString();
  return {
    messageId: messageId,
    roomId: roomId,
    userId: userId,
    type: type,
    eventName: 'message',
    payload: payload,
    created: iso3339,
    modified: iso3339,
  };
}

const apiLogColor = '#039BE5';
const realtimeLogColor = '#304FFE';

const normalLogColor = '#33333';
const debugLogColor = '#33333';
const infoLogColor = '#03A9F4';
const errorLogColor = '#F44336';

export function logger(label: string, level: string, message: string) {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  let labelName = 'SwagChatSDK';
  let logColor = apiLogColor;
  if (label === 'realtime') {
    labelName = 'SwagchatSDK-RTM';
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

// export function mergeList(sortedList: IMessage[], unsortedList: IMessage[]): IMessage[] {
//   unsortedList.sort(function(a: IMessage, b: IMessage) {
//     if (new Date(a.created!) < new Date(b.created!)) return -1;
//     if (new Date(a.created!) > new Date(b.created!)) return 1;
//     return 0;
//   });

//   let mergedList: IMessage[] = [];
//   while (sortedList.length || unsortedList.length) {
//     if (sortedList.length === 0) {
//       mergedList.push(unsortedList.shift()!);
//     } else if (unsortedList.length === 0) {
//       mergedList.push(sortedList.shift()!);
//     } else if (new Date(sortedList[0].created!) > new Date(unsortedList[0].created!)) {
//       mergedList.push(unsortedList.shift()!);
//     } else {
//       mergedList.push(sortedList.shift()!);
//     }
//   }
//   return mergedList;
// }

export function messageList2map(messageList: IMessage[]): {[key: string]: IMessage} {
  let messages: {[key: string]: IMessage} = {};
  messageList.forEach(message => {
    messages[message.messageId!] = message;
  });
  return messages;
}

export function isUrl(str: string): boolean {
  if (str === '' || str === undefined) {
    return false;
  }

  if (str.slice(0, 7) === 'http://' || str.slice(0, 8) === 'https://') {
    return true;
  } else {
    return false;
  }
}

export function isDataUrl(str: string): boolean {
  if (str === '') {
    return false;
  }

  if (str.slice(0, 11) === 'data:image/') {
    return true;
  } else {
    return false;
  }
}

export function messageToString(message: IMessage): string {
  let str = '';
  switch (message.type) {
    case 'text':
      str = (message.payload as I.IPayloadText).text;
      break;
    case 'image':
      str = '画像を受信しました';
      break;
    case 'file':
      str = '[' + (message.payload as I.IPayloadFile).filename + ']' + 'を受信しました';
      break;
    default:
      if (message.payload.hasOwnProperty('text')) {
        str = (message.payload as I.IPayloadText).text;
      }
      break;
  }
  return str;
}

export function replaceUrlToLink(str: string, targetBlank: boolean) {
  const regexp_url = /((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+))/g; // ']))/;
  const regexp_makeLink = (all: string, url: string, h: string, href: string) => {
    all;
    h;
    if (targetBlank) {
      return '<a target="_blank" href="h' + href + '">' + url + '</a>';
    } else {
      return '<a href="h' + href + '">' + url + '</a>';
    }
  };
  return str.replace(regexp_url, regexp_makeLink);
}

export function generateOnlineText(ISO3339: string): string {
  const lastAccessedDate = new Date(ISO3339);
  const msDiff = new Date().getTime() - lastAccessedDate.getTime();
  const minutesDiff = Math.floor(msDiff / (1000 * 60));
  if (minutesDiff >= 15) {
    return '';
  }

  const text = minutesDiff === 0 ? '1分以内' : minutesDiff + '分前';
  return text;
}

export function getExtention(fileName: string) {
  let ret;
  if (!fileName) {
      return ret;
  }
  const fileTypes = fileName.split('.');
  const len = fileTypes.length;
  if (len === 0) {
      return ret;
  }
  ret = fileTypes[len - 1];
  return ret;
}