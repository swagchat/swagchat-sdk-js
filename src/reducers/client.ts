import * as R from 'ramda';

import {
    ClientActions, SET_CLIENT, SET_SETTINGS, SetClientAction, SetSettingsAction,
} from '../';
import { ClientState } from '../stores/client';

const getInitialState = (): ClientState => ({
  client: null,
  settings: null,
});

export function client(state: ClientState = getInitialState(), action: ClientActions): ClientState {
  switch (action.type) {
    case SET_CLIENT:
      return R.merge(
        state,
        {
          client: (action as SetClientAction).client,
        }
      );
    case SET_SETTINGS:
      return R.merge(
        state,
        {
          settings: (action as SetSettingsAction).settings
        }
      );
    default:
      return state;
  }
}