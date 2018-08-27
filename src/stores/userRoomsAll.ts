import { IMiniRoom } from '..';

export interface UserRoomsAllState {
  userRoomsMap: {[roomId: string]: IMiniRoom} | null;
  userRooms: IMiniRoom[];
  allCount: number;
  limit: number;
  offset: number;
}
