import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import Home from '../pages/home';
import Login from '../pages/login';
const customHistory = createBrowserHistory();
console.log('react-router-dom');
const BasicRoute = () => (
    <Router history={customHistory}>
        <Switch>
            <Route path="/home" component={Home}></Route>
            <Route path="/login" component={Login}></Route>
            <Route exact path="/" component={Login}></Route>
        </Switch>
    </Router>
);

export default BasicRoute;
