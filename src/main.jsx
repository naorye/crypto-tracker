import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Routes from './routes';
import './style.scss';

export default function Main(props) {
    const { store, history } = props;
    return (
        <Provider store={ store }>
            <ConnectedRouter history={ history }>
                <Routes />
            </ConnectedRouter>
        </Provider>
    );
}

Main.propTypes = {
    store: PropTypes.shape({
        subscribe: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
        getState: PropTypes.func.isRequired,
    }).isRequired,
    history: PropTypes.object.isRequired, /* eslint-disable-line react/forbid-prop-types */
};
