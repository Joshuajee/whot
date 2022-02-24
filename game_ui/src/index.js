/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2021 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import  "./Styles/styles.css";
import "./Styles/need.css";
import  "./Styles/modal.css"
import reportWebVitals from './reportWebVitals';
import store from './Redux/store';
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>  
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
