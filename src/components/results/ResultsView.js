import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import { Icon} from 'semantic-ui-react';

class ResultsView extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    console.log(this.props)
    const {source, destination} = this.props.search
    this.props.getUberData(source, destination)
  }

  handleFormSubmit = (event) => {

  }

  handleClick = (event) => {

  }

  render() {
    console.log(this.props)
    // console.log(this.state)
    const {startAddress, endAddress} = this.props.search
    return (
      <div>
        <h1>Results</h1>
        <p>Start: {startAddress}</p>
        <p>Destination: {endAddress}</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  search: state.loc.search
});

export default withRouter(connect(mapStateToProps, actions)(ResultsView))
