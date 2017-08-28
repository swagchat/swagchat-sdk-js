import { IClientState } from '../stores/client';
import {
  ISetClientAction,
  SET_CLIENT,
  ClientActions,
} from '../actions/client';

const getInitialState = (): IClientState => ({
  client: null,
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
    default:
      return state;
  }
}
