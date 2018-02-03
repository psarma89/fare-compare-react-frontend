import React from 'react';
import {connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const navComponents = (url) => {
  if (url === "/login" || url === "/") {
    return(
      <div className="ui massive inverted stackable menu">
        <div className="item">
          <img src="/images/logo.png" alt=""/>
        </div>
        <a className="item" href="signup">Sign Up</a>
      </div>
    )
  }else if (url === "/signup") {
    return(
      <div className="ui massive inverted stackable menu">
        <div className="item">
          <img src="/images/logo.png" alt=""/>
        </div>
        <a className="item" href="/login">Log In</a>
      </div>
    )
  }else if (url === "/reset") {
    return(
      <div className="ui massive inverted stackable menu">
        <div className="item">
          <img src="/images/logo.png" alt=""/>
        </div>
        <a className="item" href="/login">Log In</a>
        <a className="item" href="/signup">Sign Up</a>
      </div>
    )
  }else {
    return(null)
  }
}

const NavBar = props => {

  return (
    navComponents(props.url)
  );
}

const mapStateToProps = (state,ownProps) => ({
  url: ownProps.match.url
});

export default withRouter(connect(mapStateToProps)(NavBar));
