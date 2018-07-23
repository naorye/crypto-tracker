import update from 'immutability-helper';
import { createReducer } from 'redux-act';
import * as actions from './actions';

export const namespace = 'allTokens';

const initialState = {
    isLoading: false,
    isLoaded: false,
    error: undefined,
    allTokens: [],
};

export default createReducer({
    [actions.fetchAllTokens]: state =>
        update(state, {
            isLoading: { $set: true },
            error: { $set: undefined },
        }),

    [actions.fetchAllTokensFailed]: (state, { error }) =>
        update(state, {
            isLoading: { $set: false },
            error: { $set: error },
        }),

    [actions.fetchAllTokensSuccess]: (state, { allTokens }) =>
        update(state, {
            isLoading: { $set: false },
            error: { $set: undefined },
            isLoaded: { $set: true },
            allTokens: { $set: allTokens },
        }),
}, initialState);

const isAllTokensLoading = state => state[namespace].isLoading;
const getAllTokensError = state => state[namespace].error;
const getAllTokens = state => state[namespace].allTokens;
const isAllTokensLoaded = state => state[namespace].isLoaded;

export const selectors = {
    isAllTokensLoading,
    getAllTokensError,
    getAllTokens,
    isAllTokensLoaded,
};
