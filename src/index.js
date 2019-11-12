import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'

import Home from './pages/Home';
import Stats from './pages/Stats';

import './styles/main.scss';

import * as serviceWorker from './serviceWorker';
import Menu from './components/Menu';

const routing = (
    <Router>
        <div>
            <Menu />
            <Route exact path="/" component={Home} />
            <Route path="/stats" component={Stats} />
        </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
