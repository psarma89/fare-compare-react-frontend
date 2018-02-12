import React, { Component } from 'react';
import { DirectionsRenderer, Marker, InfoWindow} from 'react-google-maps';

class DirectionsPins extends Component {
  constructor(){
    super()
    this.state = {
      isWindowOpen: false
    }
  }

  onWindowToggleOpen = () => {
    this.setState({isWindowOpen: !this.state.isWindowOpen})
  }

  render(){
    const {direction, attributes} = this.props
    const infoWindowIndex = (direction.routes[0].overview_path.length/attributes.divisor).toFixed()
    const infoLatLng = direction.routes[0].overview_path[infoWindowIndex]
    const distance = direction.routes[0].legs[0].distance.text
    const duration = direction.routes[0].legs[0].duration.text
    const travelMode = direction.request.travelMode

    const options = {
      polylineOptions: {
        strokeColor: attributes.color,
        clickable: true,
        strokeWeight: 6
      }
    }

    return (
      <div>
        <DirectionsRenderer directions={direction} options={options} />
        <Marker
          position={infoLatLng}
          icon={attributes.icon}
          onClick={this.onWindowToggleOpen}
        >
          {this.state.isWindowOpen && <InfoWindow
            position={infoLatLng}
            onCloseClick={this.onWindowToggleOpen}
            >
              <div>
                <h4>Directions: {travelMode}</h4>
                <p>Distance: {distance}</p>
                <p>Duration: {duration}</p>
              </div>
            </InfoWindow>
          }
        </Marker>
      </div>
    )
  }
}

export default DirectionsPins
