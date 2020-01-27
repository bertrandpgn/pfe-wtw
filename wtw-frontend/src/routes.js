import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Config from './components/Config';
import Users from './components/Users';

export default () => (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/config" exact component={Config} />
        <Route path="/users" exact component={Users} />
    </Switch>
);
