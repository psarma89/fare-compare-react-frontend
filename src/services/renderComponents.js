import React from 'react';
import Map from '../components/profile/Map';


const mapComponent = () => {
  return(
    <Map
      isMarkerShown
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDXkn70qTdv7kLMo7V-xIL654_nb85Gl4U&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: '100%' }} />}
      containerElement={<div style={{ height: '600px' }} />}
      mapElement={<div style={{ height: '100%' }} />}
    />
  )
}


export const renderComponents = {
  map: {
    mapComponent
  }
};
