import { IMiniRoom } from '..';

export interface UserRoomsUnreadState {
  userRoomsMap: {[roomId: string]: IMiniRoom} | null;
  userRooms: IMiniRoom[];
  allCount: number;
  limit: number;
  offset: number;
}
