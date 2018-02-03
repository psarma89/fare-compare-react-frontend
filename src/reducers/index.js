import { combineReducers } from 'redux';

const initialState = { currentUser: {}, currentLocation: {lat: 40.7484,lng: 73.9857}};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      const { id, email } = action.user;
      return { ...state, currentUser: { id, email } };
    case 'SHOW_LOGIN_ERROR':
      const { error } = action.user;
      return { ...state, currentUser: {error} };
    case 'LOGOUT_USER':
      return { ...state, currentUser: {} };
    default:
      return state;
  }
};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOCATION':
      const { lat, lng } = action.location;
      return { ...state, currentLocation: { lat, lng }};
    default:
      return state;
  }
};

const rootReducer =  combineReducers({
  auth: authReducer,
  map: mapReducer
});

export default rootReducer;
