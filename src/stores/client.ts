import { Client } from '../';

export interface ClientState {
  client: Client | null;
  currentRoomId: string;
  currentRoomName: string;
  userId: string;
  accessToken: string;
  isMessageListLoading: boolean;
}