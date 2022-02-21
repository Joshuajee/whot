/**
 * @author Joshua Evuetapha
 * @copyright (C) 2022 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */


import React from 'react';
import chooseCard from "../../GameLogic/chooseCard";
import { useEffect, useState } from 'react';


const Need = (props) =>{

    const { need, isLandscape, height, width } = props;

    const [area, setArea] = useState(0);
    const [size, setSize] = useState(0)
    const [style, setStyle] = useState({});
   

    useEffect(() => {

        setArea(width * height);

    }, [isLandscape, width, height]);

    useEffect(() => {

        if (isLandscape) {
            setSize(Math.sqrt(area  /   (3 * 5 * 1.8)));
            setStyle({ width: width * 0.5, height: height, right: 0});
        }  else {
            setSize(Math.sqrt(area  / (3 * 5 * 2.8)));
            setStyle({ width: height * 0.4, height: width, left: 0});
        }

    }, [isLandscape, area, width, height]);

    return (
        <div className="need-bar">

            <div className='background'></div> 

            <div className='cards' style={style}>
                <span onClick = {() => need(["star:20"])}> {chooseCard("star:", size, true)} </span>
                <span onClick = {() => need(["triangle:20"])}> {chooseCard("triangle:", size)}   </span>
                <span onClick = {() => need(["square:20"])}> {chooseCard("square:", size)}     </span>
                <span onClick = {() => need(["circle:20"])}> {chooseCard("circle:", size)}     </span>
                <span onClick = {() => need(["cross:20"])}> {chooseCard("cross:", size)}      </span>
            </div>
        </div>
    );

}

export default Need;