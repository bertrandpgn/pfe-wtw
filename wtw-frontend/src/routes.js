import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Config from './components/Config';

export default () => (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/config" exact component={Config} />
    </Switch>
);
