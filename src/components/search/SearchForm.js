import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress } from 'react-places-autocomplete';
import * as actions from '../../actions';
import { Icon} from 'semantic-ui-react';

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = { startAddress: '', endAddress: '', error: ''}
  }

  componentDidMount(){
    this.props.getSearchData()
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    const {startAddress, endAddress} = this.state
    const {updateSource, updateDestination, currentLocation, history} = this.props

    geocodeByAddress(startAddress).then(results => {
      if (results.length < 2) {
        updateSource(startAddress, currentLocation)
      }else {
        updateSource('', currentLocation)
      }
    }).catch(error => updateSource('', currentLocation))

    // updateSource(startAddress, currentLocation)

    geocodeByAddress(endAddress).then(results => {
      if (results.length < 2) {
        updateDestination(endAddress, history)
      }else {
        updateDestination('', history)
      }
    }).catch(error => updateDestination('', history))

    // updateDestination(endAddress, history)

  }

  handleClick = (event) => {
    const selectedButton = event.target.name
    const address = event.target.parentNode.querySelector('p').innerText
    switch (selectedButton) {
      case "source":
        this.setState({startAddress: address})
        break;
      case "destination":
        this.setState({endAddress: address})
        break;
      default:
    }
  }

  render() {
    // console.log(this.props)
    // console.log(this.state)
    const {startAddress, endAddress} = this.state
    const {addresses, search} = this.props

    const cssClasses = {
      root: 'form-group',
      input: 'form-control',
      autocompleteContainer: 'my-autocomplete-container'
    }

    const inputPropsSource = {
      value: startAddress,
      onChange: (address) => this.setState({ startAddress: address }),
      placeholder: 'current location'
    }

    const inputPropsDestination = {
      value: endAddress,
      onChange: (address) => this.setState({ endAddress: address }),
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
          <PlacesAutocomplete inputProps={inputPropsSource} classNames={cssClasses} />
          <label>Destination</label>
          <PlacesAutocomplete inputProps={inputPropsDestination} classNames={cssClasses} />
          {search.error ? <p>{search.error}</p>: null}
          <button type="submit">Submit</button>
        </form>
        <h3>Recent Searches</h3>
        {previousSearches}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  addresses: state.post.savedAddresses,
  currentLocation: state.map.currentLocation,
  search: state.loc.search
});

export default withRouter(connect(mapStateToProps, actions)(SearchForm))
