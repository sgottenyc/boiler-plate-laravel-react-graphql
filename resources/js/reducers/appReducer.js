import objectAssign from 'object-assign';
import initialState from './initialState';
import {  AUTH_SIGNIN, AUTH_SIGNOUT } from '../constants/actionTypes';

export default function appReducer(state = initialState.myData, action) {
//  let newState;
  switch(action.type) {
    case AUTH_SIGNIN:
      return objectAssign({}, state, { isAuthenticated: true } );
    case AUTH_SIGNOUT:
      return objectAssign({}, state, { isAuthenticated: false });
    default: 
      return state;
  }
}