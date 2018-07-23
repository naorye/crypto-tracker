import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';
import createMemoryHistory from 'history/createMemoryHistory';
import Main from './main';

const mockStore = configureStore();

describe('Main', () => {
    let store;
    let history;

    beforeEach(() => {
        store = mockStore({});
        history = createMemoryHistory();
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Main store={ store } history={ history } />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
