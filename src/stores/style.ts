import { store } from './';
import { updateStyleActionCreator } from '../actions/style';
import {
combinedAssetPostAndRoomUpdateRequestActionCreator,
} from '../actions/combined';

export interface IStyleState {
  messageBodyMenuStyle: IMessageBodyMenuStyle;
  pluginMessageTextInteractionStyle: IPluginMessageTextInteractionStyle;
}

export interface IMessageBodyMenuStyle {
  paddingBottom: string;
}

export interface IPluginMessageTextInteractionStyle {
  textAreaStyle: {
    fontSize: string;
    padding: string;
    height: string;
    overflowY: 'scroll' | 'initial' | 'inherit' | 'unset' | 'hidden' | 'auto' | 'visible' | undefined;
  };
}

export const updateStyleActionDispatch = function(style: Object) {
  store.dispatch(updateStyleActionCreator(style));
};
export const assetPostAndRoomUpdateActionDispatch = function() {
  store.dispatch(combinedAssetPostAndRoomUpdateRequestActionCreator());
};