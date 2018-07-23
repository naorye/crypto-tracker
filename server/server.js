import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import routes from './controllers';
import { notFoundError, serverError } from './middleware/error';

const app = express();

app.use(morgan('tiny'));

app.use(cookieParser());

app.use(routes);

app.use(notFoundError);
app.use(serverError);

export default app;

