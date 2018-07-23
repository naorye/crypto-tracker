import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userProfileReducer, { namespace as userProfileNamespace } from './user-profile/reducer';
import userTokensReducer, { namespace as tuserTokensNamespace } from './user-tokens/reducer';

export default function createReducer(asyncReducers) {
    return combineReducers({
        router: routerReducer,
        [userProfileNamespace]: userProfileReducer,
        [tuserTokensNamespace]: userTokensReducer,
        ...asyncReducers,
    });
}
