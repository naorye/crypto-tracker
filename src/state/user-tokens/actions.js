import { createAction } from 'redux-act';

export const fetchUserTokens = createAction('FETCH_USER_TOKENS');
export const fetchUserTokensFailed = createAction('FETCH_USER_TOKENS_FAILED', error => ({ error }));
export const fetchUserTokensSuccess = createAction('FETCH_USER_TOKENS_SUCCESS', userTokens => ({ userTokens }));

export const clearUserTokens = createAction('CLEAR_USER_TOKENS');
