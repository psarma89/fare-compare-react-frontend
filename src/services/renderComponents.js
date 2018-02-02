import React from 'react'

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

export const renderComponents = {
  nav: {
    navComponents
  }
};
