import * as React from 'react';
import { ISetting } from '../';

export interface ISettingState {
  server: ISetting | null;
  client: IClientSetting | null;
}

export interface IClientSetting {
  roomListTabbar: React.ComponentClass<any> | null;
  roomListRoutePath: string;
  messageRoutePath: string;
  roomSettingRoutePath: string;
  selectContactRoutePath: string;
}
