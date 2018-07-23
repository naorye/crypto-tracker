import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import EditTokensModal from './edit-tokens-modal';
import { selectors } from '../../state/user-tokens/reducer';
import * as actions from '../../state/user-tokens/actions';
import { selectors as userProfile } from '../../state/user-profile/reducer';

@withStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    snackbar: {
        margin: theme.spacing.unit,
    },
    button: {
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
}))

@connect(
    (state) => {
        const error = selectors.getUserTokensError(state);
        const userTokens = selectors.getUserTokens(state);
        const isLoggedIn = userProfile.isLoggedIn(state);
        const isAddModalOpen = selectors.isEditTokensModalOpen(state);
        return {
            isLoggedIn, error, userTokens, isAddModalOpen,
        };
    },
    {
        fetchUserTokens: actions.fetchUserTokens,
        openEditTokensModal: actions.openEditTokensModal,
        closeEditTokensModal: actions.closeEditTokensModal,
    },
)

export default class TokensList extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        isLoggedIn: PropTypes.bool,
        userTokens: PropTypes.arrayOf(PropTypes.shape({
            tokenId: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            symbol: PropTypes.string.isRequired,
            rank: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            percentChange1h: PropTypes.number.isRequired,
            percentChange24h: PropTypes.number.isRequired,
            percentChange7d: PropTypes.number.isRequired,
            icon: PropTypes.string.isRequired,
        })),
        error: PropTypes.string,
        isAddModalOpen: PropTypes.bool,
        fetchUserTokens: PropTypes.func,
        openEditTokensModal: PropTypes.func,
        closeEditTokensModal: PropTypes.func,
    };

    static defaultProps = {
        isLoggedIn: false,
        error: undefined,
        userTokens: [],
        isAddModalOpen: false,
        fetchUserTokens: () => { },
        openEditTokensModal: () => {},
        closeEditTokensModal: () => {},
    };

    componentDidMount() {
        this.props.fetchUserTokens();
    }

    render() {
        const {
            classes, userTokens, error, isLoggedIn,
            openEditTokensModal, closeEditTokensModal,
            isAddModalOpen,
        } = this.props;

        return (
            <Paper className={ classes.root }>
                {
                    error && (
                        <SnackbarContent
                            className={ classes.snackbar }
                            message={ error }
                        />
                    )
                }
                <Table className={ classes.table }>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Name</TableCell>
                            <TableCell>Symbol</TableCell>
                            <TableCell numeric>Rank</TableCell>
                            <TableCell numeric>Price</TableCell>
                            <TableCell numeric>1h Change (%)</TableCell>
                            <TableCell numeric>24h Change (%)</TableCell>
                            <TableCell numeric>7d Change (%)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            userTokens.map(n => (
                                <TableRow key={ n.tokenId }>
                                    <TableCell><img src={ n.icon } alt="icon" /></TableCell>
                                    <TableCell>{ n.name }</TableCell>
                                    <TableCell>{ n.symbol }</TableCell>
                                    <TableCell numeric>{ n.rank }</TableCell>
                                    <TableCell numeric>{ n.price }</TableCell>
                                    <TableCell numeric>{ n.percentChange1h }</TableCell>
                                    <TableCell numeric>{ n.percentChange24h }</TableCell>
                                    <TableCell numeric>{ n.percentChange7d }</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                {
                    isLoggedIn && (
                        <Button
                            variant="fab"
                            color="primary"
                            aria-label="Add"
                            className={ classes.button }
                            onClick={ openEditTokensModal }
                        >
                            <AddIcon />
                        </Button>
                    )
                }
                <EditTokensModal isOpen={ isAddModalOpen } onClose={ closeEditTokensModal } />
            </Paper>
        );
    }
}
