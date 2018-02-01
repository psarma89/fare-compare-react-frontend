import React from 'react';
import { connect } from 'react-redux';
import withAuth from '../../hocs/withAuth';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      error: false,
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
    return (
      <div>
        {this.state.error ? <h1>Try Again</h1> : null}
        <div className="ui form">
          <form onSubmit={this.handleSubmit}>
            <div className="ui field">
              <label>Email</label>
              <input
                name="email"
                placeholder="email"
                value={fields.email}
                onChange={this.handleChange}
              />
            </div>
            <div className="ui field">
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="password"
                value={fields.password}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="ui basic green button">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, actions)(Login));
//
// export default withRouter(withAuth(Login));
