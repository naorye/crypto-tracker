import configureStore from './state/store';
import { render } from './render';
import * as actions from './state/user-profile/actions';

export function initialize() {
    const initialState = window.__APP_INITIAL_STATE__; // eslint-disable-line no-underscore-dangle
    const { store, history } = configureStore(initialState);

    store.dispatch(actions.refreshUserSession());

    render(store, history);
}

initialize();
