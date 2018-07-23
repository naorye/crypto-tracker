import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { selectors } from '../../state/all-tokens/reducer';
import { selectors as userTokenSelectors } from '../../state/user-tokens/reducer';
import * as userTokensActions from '../../state/user-tokens/actions';

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
    container: {
        height: '500px',
        width: '400px',
        overflow: 'scroll',
    },
    snackbar: {
        margin: theme.spacing.unit,
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
}))

@connect(
    (state) => {
        const fetchError = selectors.getAllTokensError(state);
        const allTokens = selectors.getAllTokens(state);
        const isLoading = selectors.isAllTokensLoading(state);
        const userTokensIds = userTokenSelectors.getUserTokenIds(state);
        return {
            fetchError, isLoading, allTokens, userTokensIds,
        };
    },
    {
        saveUserTokens: userTokensActions.saveUserTokens,
    },
)

export default class EditTokensModal extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        allTokens: PropTypes.arrayOf(PropTypes.shape({
            tokenId: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
        })),
        userTokensIds: PropTypes.arrayOf(PropTypes.number),
        fetchError: PropTypes.string,
        isLoading: PropTypes.bool,
        saveUserTokens: PropTypes.func,
        isOpen: PropTypes.bool,
        onClose: PropTypes.func,
    };

    static defaultProps = {
        fetchError: undefined,
        allTokens: [],
        userTokensIds: [],
        isLoading: false,
        isOpen: false,
        saveUserTokens: () => { },
        onClose: () => { },
    };

    state = {
        tokenIds: [],
    }

    componentWillReceiveProps(newProps) {
        const { userTokensIds } = newProps;
        if (userTokensIds !== this.props.userTokensIds) {
            this.setState({ tokenIds: userTokensIds });
        }
    }

    saveUserTokens = () => {
        const { saveUserTokens } = this.props;
        const { tokenIds } = this.state;
        saveUserTokens(tokenIds);
    }

    handleToggle = (tokenId) => {
        let { tokenIds } = this.state;
        const index = tokenIds.indexOf(tokenId);
        if (index === -1) {
            tokenIds = [ ...tokenIds, tokenId ];
        } else {
            tokenIds.splice(index, 1);
        }
        this.setState({ tokenIds });
    }

    render() {
        const {
            classes, fetchError, isOpen, onClose, allTokens,
            isLoading,
        } = this.props;

        const { tokenIds } = this.state;

        return (
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={ isOpen }
                onClose={ onClose }
            >
                <div className={ classes.paper }>
                    <Typography variant="title" id="modal-title">
                        Edit List
                    </Typography>

                    <div className={ classes.container }>
                        {
                            isLoading && (
                                <CircularProgress className={ classes.progress } size={ 50 } />
                            )
                        }
                        {
                            !isLoading && (
                                <List className={ classes.list }>
                                    {allTokens.map(token => (
                                        <ListItem
                                            key={ token.tokenId }
                                            dense
                                            button
                                            onClick={ () => this.handleToggle(token.tokenId) }
                                            className={ classes.listItem }
                                        >
                                            <Checkbox
                                                checked={ tokenIds.indexOf(token.tokenId) !== -1 }
                                                tabIndex={ -1 }
                                                disableRipple
                                            />
                                            <ListItemText primary={ token.name } />
                                        </ListItem>
                                    ))}
                                </List>
                            )
                        }
                    </div>

                    <Button variant="contained" color="primary" className={ classes.button } onClick={ this.saveUserTokens }>
                        Save
                    </Button>

                    {
                        fetchError && (
                            <SnackbarContent
                                className={ classes.snackbar }
                                message={ fetchError }
                            />
                        )
                    }
                </div>
            </Modal>
        );
    }
}
