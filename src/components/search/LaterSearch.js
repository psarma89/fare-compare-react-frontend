import React, { Component } from 'react';
import withAuth from '../../hocs/withAuth';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import * as actions from '../../actions';
import TopMenu from '../common/TopMenu';
import SideBar from '../common/SideBar';


class LaterSearch extends Component{

  constructor(){
    super()
    this.state = {
      visible: false
    }
  }
  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render(){
    const { visible } = this.state

    return(
      <div>
        <TopMenu toggleVisibility={this.toggleVisibility} />
        <SideBar visible={visible} component={<h1>Later Search</h1>} logoutUser={this.props.logoutUser}/>
      </div>
    )
  }

}

export default withAuth(withRouter(connect(null, actions)(LaterSearch)));
