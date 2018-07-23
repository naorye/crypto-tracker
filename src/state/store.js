import { createStore, applyMiddleware, compose } from 'redux';
import { createLogicMiddleware } from 'redux-logic';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import history from './history';
import createReducer from './reducer';
import * as logic from './logic';

let store;

export function getStore() {
    return store;
}

export function getState() {
    return store.getState();
}

export function dispatch(action) {
    return store.dispatch(action);
}

export default function configureStore(initialState = {}) {
    const logicArray = Object.keys(logic).map(key => logic[key]);
    const logicMiddleware = createLogicMiddleware(logicArray);
    const routerMiddleware = createRouterMiddleware(history);

    const middlewares = [
        logicMiddleware,
        routerMiddleware,
    ];

    if (process.env.NODE_ENV === 'development' && process.env.BROWSER) {
        const logger = createLogger();
        middlewares.push(logger);
    }

    const enhancers = [
        applyMiddleware(...middlewares),
    ];

    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    /* eslint-disable no-underscore-dangle */
    const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
    /* eslint-enable */

    store = createStore(
        createReducer(),
        initialState,
        composeEnhancers(...enhancers),
    );

    store.asyncReducers = {}; // Async reducer registry

    return { store, history };
}

export function injectAsyncReducer(name, asyncReducer) {
    store.asyncReducers[name] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
}
