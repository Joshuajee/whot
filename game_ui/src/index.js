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


ReactDOM.render(
  <React.StrictMode>
      <center className="center" height={100} width={100}>
        <SquareCard size={200}/>
        <CircleCard size={200}/>
        <CrossCard size={200}/>
        <TriangleCard size={200}/>
        <StarCard size={200}/>
      </center>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
