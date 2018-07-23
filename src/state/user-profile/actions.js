import { createAction } from 'redux-act';

export const refreshUserSession = createAction('REFRESH_USER_SESSION');
export const loginUser = createAction('LOGIN_USER', (username, password) => ({ username, password }));
export const loginUserFailed = createAction('LOGIN_USER_FAILED', error => ({ error }));
export const loginUserSuccess = createAction('LOGIN_USER_SUCCESS', (username, name) => ({ username, name }));

export const logoutUser = createAction('LOGOUT_USER');
