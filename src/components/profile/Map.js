/* global google */

import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, TrafficLayer} from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import * as actions from '../../actions';

class Map extends Component{

  constructor(){
    super()
    this.state = {
      isBoxOpen: true,
      isWindowOpen: false
    }
  }

  componentWillMount() {
    this.props.getLocation()
  }

  componentDidMount() {
    this.props.getNearestLyftCoords(this.props.location)
  }

  componentWillReceiveProps(nextProps) {
    this.props.getNearestRidesInfo(nextProps.location)
  }

  componentWillUnmount() {
  }

  onBoxToggleOpen = () => {
    this.setState({isBoxOpen: !this.state.isBoxOpen})
  }

  onWindowToggleOpen = () => {
    this.setState({isWindowOpen: !this.state.isWindowOpen})
  }

  onDragEnd = (event) => {
    const location = {lat: event.latLng.lat(), lng: event.latLng.lng()}
    this.props.getLocation(location)
  }

  render(){
    console.log(this.props)
    const {uberEtaDisplay, lyftEtaDisplay} = this.props.etas

    let lyftGeoCoords;
    // lyftGeoCoords && !lyftGeoCoords.error ? lyftGeoCoords = lyftGeoCoords.nearby_drivers.find(locs => locs.ride_type === "lyft").drivers : lyftGeoCoords = null
    // console.log(lyftGeoCoords)

    return(
      <GoogleMap
        zoom={16}
        center={this.props.location}
      >
        {this.state.isBoxOpen && <InfoBox
          onCloseClick={this.onBoxToggleOpen}
          defaultPosition={new google.maps.LatLng(this.props.location.lat, this.props.location.lng)}
          >
          <div>
            <h3>Nearest Ubers</h3>
            {uberEtaDisplay? uberEtaDisplay : null}
            <h3>Nearest Lyfts</h3>
            {lyftEtaDisplay? lyftEtaDisplay : null}
          </div>
        </InfoBox>
        }

        <Marker
          position={this.props.location}
          onClick={this.onWindowToggleOpen}
          draggable
          animation={google.maps.Animation.DROP}
          onDragEnd={this.onDragEnd}
        >
          {this.state.isWindowOpen && <InfoWindow onCloseClick={this.onBoxToggleOpen}>
            <div>
              <h3>You are here</h3>
            </div>
          </InfoWindow>
          }
        </Marker>
        {lyftGeoCoords ? lyftGeoCoords.map((marker,i) => {
          return (
            <Marker
              key={i}
              position={marker.locations[0]}
              icon={'http://maps.gstatic.com/mapfiles/ms2/micons/pink-pushpin.png'}
            />
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
