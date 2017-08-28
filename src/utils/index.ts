import { IUserForRoom, IUserMini } from '../';

export function dateHumanize(ISO3339: string): string {
  const nowDate = new Date();
  const itemDate = new Date(ISO3339);
  const nowYYYYMMDD = nowDate.getFullYear() + '-' + nowDate.getMonth()  + '-' +  nowDate.getDate();
  const itemYYYYMMDD = itemDate.getFullYear()  + '-' +  itemDate.getMonth()  + '-' +  itemDate.getDate();
  if (nowYYYYMMDD === itemYYYYMMDD) {
    return itemDate.getHours() + ':' + ('00' + itemDate.getMinutes()).slice(-2);
  } else {
    const dayList = ['日', '月', '火', '水', '木', '金', '土'];
    return dayList[itemDate.getDay()];
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

export function date2ISO3339String(date: Date) {
  function pad(n: any) {
    return n < 10 ? '0' + n : n;
  }
  return date.getUTCFullYear() + '-'
    + pad(date.getUTCMonth() + 1) + '-'
    + pad(date.getUTCDate()) + 'T'
    + pad(date.getUTCHours()) + ':'
    + pad(date.getUTCMinutes()) + ':'
    + pad(date.getUTCSeconds()) + 'Z';
}

export function opponentUser(users: IUserForRoom[] | IUserMini[], myUserId: string): (IUserForRoom[] | null) {
  let userForRooms = new Array;
  (users as IUserForRoom[]).forEach((user) => {
    if (user.userId !== myUserId) {
      userForRooms.push(user);
    }
  });
  return userForRooms;
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