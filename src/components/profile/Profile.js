import React from 'react';
import withAuth from '../../hocs/withAuth';
import { NavLink } from 'react-router-dom';
import SideBar from './SideBar';
import Map from './Map';

const Profile = props => {

  return (
    <div>
      <SideBar />
    </div>
  );
};

export default withAuth(Profile);
