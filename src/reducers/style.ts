import { IStyleState } from '../stores/';
import {
  IUpdateStyleAction,
  IUpdateMessageBodyMenuStyleAction,
  IUpdatePluginMessageTextInteractionStyleAction,
  UPDATE_STYLE,
  UPDATE_MESSAGE_BODY_MENU_STYLE,
  UPDATE_PLUGIN_MESSAGE_TEXT_INTERACTION_STYLE,
  StyleActions,
} from '../actions/style';

const getInitialState = (): IStyleState => ({
  messageBodyMenuStyle: {
    paddingBottom: '5px',
  },
  pluginMessageTextInteractionStyle: {
    textAreaStyle: {
      fontSize: '0px',
      padding: '0px',
      height: '0px',
      overflowY: 'hidden',
    },
  },
});

export function style(state: IStyleState = getInitialState(), action: StyleActions): IStyleState {
  switch (action.type) {
    case UPDATE_STYLE:
      return Object.assign(
        {},
        state,
        (<IUpdateStyleAction>action).style,
      );
    case UPDATE_MESSAGE_BODY_MENU_STYLE:
      return Object.assign(
        {},
        state,
        {
          messageBodyMenuStyle: (<IUpdateMessageBodyMenuStyleAction>action).messageBodyMenuStyle,
        }
      );
    case UPDATE_PLUGIN_MESSAGE_TEXT_INTERACTION_STYLE:
      return Object.assign(
        {},
        state,
        {
          pluginMessageTextInteractionStyle: (<IUpdatePluginMessageTextInteractionStyleAction>action).pluginMessageTextInteractionStyle,
        }
      );
    default:
      return state;
  }
}
