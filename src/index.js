import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers';
import App from './App';

const store = createStore(
  rootReducer, applyMiddleware(reduxThunk)
)

const Root = ({ store }) => {
  return (
    <Router>
      <Provider store={store}>
        <Route path="/" component={App} />
      </Provider>
    </Router>
  );
};

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
