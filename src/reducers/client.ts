import { ClientState } from '../stores/client';
import {
  ClientActions,
  SET_CLIENT, SetClientAction,
} from '../actions/client';

const getInitialState = (): ClientState => ({
  client: null,
});

export function client(state: ClientState = getInitialState(), action: ClientActions): ClientState {
  switch (action.type) {
    case SET_CLIENT:
      return Object.assign(
        {},
        state,
        {
          client: (action as SetClientAction).client,
        }
      );
    default:
      return state;
  }
}