export const isBrowser = typeof window !== "undefined";
export const apiLogColor = "#03A9F4";
export const realtimeLogColor = "#009688";

export enum Platform {
  IOS = 1,
  ANDROID = 2,
}

export enum RoomType {
  ONE_ON_ONE = 1,
  PRIVATE_ROOM = 2,
  PUBLIC_ROOM = 3,
}
