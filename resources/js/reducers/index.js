import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import myData from './appReducer';

export default function rootReducer(client) {
  const rootReducer = combineReducers({
    routing: routerReducer,
    apollo: client.reducer(),
    myData
  });
  return rootReducer;
}
