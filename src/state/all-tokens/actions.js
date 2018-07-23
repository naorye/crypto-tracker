import { createAction } from 'redux-act';

export const fetchAllTokens = createAction('FETCH_ALL_TOKENS');
export const fetchAllTokensFailed = createAction('FETCH_ALL_TOKENS_FAILED', error => ({ error }));
export const fetchAllTokensSuccess = createAction('FETCH_ALL_TOKENS_SUCCESS', allTokens => ({ allTokens }));
