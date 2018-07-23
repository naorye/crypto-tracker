import { createLogic } from 'redux-logic';
import * as actions from './actions';
import { selectors } from './reducer';
import { getAllTokens } from '../../resources';

export const fetchAllTokens = createLogic({
    type: actions.fetchAllTokens,

    validate({ getState, action }, allow, reject) {
        const state = getState();
        const isLoading = selectors.isAllTokensLoading(state);
        const isLoaded = selectors.isAllTokensLoaded(state);
        const isValid = window.localStorage.getItem('token') !== null;

        if (isLoading || !isValid || isLoaded) {
            reject();
        } else {
            allow(action);
        }
    },

    async process(_, dispatch, done) {
        try {
            const token = window.localStorage.getItem('token');
            const allTokens = await getAllTokens.call({ token });

            dispatch(actions.fetchAllTokensSuccess(allTokens));
        } catch (error) {
            dispatch(actions.fetchAllTokensFailed(error.message));
        }

        done();
    },
});
