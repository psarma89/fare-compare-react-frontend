import { adapter } from '../services';

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

export const logoutUser = () => {
  localStorage.removeItem('token');
  return { type: 'LOGOUT_USER' };
};
