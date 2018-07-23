import { createLogic } from 'redux-logic';
import { logoutUser } from './user-profile/actions';
import { clearUserTokens } from './user-tokens/actions';

export * from './user-profile/logic';
export * from './user-tokens/logic';


export const clearTokens = createLogic({
    type: logoutUser,

    async process(_, dispatch, done) {
        dispatch(clearUserTokens());
        done();
    },
});
