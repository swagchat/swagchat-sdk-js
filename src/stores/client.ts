import { Client, Room } from '../';

export interface IClientState {
  client: Client | null;
  currentRoom: Room | null;
  userId: string;
  accessToken: string;
}
