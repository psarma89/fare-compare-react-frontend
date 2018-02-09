import React from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import withLoggedIn from '../../hocs/withLoggedIn';
import NavBar from '../common/NavBar';
import * as actions from '../../actions';
import {renderComponents} from '../../services/renderComponents';

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
        <h2>Sign Up Page</h2>
        <div className="ui form">
          <form onSubmit={this.handleSubmit}>
            {renderComponents.auth.emailComponent(fields.email, this.handleChange)}
            {renderComponents.auth.passwordComponent(fields.password, this.handleChange)}
            {renderComponents.auth.passwordConfirmationComponent(fields.passwordConfirmation, this.handleChange)}
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

export default withLoggedIn(withRouter(connect(mapStateToProps, actions)(Signup)));
//
// export default withRouter(withAuth(Login));
