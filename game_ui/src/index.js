import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import  "./Styles/styles.css";
import reportWebVitals from './reportWebVitals';
import Start from "./Componets/Background/Start";
import Button from "./Componets/Button";

ReactDOM.render(
  <React.StrictMode>
  
    <center>

      <Start />

      <div className="start-button">

        <Button text={"Start Game"} class={"btn-start"}/>

        <Button text={"Options"} class={"btn-options"}/>

        <Button text={"Settings"} class={"btn-settings"}/>
        
      </div>
    
    </center>
        
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
