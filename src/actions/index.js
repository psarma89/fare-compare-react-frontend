import { adapter } from '../services';

export const getLocation = () => dispatch => {
  if (navigator && navigator.geolocation) {
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
  localStorage.removeItem('token');
  return { type: 'LOGOUT_USER' };
};
