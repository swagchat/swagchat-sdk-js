import { Action } from 'redux';
import { IMessageBodyMenuStyle, IPluginMessageTextInteractionStyle } from '../stores/style';
export declare const UPDATE_STYLE = "UPDATE_STYLE";
export declare const UPDATE_MESSAGE_BODY_MENU_STYLE = "UPDATE_MESSAGE_BODY_MENU_STYLE";
export declare const UPDATE_PLUGIN_MESSAGE_TEXT_INTERACTION_STYLE = "UPDATE_PLUGIN_MESSAGE_TEXT_INTERACTION_STYLE";
export declare type StyleActionTypes = typeof UPDATE_STYLE | typeof UPDATE_MESSAGE_BODY_MENU_STYLE | typeof UPDATE_PLUGIN_MESSAGE_TEXT_INTERACTION_STYLE;
export interface IStyleBaseAction extends Action {
    type: StyleActionTypes;
}
export interface IUpdateStyleAction extends IStyleBaseAction {
    type: StyleActionTypes;
    style: Object;
}
export declare const updateStyleActionCreator: (style: Object) => IUpdateStyleAction;
export interface IUpdateMessageBodyMenuStyleAction extends IStyleBaseAction {
    type: StyleActionTypes;
    messageBodyMenuStyle: IMessageBodyMenuStyle;
}
export declare const updateMessageBodyMenuStyleActionCreator: (messageBodyMenuStyle: IMessageBodyMenuStyle) => IUpdateMessageBodyMenuStyleAction;
export interface IUpdatePluginMessageTextInteractionStyleAction extends IStyleBaseAction {
    type: StyleActionTypes;
    pluginMessageTextInteractionStyle: IPluginMessageTextInteractionStyle;
}
export declare const updatePluginMessageTextInteractionStyleActionCreator: (pluginMessageTextInteractionStyle: IPluginMessageTextInteractionStyle) => IUpdatePluginMessageTextInteractionStyleAction;
export declare type StyleActions = IStyleBaseAction | IUpdateStyleAction | IUpdateMessageBodyMenuStyleAction | IUpdatePluginMessageTextInteractionStyleAction;
export declare const dispatchUpdateStyle: (style: Object) => IUpdateStyleAction;
