import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as syncExampleReducer from './syncExample';

export interface InitialState {
  syncExample: syncExampleReducer.SyncExampleState;
}

export const initialState:InitialState = {
  syncExample: syncExampleReducer.SYNC_EXAMPLE_STATE,
};

const rootReducer = combineReducers({
  syncExample: syncExampleReducer.syncExampleReducer,
  routing: routerReducer,
});

export default rootReducer;
