import { IMiniRoom, IErrorResponse } from '..';

export interface UserRoomsAllState {
  userRoomsMap: {[roomId: string]: IMiniRoom} | null;
  userRooms: IMiniRoom[];
  allCount: number;
  limit: number;
  offset: number;
  errorResponse: IErrorResponse | null;
}
