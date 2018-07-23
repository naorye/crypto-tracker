import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectors } from '../../state/user-profile/reducer';
import * as actions from '../../state/user-profile/actions';

@withStyles({
    root: {
        flexGrow: 1,
    },
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
})

@connect(
    (state) => {
        const isLoggedIn = selectors.isLoggedIn(state);
        const name = selectors.getName(state);
        return { isLoggedIn, name };
    },
    {
        logoutUser: actions.logoutUser,
    },
)


export default class Header extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        isLoggedIn: PropTypes.bool,
        name: PropTypes.string,
        logoutUser: PropTypes.func,
    };

    static defaultProps = {
        isLoggedIn: false,
        name: undefined,
        logoutUser: () => {},
    };

    render() {
        const {
            classes, isLoggedIn, name, logoutUser,
        } = this.props;
        return (
            <div className={ classes.root }>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={ classes.flex }>
                            Crypto Track
                            {
                                isLoggedIn && (
                                    `(Logged in as ${name})`
                                )
                            }
                        </Typography>
                        <Button component={ Link } to="/" color="inherit">Home</Button>
                        {
                            !isLoggedIn && (
                                <Button component={ Link } to="/login" color="inherit">Login</Button>
                            )
                        }
                        {
                            isLoggedIn && (
                                <Button color="inherit" onClick={ logoutUser }>Logout</Button>
                            )
                        }
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
