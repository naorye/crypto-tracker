import update from 'immutability-helper';
import { createReducer } from 'redux-act';
import * as actions from './actions';

export const namespace = 'tokensList';

const initialState = {
    isLoading: false,
    error: undefined,
    userTokens: [],
};

export default createReducer({
    [actions.fetchUserTokens]: state =>
        update(state, {
            isLoading: { $set: true },
            error: { $set: undefined },
        }),

    [actions.fetchUserTokensFailed]: (state, { error }) =>
        update(state, {
            isLoading: { $set: false },
            error: { $set: error },
        }),

    [actions.fetchUserTokensSuccess]: (state, { userTokens }) =>
        update(state, {
            isLoading: { $set: false },
            error: { $set: undefined },
            userTokens: { $set: userTokens },
        }),

    [actions.clearUserTokens]: state =>
        update(state, {
            isLoading: { $set: false },
            error: { $set: undefined },
            userTokens: { $set: [] },
        }),

}, initialState);

const isUserTokensLoading = state => state[namespace].isLoading;
const getUserTokensError = state => state[namespace].error;
const getUserTokens = state => state[namespace].userTokens;

export const selectors = {
    isUserTokensLoading,
    getUserTokensError,
    getUserTokens,
};
