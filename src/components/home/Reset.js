import React from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import withLoggedIn from '../../hocs/withLoggedIn';
import NavBar from '../common/NavBar';
import * as actions from '../../actions';
import {renderComponents} from '../../services/renderComponents';

class Reset extends React.Component {
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
    this.props.updateUser(email, password, this.props.history);
  };

  render() {
    const { fields } = this.state;
    return (
      <div>
        <NavBar />
        {this.props.error ? <h1>{this.props.error}</h1> : null}
        <h2>Reset Page</h2>
        <div className="ui form">
          <form onSubmit={this.handleSubmit}>
            {renderComponents.auth.emailComponent(fields.email, this.handleChange)}
            {renderComponents.auth.passwordComponent(fields.password, this.handleChange)}
            <button type="submit" className="ui basic green button">
              Update Password
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

export default withLoggedIn(withRouter(connect(mapStateToProps, actions)(Reset)));
//
// export default withRouter(withAuth(Login));
