import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, TrafficLayer} from 'react-google-maps';
import * as actions from '../../actions';

class Map extends Component{

  componentDidMount() {
    this.props.getLocation()
  }

  render(){
    return(
      <GoogleMap
        zoom={16}
        center={this.props.location}
      >
        {this.props.isMarkerShown && <Marker position={this.props.location} />}
        <TrafficLayer autoUpdate />
      </GoogleMap>
    )
  }
}

const mapStateToProps = state => ({
  location: state.map.currentLocation
});

export default withScriptjs(withGoogleMap(connect(mapStateToProps, actions)(Map)));
