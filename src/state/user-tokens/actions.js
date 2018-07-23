import { createAction } from 'redux-act';

export const fetchUserTokens = createAction('FETCH_USER_TOKENS');
export const fetchUserTokensFailed = createAction('FETCH_USER_TOKENS_FAILED', error => ({ error }));
export const fetchUserTokensSuccess = createAction('FETCH_USER_TOKENS_SUCCESS', userTokens => ({ userTokens }));

export const saveUserTokens = createAction('SAVE_USER_TOKENS', tokenIds => ({ tokenIds }));

export const clearUserTokens = createAction('CLEAR_USER_TOKENS');

export const openEditTokensModal = createAction('OPEN_Edit_TOKENS_MODAL');
export const closeEditTokensModal = createAction('CLOSE_Edit_TOKENS_MODAL');
