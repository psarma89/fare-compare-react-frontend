import {connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { renderComponents } from '../../services/renderComponents';


const NavBar = props => {

  return (
    renderComponents.nav.navComponents(props.url)
  );
}

const mapStateToProps = (state,ownProps) => ({
  url: ownProps.match.url
});

export default withRouter(connect(mapStateToProps)(NavBar));
