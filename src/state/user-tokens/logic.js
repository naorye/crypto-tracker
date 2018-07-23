import { createLogic } from 'redux-logic';
import * as actions from './actions';
import { selectors } from './reducer';
import { getUserTokenIds, getSpecificTokens, setUserTokenIds } from '../../resources';

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
        } catch (error) {
            dispatch(actions.fetchUserTokensFailed(error.message));
        }

        done();
    },
});

export const saveUserTokens = createLogic({
    type: actions.saveUserTokens,

    async process({ action }, dispatch, done) {
        const { tokenIds } = action.payload;

        try {
            const token = window.localStorage.getItem('token');
            const userTokenIds = await setUserTokenIds.call({ token, tokenIds });
            const userTokens = await getSpecificTokens.call({ token, tokenIds: userTokenIds });

            dispatch(actions.fetchUserTokensSuccess(userTokens));
            dispatch(actions.closeEditTokensModal());
        } catch (error) {
            // Do nothing
        }

        done();
    },
});
