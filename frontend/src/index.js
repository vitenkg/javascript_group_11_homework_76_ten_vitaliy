import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import thunk from "redux-thunk";
import Reducer from "./store/reducers/ChatReducer";

const rootReducer = combineReducers({
    'chat': Reducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
      <BrowserRouter>
          <App/>
      </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
