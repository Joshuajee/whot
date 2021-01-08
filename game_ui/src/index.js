import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import  "./Styles/styles.css";
import reportWebVitals from './reportWebVitals';
import SquareCard from "./Componets/Cards/SquareCard";
import CircleCard from "./Componets/Cards/CircleCard";
import CrossCard from "./Componets/Cards/CrossCard";
import TriangleCard from "./Componets/Cards/TriangleCard";
import StarCard from "./Componets/Cards/StarCard";
import WhotCard from "./Componets/Cards/WhotCard";
import CardCover from "./Componets/Cards/CardCover";
import Start from "./Componets/Background/Start";
import Button from "./Componets/Button";

///<Start 
//width={window.screen.width}
//height={window.screen.height}
///>

/*
      <SquareCard size={100} number={1} />
        <CircleCard size={100} number={2} />
        <CrossCard size={100} number={5} />
        <TriangleCard size={100} number={14} />
        <StarCard size={100} number={8} />
        <WhotCard size={100} number={20} />
        <CardCover size={100}  />
*/
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
