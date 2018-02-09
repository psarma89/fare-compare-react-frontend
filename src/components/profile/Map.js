import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Icon} from 'semantic-ui-react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, TrafficLayer} from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import * as actions from '../../actions';

class Map extends Component{

  constructor(){
    super()
    this.state = {
      isOpen: true
    }
  }

  componentWillMount() {
    this.props.getLocation()
  }

  componentWillReceiveProps(nextProps) {
    this.props.getNearestETA(nextProps.location)
  }

  onToggleOpen = () => {
    this.setState({isOpen: !this.state.isOpen})
  }

  render(){
    // console.log(this.props)
    const {uberETA, lyftETA} = this.props.etas
    const uberMins = (uberETA.estimate/60).toFixed()
    const lyftMins = (lyftETA.eta_seconds/60).toFixed()
    const uberEtaDisplay = `${uberETA.display_name} only ${uberMins} ${uberMins > 1 ? "mins" : "min"} away`
    const lyftEtaDisplay = `${lyftETA.display_name} only ${lyftMins} ${lyftMins > 1 ? "mins" : "min"} away`

    return(
      <GoogleMap
        zoom={16}
        center={this.props.location}
      >
        <Marker
          position={this.props.location}
          onClick={this.onToggleOpen}
        >
          {this.state.isOpen && <InfoWindow onCloseClick={this.onToggleOpen}>
            <div>
              <h3>{uberETA.display_name? uberEtaDisplay : null}</h3>
              <h3>{lyftETA.display_name? lyftEtaDisplay : null}</h3>
            </div>
          </InfoWindow>
          }
        </Marker>
        <TrafficLayer autoUpdate />
      </GoogleMap>
    )
  }
}

const mapStateToProps = state => ({
  location: state.map.currentLocation,
  etas: state.res.etas
});

export default withScriptjs(withGoogleMap(connect(mapStateToProps, actions)(Map)));
