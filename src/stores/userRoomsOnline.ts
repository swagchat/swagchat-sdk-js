import { IMiniRoom } from '..';

export interface UserRoomsOnlineState {
  userRoomsMap: {[key: string]: IMiniRoom} | null;
  userRooms: IMiniRoom[];
  allCount: number;
  limit: number;
  offset: number;
}
