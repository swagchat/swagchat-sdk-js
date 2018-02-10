import { Client, Room } from '../';

export interface ClientState {
  client: Client | null;
  currentRoom: Room | null;
  currentRoomId: string;
  currentRoomName: string;
  userId: string;
  accessToken: string;
  isMessageListLoading: boolean;
}