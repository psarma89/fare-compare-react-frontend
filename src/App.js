import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import Login from './components/root/Login';
import Profile from './components/home/Profile';
import * as actions from './actions';
import {testAPI} from './API.js';

class App extends Component {

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.fetchUser();
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
        <Route exact path='/profile' render={()=> {
            return (this.props.loggedIn? <Profile /> : <Login />)
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
