import { createLogic } from 'redux-logic';
import { push } from 'react-router-redux';
import * as actions from './actions';
import { selectors } from './reducer';
import { login, getUser } from '../../resources';

export const refreshUserSession = createLogic({
    type: actions.refreshUserSession,

    async process(x, dispatch, done) {
        const token = window.localStorage.getItem('token');
        if (token) {
            try {
                const { username, name } = await getUser.call({ token });
                dispatch(actions.loginUserSuccess(username, name));
            } catch (error) {
                window.localStorage.removeItem('token');
            }
        }
        done();
    },
});

export const loginUser = createLogic({
    type: actions.loginUser,

    validate({ getState, action }, allow, reject) {
        const { username, password } = action.payload;

        const state = getState();
        const isLoading = selectors.isLoginLoading(state);
        const isLoggedIn = selectors.isLoggedIn(state);
        const isValid = username && !!username.trim() && password && !!password.trim();

        if (isLoading || isLoggedIn || !isValid) {
            reject();
        } else {
            allow(action);
        }
    },

    async process({ action }, dispatch, done) {
        const { username, password } = action.payload;

        try {
            const { name, token } = await login.call({ username, password });

            window.localStorage.setItem('token', token);
            dispatch(actions.loginUserSuccess(username, name));
            dispatch(push('/'));
        } catch (error) {
            dispatch(actions.loginUserFailed(error.message));
        }

        done();
    },
});

export const logoutUser = createLogic({
    type: actions.logoutUser,

    validate({ getState, action }, allow, reject) {
        const state = getState();
        const isLoggedIn = selectors.isLoggedIn(state);

        if (!isLoggedIn) {
            reject();
        } else {
            allow(action);
        }
    },

    async process(x, dispatch, done) {
        window.localStorage.removeItem('token');
        dispatch(push('/login'));
        done();
    },
});
