import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
export default function rootReducer(client) {
  const myRootReducer = combineReducers({
  routing: routerReducer,
  apollo: client.reducer()
  });
  return myRootReducer;
}