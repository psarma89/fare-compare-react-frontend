import React from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import NavBar from '../root/NavBar';
import * as actions from '../../actions';

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      fields: {
        email: '',
        password: '',
        passwordConfirmation: ''
      }
    };
  }

  handleChange = e => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { fields: { email, password, passwordConfirmation } } = this.state;
    this.props.signupUser(email, password, passwordConfirmation, this.props.history);
  };

  render() {
    // console.log(this.props)
    const { fields } = this.state;
    return (
      <div>
        <NavBar />
        {this.props.error ? <h1>{this.props.error}</h1> : null}
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
            <div className="ui field">
              <label>Password Confirmation</label>
              <input
                name="passwordConfirmation"
                type="password"
                placeholder="password"
                value={fields.passwordConfirmation}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="ui basic green button">
              Signup
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.auth.currentUser.error
});

export default withRouter(connect(mapStateToProps, actions)(Signup));
//
// export default withRouter(withAuth(Login));
