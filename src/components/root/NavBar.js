import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = props => {
  return (
    <div>
      <NavLink to="/signup">
        Sign Up
      </NavLink>
      <NavLink to="/">
        Login
      </NavLink>
    </div>
  );
}

export default NavBar;
