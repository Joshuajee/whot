/**
 * @author Joshua Evuetapha
 * @copyright (C) 2022 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */


import React from 'react'
import chooseCard from "../../GameLogic/chooseCard"


const Need = (props) =>{

    const { need } = props;
   
    let width = window.innerWidth
    let height = window.innerHeight

    let area = width * height

    let size = Math.sqrt(area/(3 * 5 * 1.8))

    let cardSize = size

    return (
        <div className="need-bar">

            <div className='background'></div> 

            <div className='cards'>
                <span onClick = {() => need(["star:20"])}> {chooseCard("star:", cardSize, true)} </span>
                <span onClick = {() => need(["triangle:20"])}> {chooseCard("triangle:", cardSize)}   </span>
                <span onClick = {() => need(["square:20"])}> {chooseCard("square:", cardSize)}     </span>
                <span onClick = {() => need(["circle:20"])}> {chooseCard("circle:", cardSize)}     </span>
                <span onClick = {() => need(["cross:20"])}> {chooseCard("cross:", cardSize)}      </span>
            </div>
        </div>
    );

}

export default Need;