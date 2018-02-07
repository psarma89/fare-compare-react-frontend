import { adapter } from '../services';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export const getLocation = () => dispatch => {

  if (navigator && navigator.geolocation) {
    dispatch({ type: 'ASYNC_START' });
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

  adapter.auth.login({ email, password }).then(user => {
    if (user.email) {
      localStorage.setItem('token', user.jwt);
      dispatch({ type: 'SET_CURRENT_USER', user });
      history.push('/profile');
    }else {
      dispatch({ type: 'SHOW_LOGIN_ERROR', user });
      history.push('/login')
    }

  });
};

export const updateUser = (email, password, history) => dispatch => {
  dispatch({ type: 'ASYNC_START' });

  adapter.auth.update({ email, password }).then(user => {
    if (user.email) {
      localStorage.setItem('token', user.jwt);
      dispatch({ type: 'SET_CURRENT_USER', user });
      history.push('/profile');
    }else {
      dispatch({ type: 'SHOW_LOGIN_ERROR', user });
      history.push('/reset')
    }

  });
};

export const signupUser = (email, password, password_confirmation, history) => dispatch => {
  dispatch({ type: 'ASYNC_START' });

  adapter.auth.signup({ email, password, password_confirmation }).then(user => {
    if (user.email) {
      localStorage.setItem('token', user.jwt);
      dispatch({ type: 'SET_CURRENT_USER', user });
      history.push('/profile');
    }else {
      dispatch({ type: 'SHOW_LOGIN_ERROR', user });
      history.push('/signup')
    }

  });
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
  const {getUberPriceData, getUberProductData} = adapter.uber
  const {getLyftPriceData, getLyftProductData} = adapter.lyft

  dispatch({ type: 'ASYNC_START' });
  Promise.all([getUberPriceData(source, destination), getUberProductData(source), getLyftPriceData(source, destination), getLyftProductData(source)]).then(values => {
    const uberPrices = values[0];
    const uberProducts = values[1];
    const lyftPrices = values[2];
    const lyftProducts = values[3];
    dispatch({ type: 'SET_PRICE_DATA', uberPrices, uberProducts, lyftPrices, lyftProducts});
  })
}
