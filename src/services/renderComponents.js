import React from 'react';
import Map from '../components/profile/Map';
import DirectionsMap from '../components/results/DirectionsMap';

const emailComponent = (email,handleChange) => {
  return(
    <div className="ui field">
      <label>Email</label>
      <input
        name="email"
        placeholder="email"
        value={email}
        onChange={handleChange}
      />
    </div>
  )
}

const passwordComponent = (password, handleChange) => {
  return (
    <div className="ui field">
      <label>Password</label>
      <input
        name="password"
        type="password"
        placeholder="password"
        value={password}
        onChange={handleChange}
      />
    </div>
  )
}

const passwordConfirmationComponent = (password, handleChange) => {
  return (
    <div className="ui field">
      <label>Password Confirmation</label>
      <input
        name="passwordConfirmation"
        type="password"
        placeholder="password"
        value={password}
        onChange={handleChange}
      />
    </div>
  )
}

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

const directionComponent = () => {
  return(
    <DirectionsMap
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDXkn70qTdv7kLMo7V-xIL654_nb85Gl4U&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: '100%' }} />}
      containerElement={<div style={{ height: '600px' }} />}
      mapElement={<div style={{ height: '100%' }} />}
    />
  )
}

export const renderComponents = {
  map: {
    mapComponent,
    directionComponent
  },
  auth: {
    emailComponent,
    passwordComponent,
    passwordConfirmationComponent
  }
};
