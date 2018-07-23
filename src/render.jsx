import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';
import './style.scss';

export function render(store, history) {
    if (process.env.NODE_ENV === 'development') {
        window.React = React; // For chrome dev tool support
    }

    const root = document.getElementById('root');
    ReactDOM.render(
        <Main store={ store } history={ history } />,
        root,
    );
}
