import React from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import style from './style.scss';

export default function App(props) {
    const { children } = props;
    return (
        <div className={ style.app }>
            <Header />
            <main>
                { children }
            </main>
        </div>
    );
}

App.propTypes = {
    children: PropTypes.element.isRequired,
};
