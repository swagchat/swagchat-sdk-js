import { IMiniRoom } from '..';

export interface UserRoomsAllState {
  userRoomsMap: {[key: string]: IMiniRoom} | null;
  userRooms: IMiniRoom[];
  allCount: number;
  limit: number;
  offset: number;
}
