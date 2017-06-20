export const isBrowser = typeof window !== "undefined";

export enum Platform {
  IOS = 1,
  ANDROID = 2,
}

export enum RoomType {
  ONE_ON_ONE = 1,
  PRIVATE_ROOM = 2,
  PUBLIC_ROOM = 3,
}
