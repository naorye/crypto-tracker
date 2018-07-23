import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { selectors } from '../../state/user-profile/reducer';
import * as actions from '../../state/user-profile/actions';

@withStyles(theme => ({
    paper: {
        position: 'absolute',
        // width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%',
    },
    form: {
        width: '350px',
        '&:after': {
            content: '""',
            display: 'table',
            clear: 'both',
        },
    },
    button: {
        marginTop: `${theme.spacing.unit * 3}px`,
        float: 'right',
    },
    snackbar: {
        margin: theme.spacing.unit,
    },
}))

@connect(
    (state) => {
        const loginError = selectors.getLoginError(state);
        return { loginError };
    },
    {
        loginUser: actions.loginUser,
    },
)

export default class LoginModal extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        loginError: PropTypes.string,
        loginUser: PropTypes.func,
    };

    static defaultProps = {
        loginError: undefined,
        loginUser: () => {},
    };

    state ={
        username: '',
        password: '',
    }

    loginUser = () => {
        const { loginUser } = this.props;
        const { username, password } = this.state;
        loginUser(username, password);
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { classes, loginError } = this.props;

        return (
            <div className={ classes.paper }>
                <Typography variant="title" id="modal-title">
                    Login
                </Typography>

                <form className={ classes.form } noValidate autoComplete="off">
                    <TextField
                        name="username"
                        label="Username"
                        className={ classes.textField }
                        margin="normal"
                        onChange={ this.handleChange }
                    />
                    <TextField
                        name="password"
                        label="Password"
                        className={ classes.textField }
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        onChange={ this.handleChange }
                    />
                    <Button variant="contained" color="primary" className={ classes.button } onClick={ this.loginUser }>
                        Login
                    </Button>
                </form>

                {
                    loginError && (
                        <SnackbarContent
                            className={ classes.snackbar }
                            message={ loginError }
                        />
                    )
                }
            </div>
        );
    }
}
