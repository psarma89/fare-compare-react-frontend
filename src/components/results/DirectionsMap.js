/* global google */

import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, TrafficLayer} from 'react-google-maps';

class DirectionsMap extends Component{

  constructor(){
    super()
    this.state = {
      directions: null
    }
  }

  componentDidMount() {
    const DirectionsService = new google.maps.DirectionsService();
    const source = JSON.parse(localStorage.getItem('source'))
    const destination = JSON.parse(localStorage.getItem('destination'))

    DirectionsService.route({
      origin: source,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result,
        });
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
  }

  render(){
    // console.log(this.props)
    return(
      <GoogleMap
        zoom={20}
      >
        {this.state.directions && <DirectionsRenderer directions={this.state.directions} />}
        <TrafficLayer autoUpdate />
      </GoogleMap>
    )
  }
}

const mapStateToProps = state => ({
  location: state.map.currentLocation,
  etas: state.res.etas
});

export default withScriptjs(withGoogleMap(connect(mapStateToProps)(DirectionsMap)));
