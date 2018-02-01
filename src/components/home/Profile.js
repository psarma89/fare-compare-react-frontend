import React from 'react';
import withAuth from '../../hocs/withAuth';
import { NavLink } from 'react-router-dom';

const Profile = props => {
  return (
    <div>
      <h1>Congrats You are Logged In</h1>
      <NavLink
        onClick={props.logoutUser}
        to="/login">
        Sign Out
      </NavLink>
    </div>
  );
};

export default withAuth(Profile);
