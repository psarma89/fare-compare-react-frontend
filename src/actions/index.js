import React from 'react';
import { adapter } from '../services';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import _ from 'lodash';

export const getLocation = (location) => dispatch => {
  dispatch({ type: 'ASYNC_START' });

  if (location) {
    dispatch({ type: 'SET_LOCATION', location });
  }else {
    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = pos.coords;
      const location = {lat: coords.latitude, lng: coords.longitude}
      dispatch({ type: 'SET_LOCATION', location });
    })
  }
};

export const fetchUser = () => dispatch => {
  dispatch({ type: 'ASYNC_START' });

  adapter.auth.getCurrentUser().then(user => {
    dispatch({ type: 'SET_CURRENT_USER', user });
  });
};

export const loginUser = (email, password, history) => dispatch => {
  dispatch({ type: 'ASYNC_START' });

  const {login} = adapter.auth

  if (navigator && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = pos.coords;
      const location = {lat: coords.latitude, lng: coords.longitude}
      login({ email, password }).then(user => {
        if (user.email) {
          localStorage.setItem('token', user.jwt);
          dispatch({ type: 'SET_CURRENT_USER', user, location });
          history.push('/profile')
        }else {
          dispatch({ type: 'SHOW_LOGIN_ERROR', user });
          history.push('/login')
        }
      })
    })
  }
};

export const updateUser = (email, password, history) => dispatch => {
  dispatch({ type: 'ASYNC_START' });

  const {update} = adapter.auth

  if (navigator && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = pos.coords;
      const location = {lat: coords.latitude, lng: coords.longitude}
      update({ email, password }).then(user => {
        if (user.email) {
          localStorage.setItem('token', user.jwt);
          dispatch({ type: 'SET_CURRENT_USER', user, location });
          history.push('/profile')
        }else {
          dispatch({ type: 'SHOW_LOGIN_ERROR', user });
          history.push('/login')
        }
      })
    })
  }
};

export const signupUser = (email, password, password_confirmation, history) => dispatch => {
  dispatch({ type: 'ASYNC_START' });

  const {signup} = adapter.auth

  if (navigator && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = pos.coords;
      const location = {lat: coords.latitude, lng: coords.longitude}
      signup({ email, password, password_confirmation }).then(user => {
        if (user.email) {
          localStorage.setItem('token', user.jwt);
          dispatch({ type: 'SET_CURRENT_USER', user, location });
          history.push('/profile')
        }else {
          dispatch({ type: 'SHOW_LOGIN_ERROR', user });
          history.push('/login')
        }
      })
    })
  }
};

export const logoutUser = () => {
  localStorage.clear();
  return { type: 'LOGOUT_USER' };
};

export const postSearchData = (search) => dispatch => {
  dispatch({ type: 'ASYNC_START' });

  adapter.post.postSearch({address: search}).then(addresses => {
    dispatch({ type: 'POST_SEARCH', addresses });
    // history.push('/results')
  });
};

export const getSearchData = () => dispatch => {
  dispatch({ type: 'ASYNC_START' });

  adapter.post.getSearches().then(addresses => {
    dispatch({ type: 'SET_SEARCH_DATA', addresses });
  });
};

export const updateSource = (startAddress, currentLocation) => dispatch => {
  dispatch({ type: 'ASYNC_START' });

  geocodeByAddress(startAddress)
  .then(results => getLatLng(results[0]))
  .then(source => {
    localStorage.setItem('startAddress', startAddress);
    localStorage.setItem('source', JSON.stringify(source));
    dispatch({type: 'SET_SOURCE_SEARCH', source, startAddress})
  })
  .catch(error => {
    localStorage.setItem('startAddress', 'current location');
    localStorage.setItem('source', JSON.stringify(currentLocation));
    dispatch({type: 'SET_SOURCE_DEFAULT', currentLocation})
  })
}

export const updateDestination = (endAddress, history) => dispatch => {
  dispatch({ type: 'ASYNC_START' });

  geocodeByAddress(endAddress)
  .then(results => getLatLng(results[0]))
  .then(destination => {
    localStorage.setItem('endAddress', endAddress);
    localStorage.setItem('destination', JSON.stringify(destination));
    dispatch({type: 'SET_DESTINATION_SEARCH', destination, endAddress})
    history.push('/results')
  })
  .catch(error => {
    dispatch({type: 'SET_DESTINATION_ERROR'})
    history.push('/search')
  })
};

export const getRidePriceEstimates = (source, destination) => dispatch => {
  dispatch({ type: 'ASYNC_START' });

  const {getUberPriceData, getUberProductData} = adapter.uber
  const {getLyftPriceData, getLyftProductData} = adapter.lyft
  const {getTaxiPriceData} = adapter.taxi

  Promise.all([getUberPriceData(source, destination), getUberProductData(source), getLyftPriceData(source, destination), getLyftProductData(source), getTaxiPriceData(source,destination)]).then(values => {
    const uberPrices = values[0];
    const uberProducts = values[1];
    const lyftPrices = values[2];
    const lyftProducts = values[3];
    const taxiPrices = values[4];
    dispatch({ type: 'SET_PRICE_DATA', uberPrices, uberProducts, lyftPrices, lyftProducts, taxiPrices});
  })
}

export const getNearestRidesInfo = (source) => dispatch => {
  dispatch({ type: 'ASYNC_START' });

  const {getNearestUberEta} = adapter.uber
  const {getNearestLyftEta} = adapter.lyft

  Promise.all([getNearestUberEta(source), getNearestLyftEta(source)]).then(values => {
    // console.log(values)
    // const uberETA = _.minBy(values[0].times, (eta) => {
    //   return eta.estimate;
    // })
    const uberETA = values[0].times || []
    const lyftETA = values[1].eta_estimates || []

    const uberEtaDisplay = uberETA.map((eta,i) => {
      const uberMins = (eta.estimate/60).toFixed()
      return <p key={i}>{`${eta.display_name} only ${uberMins} ${uberMins > 1 ? "mins" : "min"} away`}</p>
    })

    const lyftEtaDisplay = lyftETA.map((eta,i) => {
      const lyftMins = (eta.eta_seconds/60).toFixed()
      return <p key={i}>{`${eta.display_name} only ${lyftMins} ${lyftMins > 1 ? "mins" : "min"} away`}</p>
    })

    dispatch({ type: 'SET_RIDE_ETA', uberEtaDisplay, lyftEtaDisplay})
  })
}

export const getNearestLyftCoords = (source) => dispatch => {
  dispatch({ type: 'ASYNC_START' });

  adapter.lyft.getNearestLyftLocations(source).then(lyftGeoCoords => {
    console.log(lyftGeoCoords)
    dispatch({ type: 'SET_NEAREST_LYFTS', lyftGeoCoords });
  });
};
