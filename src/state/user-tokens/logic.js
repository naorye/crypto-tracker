import { createLogic } from 'redux-logic';
import { push } from 'react-router-redux';
import * as actions from './actions';
import { selectors } from './reducer';
import { getUserTokenIds, getSpecificTokens } from '../../resources';

export const fetchUserTokens = createLogic({
    type: actions.fetchUserTokens,

    validate({ getState, action }, allow, reject) {
        const state = getState();
        const isLoading = selectors.isUserTokensLoading(state);
        const isValid = window.localStorage.getItem('token') !== null;

        if (isLoading || !isValid) {
            reject();
        } else {
            allow(action);
        }
    },

    async process(_, dispatch, done) {
        try {
            const token = window.localStorage.getItem('token');
            const tokenIds = await getUserTokenIds.call({ token });
            const userTokens = await getSpecificTokens.call({ token, tokenIds });

            dispatch(actions.fetchUserTokensSuccess(userTokens));
            dispatch(push('/'));
        } catch (error) {
            dispatch(actions.fetchUserTokensFailed(error.message));
        }

        done();
    },
});
