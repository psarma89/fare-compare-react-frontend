/* global google */

import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, TrafficLayer} from 'react-google-maps';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import * as actions from '../../actions';
import LyftPins from './LyftPins'

let counter = 0;

class Map extends Component{

  constructor(){
    super()
    this.state = {
      isBoxOpen: true
    }
  }

  componentWillMount() {
    this.props.getLocation()
  }

  componentWillReceiveProps(nextProps) {
    counter++
    console.log(counter)
    this.props.getNearestRidesInfo(nextProps.location)
  }

  componentWillUnmount() {
  }

  onBoxToggleOpen = () => {
    this.setState({isBoxOpen: !this.state.isBoxOpen})
  }

  onDragEnd = (event) => {
    const location = {lat: event.latLng.lat(), lng: event.latLng.lng()}
    this.props.getLocation(location)
  }

  render(){
    // console.log(this.props.etas, this.props.location)
    const {location} = this.props
    const {uberEtaDisplay, lyftEtaDisplay, nearbyLyftCoords} = this.props.etas

    return(
      <GoogleMap
        zoom={16}
        center={location}
      >
        <Marker
          position={location}
          draggable
          animation={google.maps.Animation.DROP}
          onDragEnd={this.onDragEnd}
        >
          {this.state.isBoxOpen && <InfoBox
            onCloseClick={this.onBoxToggleOpen}
            position={new google.maps.LatLng(location.lat, location.lng)}
            options={{ pixelOffset: new google.maps.Size(400,-300), closeBoxURL: ``}}
            >
            <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
              <h4>{location.address? location.address : null}</h4>
              <h4>Nearest Ubers</h4>
              {uberEtaDisplay? uberEtaDisplay : null}
              <h4>Nearest Lyfts</h4>
              {lyftEtaDisplay? lyftEtaDisplay : null}
            </div>
          </InfoBox>
          }
        </Marker>
        {nearbyLyftCoords? nearbyLyftCoords.map((marker,i) => {
          return (
            <LyftPins key={i} marker={marker} />
          )
        }): null}
        <TrafficLayer autoUpdate />
      </GoogleMap>
    )
  }
}

const mapStateToProps = state => ({
  location: state.map.currentLocation,
  etas: state.inf.etas
});

export default withScriptjs(withGoogleMap(connect(mapStateToProps, actions)(Map)));
