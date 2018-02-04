import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import * as actions from '../../actions';
import { Icon} from 'semantic-ui-react';

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = { source: '', destination: '' }
  }

  componentDidMount(){
    this.props.getSearchData()
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    const {source, destination} = this.state
    const {postSearchData, history} = this.props

    postSearchData(source, history)
    postSearchData(destination, history)

    geocodeByAddress(source)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Source', latLng))
      .catch(error => console.error('Error', error))

    geocodeByAddress(destination)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Destination', latLng))
      .catch(error => console.error('Error', error))

  }

  handleClick = (event) => {
    const selectedButton = event.target.name
    const address = event.target.parentNode.querySelector('p').innerText
    switch (selectedButton) {
      case "source":
        this.setState({source: address})
        break;
      case "destination":
        this.setState({destination: address})
        break;
      default:
    }
  }

  render() {
    const {source, destination} = this.state
    const {addresses} = this.props

    const cssClasses = {
      root: 'form-group',
      input: 'form-control',
      autocompleteContainer: 'my-autocomplete-container'
    }

    const inputPropsSource = {
      value: source,
      onChange: (address) => this.setState({ source: address }),
      placeholder: 'current location'
    }

    const inputPropsDestination = {
      value: destination,
      onChange: (address) => this.setState({ destination: address }),
      placeholder: 'Search Destination ...'
    }

    const previousSearches = addresses.map((address,i) => {
      return(
        <div key={i}>
          <Icon name='compass' />
          <p data-id="address">{address[0]}</p>
          <button onClick= {this.handleClick} name="source" type="button">Source</button>
          <button onClick= {this.handleClick} name="destination" type="button">Destination</button>
        </div>
      )
    })

    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Source</label>
          <PlacesAutocomplete inputProps={inputPropsSource} classNames={cssClasses}/>
          <label>Destination</label>
          <PlacesAutocomplete inputProps={inputPropsDestination} classNames={cssClasses}/>
          <button type="submit">Submit</button>
        </form>
        {previousSearches}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  addresses: state.post.addresses
});

export default withRouter(connect(mapStateToProps, actions)(SearchForm))
