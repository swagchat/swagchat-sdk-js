import { Client, ISettings } from '..';

export interface ClientState {
  client: Client | null;
  settings: ISettings | null;
}