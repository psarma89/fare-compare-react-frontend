import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import Login from './components/home/Login';
import Profile from './components/profile/Profile';
import Signup from './components/home/Signup';
import Reset from './components/home/Reset';
import FullSearch from './components/search/FullSearch';
import LaterSearch from './components/search/LaterSearch';
import * as actions from './actions';
import {testAPI} from './API.js';

class App extends Component {

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.fetchUser();
      this.props.getLocation();
    }
  }

  render() {
    // testAPI()
    // console.log(this.props)
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={() => {
            return (this.props.loggedIn? <Profile /> : <Login />)
          }}/>
        <Route exact path='/login' render={()=> {
            return (this.props.loggedIn? <Profile /> : <Login />)
          }}/>
        <Route exact path='/signup' render={()=> {
            return (this.props.loggedIn? <Profile /> : <Signup />)
          }}/>
        <Route exact path='/search' render={()=> {
              return (this.props.loggedIn? <FullSearch /> : <Login />)
          }}/>
        <Route exact path='/later' render={()=> {
              return (this.props.loggedIn? <LaterSearch /> : <Login />)
        }}/>
        <Route exact path='/profile' render={()=> {
            return (this.props.loggedIn? <Profile /> : <Login />)
          }}/>
        <Route exact path='/reset' render={()=> {
            return (this.props.loggedIn? <Profile /> : <Reset />)
          }}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: !!state.auth.currentUser.id
});

export default connect(mapStateToProps, actions)(App);
