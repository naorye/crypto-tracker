import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import App from './components/app';
import UserTokens from './components/pages/user-tokens';
import Login from './components/pages/login';

export default function Routes() {
    return (
        <App>
            <Switch>
                <Route exact path="/" component={ UserTokens } />
                <Route path="/login" component={ Login } />

                <Redirect from="/*" to="/" />
            </Switch>
        </App>
    );
}
