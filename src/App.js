import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Switch, Route, withRouter} from 'react-router-dom';
import {Redirect} from 'react-router'
import Login from './components/home/Login';
import Profile from './components/profile/Profile';
import Signup from './components/home/Signup';
import Reset from './components/home/Reset';
import FullSearch from './components/search/FullSearch';
import Results from './components/results/Results';
import * as actions from './actions';
import {testAPI} from './API.js';

class App extends Component {

  render() {
    // testAPI()

    return (
      <div className="App">
        <Switch>
          <Route exact path='/signup' component={Signup}/>
          <Route exact path='/search' component={FullSearch}/>
          <Route exact path='/reset' component={Reset}/>
          <Route exact path='/results' component={Results}/>
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/login' component={Login}/>
          <Route exact path='/' component={Login}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(null, actions)(App));
