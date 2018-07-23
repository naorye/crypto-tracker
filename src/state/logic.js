import { createLogic } from 'redux-logic';
import { logoutUser } from './user-profile/actions';
import { fetchAllTokens } from './all-tokens/actions';
import { clearUserTokens, openEditTokensModal } from './user-tokens/actions';

export * from './user-profile/logic';
export * from './user-tokens/logic';
export * from './all-tokens/logic';


export const clearTokens = createLogic({
    type: logoutUser,

    async process(_, dispatch, done) {
        dispatch(clearUserTokens());
        done();
    },
});


export const fetchAllTokensOnEditModalOpen = createLogic({
    type: openEditTokensModal,

    async process(_, dispatch, done) {
        dispatch(fetchAllTokens());
        done();
    },
});
