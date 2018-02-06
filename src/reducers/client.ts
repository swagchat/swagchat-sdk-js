import { IClientState } from '../stores/client';
import {
  ISetClientAction,
  ISetCurrentRoomAction,
  ISetAuthParamsAction,
  SET_CLIENT,
  SET_CURRENT_ROOM,
  SET_AUTH_PARAMS,
  ClientActions,
} from '../actions/client';

const getInitialState = (): IClientState => ({
  client: null,
  currentRoom: null,
  userId: '',
  accessToken: '',
});

export function client(state: IClientState = getInitialState(), action: ClientActions): IClientState {
  switch (action.type) {
    case SET_CLIENT:
      return Object.assign(
        {},
        state,
        {
          client: (<ISetClientAction>action).client,
        }
      );
    case SET_CURRENT_ROOM:
      return Object.assign(
        {},
        state,
        {
          currentRoom: (<ISetCurrentRoomAction>action).currentRoom,
        }
      );
    case SET_AUTH_PARAMS:
      const setUserAuthParamsAction = <ISetAuthParamsAction>action;
      return Object.assign(
        {},
        state,
        {
          userId: setUserAuthParamsAction.userId,
          accessToken: setUserAuthParamsAction.accessToken,
        }
      );
    default:
      return state;
  }
}
