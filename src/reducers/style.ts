import { IStyleState } from '../stores/';
import {
  IUpdateMessageBodyMenuStyleAction,
  IUpdateModalAction,
  UPDATE_MODAL,
  CLEAR_MODAL,
  UPDATE_MESSAGE_BODY_MENU_STYLE,
  StyleActions,
} from '../actions/style';

const getInitialState = (): IStyleState => ({
  modal: {},
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
    case UPDATE_MODAL:
      const modal = state.modal as any;
      const modalKey = (<IUpdateModalAction>action).modalKey;
      return Object.assign(
        {},
        state,
        {
          modal: {
            [modalKey]: !modal[modalKey],
          }
        },
      );
    case CLEAR_MODAL:
      return Object.assign(
        {},
        state,
        {
          modal: {}
        },
      );
    case UPDATE_MESSAGE_BODY_MENU_STYLE:
      return Object.assign(
        {},
        state,
        {
          messageBodyMenuStyle: (<IUpdateMessageBodyMenuStyleAction>action).messageBodyMenuStyle,
        }
      );
    default:
      return state;
  }
}
