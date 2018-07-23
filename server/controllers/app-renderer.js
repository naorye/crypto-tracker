import React from 'react';
import chalk from 'chalk';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { ConnectedRouter, push } from 'react-router-redux';
import { readPath } from '../services/files-manager';
import config from '../config';
import Routes from '../../src/routes';
import configureStore from '../../src/state/store';

const buildTime = new Date().toLocaleTimeString();

const indexPath = `${config.clientBuildPath}/index.html`;

export default async function renderApp(req, res, next) {
    let isDebug = false;
    try {
        isDebug = req.cookies.renderAppDebug === 'true';
    } catch (e) {
        console.log('Error reading debug cookie');
    }

    try {
        const indexHtml = await readPath(indexPath);

        const { store, history } = configureStore();
        store.dispatch(push(req.url));

        /* eslint-disable react/jsx-filename-extension */
        const appHtml = ReactDOMServer.renderToString((
            <Provider store={ store }>
                <ConnectedRouter history={ history } isSSR>
                    <Routes />
                </ConnectedRouter>
            </Provider>
        ));

        const initialState = store.getState();

        let pageHtml = indexHtml.replace(
            '<div id="root"></div>',
            `
            <script>
                window.__APP_INITIAL_STATE__ = ${JSON.stringify(initialState)};
            </script>
            <div id="root">${appHtml}</div>`,
        );

        if (process.env.NODE_ENV === 'development' || isDebug) {
            pageHtml = pageHtml.replace(
                '</body>',
                `   <script>
                        var div = document.createElement('div');
                        div.setAttribute('style', 'background-color: black; color: white; position: absolute; top: 0; left: 0; font-size: 12px; font-family: \\'Arial\\';');
                        div.appendChild(document.createTextNode('Rendered at ${new Date().toLocaleTimeString()}'));
                        div.appendChild(document.createElement('br'));
                        div.appendChild(document.createTextNode('Built at ${buildTime}'));
                        document.body.appendChild(div);
                    </script>
                </body>`,
            );
        }

        if (process.env.NODE_ENV === 'development') {
            console.log(`${chalk.green('[Success]')} ${req.path} (renderApp)`);
        }

        res.send(pageHtml);
    } catch (err) {
        if (process.env.NODE_ENV === 'development') {
            console.log(`${chalk.red('[Failure]')} ${req.path} (renderApp)`);
        }

        next(err);
    }
}
