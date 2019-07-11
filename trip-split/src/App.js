import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup';
import PrivateRoute from './components/Login/PrivateRoute';

class App extends Component {
  
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component = { Login }/>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/trip-split" render = { props => <div>hello</div> }/>
      </Router>
    );
  }
}

export default App;
