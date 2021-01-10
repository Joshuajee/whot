import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import  "./Styles/styles.css";
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route} from 'react-router-dom'

import Home from "./Routes/Home";
import Options from "./Routes/Options";
import Leaderboard from "./Routes/Leaderboard";
import Settings from "./Routes/Settings";

const home =  () => <Home />
const options =  () => <Options />
const leaderboard = () => <Leaderboard />
const settings = () => <Settings />


ReactDOM.render(
  <React.StrictMode>

    <BrowserRouter>
      <Route path="/" exact={true} component={home} />
      <Route path="/home" exact={true} component={home} />
      <Route path="/leaderboard" exact={true} component={leaderboard} />
      <Route path="/settings" exact={true} component={settings} />
    </BrowserRouter>
        
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
