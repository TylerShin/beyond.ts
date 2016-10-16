import Action from '../actions';
import { SYNC_EXAMPLE_ACTIONS } from '../actions/syncExampleActions';

export interface SyncExampleState {
  compiler: String;
  framework: String;
}

export const SYNC_EXAMPLE_STATE: SyncExampleState = {
  compiler: 'TypeScript',
  framework: 'ReactJS',
};

export function syncExampleReducer(state = SYNC_EXAMPLE_STATE, action:Action<SYNC_EXAMPLE_ACTIONS>) {
  switch (action.type) {
    default:
      return state;
  }
}
