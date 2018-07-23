import express, { Router } from 'express';
import proxy from 'http-proxy-middleware';
import config from '../config';
import renderApp from './app-renderer';

const router = Router();

router.get('^/$', renderApp);

router.use(express.static(config.clientBuildPath));

if (process.env.NODE_ENV === 'development') {
    // Handle development web socket for hot reload
    router.use(proxy('/sockjs-node', { target: config.clientDevelopmentServer, ws: true }));
}

router.get('*', renderApp);

export default router;
