import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import withLoggedIn from '../../hocs/withLoggedIn';
import NavBar from '../common/NavBar';
import * as actions from '../../actions';
import {renderComponents} from '../../services/renderComponents';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      fields: {
        email: '',
        password: ''
      }
    };
  }

  handleChange = e => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { fields: { email, password } } = this.state;
    this.props.loginUser(email, password, this.props.history);
  };

  render() {
    const { fields } = this.state;
    const {emailComponent, passwordComponent} = renderComponents.auth
    const {error} = this.props

    return (
      <div id="login">
        <NavBar />

        <div className="ui center aligned inverted segment container" id="login-box">

          <div className="ui centered header">
            <h1 className="font">Sign Into Your Account</h1>
          </div>

          <form className="ui form" onSubmit={this.handleSubmit}>
            {emailComponent(fields.email, this.handleChange)}
            {passwordComponent(fields.password, this.handleChange)}

            <div className="field">
              <NavLink to="/reset">
                Forgot Password
              </NavLink>
            </div>

            <div className="one ui buttons">
              <button className="ui blue large button">Sign In</button>
            </div>
          </form>
        </div>

        {error ? <div className="ui center aligned inverted segment container" id="error-box">
          <h1>{error}</h1>
        </div> : null}
      </div>

    );
  }
}

const mapStateToProps = state => ({
  error: state.auth.currentUser.error
});

export default withLoggedIn(withRouter(connect(mapStateToProps, actions)(Login)));
//
// export default withRouter(withAuth(Login));
