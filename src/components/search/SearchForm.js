import React, {Component} from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = { source: '', destination: '' }
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    console.log(this.state)

    geocodeByAddress(this.state.source)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))

    geocodeByAddress(this.state.destination)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))

  }

  render() {
    const cssClasses = {
      root: 'form-group',
      input: 'form-control',
      autocompleteContainer: 'my-autocomplete-container'
    }

    const inputPropsSource = {
      value: this.state.source,
      onChange: (address) => this.setState({ source: address }),
      placeholder: 'current location'
    }

    const inputPropsDestination = {
      value: this.state.destination,
      onChange: (address) => this.setState({ destination: address }),
      placeholder: 'Search Destination ...'
    }

    return (
      <form onSubmit={this.handleFormSubmit}>
        <label>Source</label>
        <PlacesAutocomplete inputProps={inputPropsSource} classNames={cssClasses}/>
        <PlacesAutocomplete inputProps={inputPropsDestination} classNames={cssClasses}/>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default SearchForm
