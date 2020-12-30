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


ReactDOM.render(
  <React.StrictMode>
      <center className="center" height={100} width={100}>
        <SquareCard size={100} number={1}/>
        <CircleCard size={100}/>
        <CrossCard size={100}/>
        <TriangleCard size={100}/>
        <StarCard size={100}/>
        <WhotCard size={100} number={20} />
        <CardCover size={100}  />
        
      </center>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
