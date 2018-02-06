import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import {Redirect} from 'react-router'
import Login from './components/home/Login';
import Profile from './components/profile/Profile';
import Signup from './components/home/Signup';
import Reset from './components/home/Reset';
import FullSearch from './components/search/FullSearch';
import LaterSearch from './components/search/LaterSearch';
import Results from './components/results/Results';
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
    const {error, source, destination} = this.props.search
    const {loggedIn} = this.props

    return (
      <div className="App">
        <Switch>
          <Route exact path='/signup' render={()=> {
            return (loggedIn? <Profile />: <Signup />)
          }}/>
          <Route exact path='/search' render={()=> {
            return (loggedIn? <FullSearch /> : <Login />)
          }}/>
          <Route exact path='/later' render={()=> {
            return (loggedIn? <LaterSearch /> : <Login />)
          }}/>
          <Route exact path='/reset' render={()=> {
            return (loggedIn? <Profile /> : <Reset />)
          }}/>
          <Route exact path='/results' render={()=> {
            return (loggedIn && !error && source && destination? <Results /> : <FullSearch />)
          }}/>
          <Route exact path='/profile' render={()=> {
            return (loggedIn? <Profile /> : <Login />)
          }}/>
          <Route exact path='/login' render={()=> {
            return (loggedIn? <Profile /> : <Login />)
          }}/>
          <Route exact path='/' render={() => {
            return (loggedIn? <Profile /> : <Login />)
          }}/>

        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: !!state.auth.currentUser.id,
  search: state.loc.search
});

export default connect(mapStateToProps, actions)(App);
