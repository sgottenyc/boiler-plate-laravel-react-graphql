import * as types from '../constants/actionTypes';

export const signIn = (token) => {
  localStorage.setItem('token', token);
  return { type: types.AUTH_SIGNIN };
};

export const signOut = () => {
  localStorage.removeItem('token');
  return { type: types.AUTH_SIGNOUT };
};