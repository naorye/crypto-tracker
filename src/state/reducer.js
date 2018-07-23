import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userProfileReducer, { namespace as userProfileNamespace } from './user-profile/reducer';
import userTokensReducer, { namespace as userTokensNamespace } from './user-tokens/reducer';
import allTokensReducer, { namespace as allTokensNamespace } from './all-tokens/reducer';

export default function createReducer(asyncReducers) {
    return combineReducers({
        router: routerReducer,
        [userProfileNamespace]: userProfileReducer,
        [userTokensNamespace]: userTokensReducer,
        [allTokensNamespace]: allTokensReducer,
        ...asyncReducers,
    });
}
