import { IMiniRoom } from '..';

export interface UserRoomsUnreadState {
  userRoomsMap: {[key: string]: IMiniRoom} | null;
  userRooms: IMiniRoom[];
  allCount: number;
  limit: number;
  offset: number;
}
