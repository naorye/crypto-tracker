import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { selectors } from '../../state/user-tokens/reducer';
import * as actions from '../../state/user-tokens/actions';

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
}))

@connect(
    (state) => {
        const error = selectors.getUserTokensError(state);
        const userTokens = selectors.getUserTokens(state);
        return { error, userTokens };
    },
    {
        fetchUserTokens: actions.fetchUserTokens,
    },
)

export default class TokensList extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        userTokens: PropTypes.arrayOf(PropTypes.shape({
            tokenId: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            symbol: PropTypes.string.isRequired,
            rank: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired,
            percentChange1h: PropTypes.string.isRequired,
            percentChange24h: PropTypes.string.isRequired,
            percentChange7d: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
        })),
        error: PropTypes.string,
        fetchUserTokens: PropTypes.func,
    };

    static defaultProps = {
        error: undefined,
        userTokens: [],
        fetchUserTokens: () => { },
    };

    componentDidMount() {
        this.props.fetchUserTokens();
    }

    render() {
        const { classes, userTokens, error } = this.props;

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
                                <TableRow key={ n.id }>
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
            </Paper>
        );
    }
}
