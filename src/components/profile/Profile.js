import React, { Component } from 'react';
import withAuth from '../../hocs/withAuth';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import * as actions from '../../actions';
import TopMenu from '../common/TopMenu';
import MenuSearch from '../common/MenuSearch';
import SideBar from '../common/SideBar';
import {renderComponents} from '../../services/renderComponents';

class Profile extends Component {
  state = { visible: false }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible } = this.state

    return (
      <div>
        <TopMenu toggleVisibility={this.toggleVisibility} menuSearch={<MenuSearch />}/>
        <SideBar visible={visible} component={renderComponents.map.mapComponent()} logoutUser={this.props.logoutUser}/>
      </div>
    )
  }
}

// const mapStateToProps = state => ({
//   loggedIn: !!state.auth.currentUser.id
// });

export default withAuth(withRouter(connect(null, actions)(Profile)));
