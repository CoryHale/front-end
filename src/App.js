import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login/Login';
import Register from './components/Register';
import MainApp from './components/MainApp';
import PrivateRoute from './components/Login/PrivateRoute';

class App extends Component {
  render() {
    return (
      <Router>
        <header className="header">
          <h1>TripSplit</h1>
        </header>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/trip-split" component={MainApp} />
      </Router>
    );
  }
}

export default App;
