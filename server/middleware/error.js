import chalk from 'chalk';

export function notFoundError(error, req, res, next) {
    if (!error) {
        const err = new Error(`Not Found: ${req.url}`);
        err.status = 404;
        next(err);
    } else {
        next(error);
    }
}

export function serverError(error, req, res) {
    console.log(`${chalk.red('[Error]')} ${req.path} (serverError) ${error.message || error}`);

    /* eslint-disable-next-line no-param-reassign */
    error.reqBody = req.body;

    res.status(error.status || 500);
    if (process.env.NODE_ENV === 'production') {
        res.json('Server Error');
    } else {
        res.json(error);
    }
}
