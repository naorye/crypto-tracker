import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from './header';

@withStyles({
    root: {
    },
})


export default class App extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        children: PropTypes.element.isRequired,
    };

    render() {
        const { classes, children } = this.props;
        return (
            <div className={ classes.root }>
                <Header />
                <main>
                    { children }
                </main>
            </div>
        );
    }
}
