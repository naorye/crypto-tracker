import update from 'immutability-helper';
import { createReducer } from 'redux-act';
import * as actions from './actions';

export const namespace = 'userProfile';

const initialState = {
    isLoading: false,
    isLoggedIn: false,
    loginError: undefined,
    username: undefined,
    name: undefined,
};

export default createReducer({
    [actions.logoutUser]: state =>
        update(state, {
            isLoggedIn: { $set: false },
            isLoading: { $set: false },
            loginError: { $set: undefined },
            username: { $set: undefined },
            name: { $set: undefined },
        }),

    [actions.loginUser]: state =>
        update(state, {
            isLoggedIn: { $set: false },
            isLoading: { $set: true },
            loginError: { $set: undefined },
        }),

    [actions.loginUserFailed]: (state, { error }) =>
        update(state, {
            isLoggedIn: { $set: false },
            isLoading: { $set: false },
            loginError: { $set: error },
        }),

    [actions.loginUserSuccess]: (state, { username, name }) =>
        update(state, {
            isLoggedIn: { $set: true },
            isLoading: { $set: false },
            loginError: { $set: undefined },
            username: { $set: username },
            name: { $set: name },
        }),

}, initialState);

const isLoginLoading = state => state[namespace].isLoading;
const getLoginError = state => state[namespace].loginError;
const isLoggedIn = state => state[namespace].isLoggedIn;
const getUsername = state => state[namespace].username;
const getName = state => state[namespace].name;

export const selectors = {
    isLoginLoading,
    getLoginError,
    isLoggedIn,
    getUsername,
    getName,
};
