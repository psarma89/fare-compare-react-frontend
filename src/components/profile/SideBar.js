import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import * as actions from '../../actions';

class SideBar extends Component {
  state = { visible: false }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {

    const { visible } = this.state
    return (
      <div>
        <Button onClick={this.toggleVisibility}>Menu</Button>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='overlay' width='thin' visible={visible} icon='labeled' vertical inverted>
            <Menu.Item name='ridenow'>
              <Icon name='taxi' />
              Find Rides Now
            </Menu.Item>
            <Menu.Item name='ridelater'>
              <Icon name='car' />
              Find Rides Later
            </Menu.Item>
            <Menu.Item name='signout'>
              <Icon name='sign out' />
              <NavLink
                onClick={this.props.logoutUser}
                to="/login">
                Sign Out
              </NavLink>
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

// const mapStateToProps = state => ({
//   loggedIn: !!state.auth.currentUser.id
// });

export default withRouter(connect(null, actions)(SideBar));
