import { combineReducers } from 'redux';

const initialState = { currentUser: {}, currentLocation: {lat: 40.7484,lng: 73.9857}, savedAddresses: [], search: {startAddress: '', source: '', endAddress: '', destination: '', error: ''}, etas: {uberETA: '', lyftETA: ''}, results: {uberPrices: '', uberProducts: '', lyftPrices: '', lyftProducts: '', taxiPrices: ''}};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      const { id, email } = action.user;
      return { ...state, currentUser: { id, email } };
    case 'SHOW_LOGIN_ERROR':
      const { error } = action.user;
      return { ...state, currentUser: {error} };
    case 'LOGOUT_USER':
      return { ...state, currentUser: {}, currentLocation: {}, savedAddresses: [], search: {startAddress: '', source: '', endAddress: '', destination: '', error: ''}, etas: {uberETA: '', lyftETA: ''}, results: { uberPrices: '', uberProducts: '', lyftPrices: '', lyftProducts: '', taxiPrices: ''}};
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

const postReducer = (state = initialState, action) => {
  const savedAddresses = action.addresses
  switch (action.type) {
    case 'POST_SEARCH':
      return { ...state, savedAddresses};
    case 'SET_SEARCH_DATA':
      return { ...state, savedAddresses};
    default:
      return state;
  }
};

const locReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'SET_SOURCE_SEARCH':
      return { ...state, search: {...state.search, startAddress: action.startAddress, source: action.source, error: ''}};
    case 'SET_DESTINATION_SEARCH':
      return { ...state, search: {...state.search, endAddress: action.endAddress, destination: action.destination, error: ''}};
    case 'SET_SOURCE_DEFAULT':
      return { ...state, search: {...state.search, startAddress: 'current location', source: action.currentLocation, error: ''}};
    case 'SET_DESTINATION_ERROR':
      return { ...state, search: {...state.search, error: 'Destination Not Found. Please Enter Valid Destination'}};
    default:
      return state;
  }
};

const rideReducer = (state = initialState, action) => {

  const {uberPrices, uberProducts, lyftPrices, lyftProducts, taxiPrices, uberETA, lyftETA} = action

  switch (action.type) {
    case 'SET_PRICE_DATA':
      return { ...state, results: {...state.results, uberPrices, uberProducts, lyftPrices, lyftProducts, taxiPrices}};
    case 'SET_RIDE_ETA':
      return {...state, etas: {...state.etas, uberETA, lyftETA}}
    default:
      return state;
  }
};

const rootReducer =  combineReducers({
  auth: authReducer,
  map: mapReducer,
  post: postReducer,
  loc: locReducer,
  res: rideReducer
});

export default rootReducer;
