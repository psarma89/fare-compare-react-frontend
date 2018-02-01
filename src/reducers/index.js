import { combineReducers } from 'redux';

const initialState = { currentUser: {} };

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

const rootReducer =  combineReducers({
  auth: authReducer
});

export default rootReducer;
