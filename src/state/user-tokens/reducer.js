import update from 'immutability-helper';
import { createReducer } from 'redux-act';
import { createSelector } from 'reselect';
import * as actions from './actions';

export const namespace = 'userTokens';

const initialState = {
    isLoading: false,
    error: undefined,
    userTokens: [],
    isEditModalOpen: false,
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

    [actions.openEditTokensModal]: state =>
        update(state, {
            isEditModalOpen: { $set: true },
        }),

    [actions.closeEditTokensModal]: state =>
        update(state, {
            isEditModalOpen: { $set: false },
        }),

}, initialState);

const isUserTokensLoading = state => state[namespace].isLoading;
const getUserTokensError = state => state[namespace].error;
const getUserTokens = state => state[namespace].userTokens;
const getUserTokenIds = createSelector(
    getUserTokens,
    tokens => tokens.map(token => token.tokenId),
);
const isEditTokensModalOpen = state => state[namespace].isEditModalOpen;

export const selectors = {
    isUserTokensLoading,
    getUserTokensError,
    getUserTokens,
    getUserTokenIds,
    isEditTokensModalOpen,
};
