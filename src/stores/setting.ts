import * as React from 'react';

export interface ISettingState {
  setting: Object;
  roomListTitle: string;
  roomListTabbar: React.ComponentClass<any> | null;
  noRoomListText: string;
  noRoomListImage: string;
  noMessageText: string;
  noMessageImage: string;
  inputMessagePlaceholderText: string;
  roomSettingTitle: string;
  roomMembersTitle: string;
  selectContactTitle: string;
  noContactListText: string;
  noContactListImage: string;
  noAvatarImages: string[];
  roomListRoutePath: string;
  messageRoutePath: string;
  roomSettingRoutePath: string;
  selectContactRoutePath: string;
}
