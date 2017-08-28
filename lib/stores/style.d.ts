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
