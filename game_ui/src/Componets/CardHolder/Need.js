/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2021 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */


import React from 'react'
import chooseCard from "../../GameLogic/chooseCard"


class Need extends React.Component{


    render(){
        
        let width = window.innerWidth
        let height = window.innerHeight

        let area = width * height

        let size = Math.sqrt(area/(3 * 5 * 1.1))

        let cardSize = size

        return (
            <center className="need-bar" style={{height:height * .9}}>
                <div>
                    <span onClick = {() => this.props.need(["star:20"])}> {chooseCard("star:", cardSize, true)} </span>
                    <span onClick = {() => this.props.need(["triangle:20"])}> {chooseCard("triangle:", cardSize)}   </span>
                    <span onClick = {() => this.props.need(["square:20"])}> {chooseCard("square:", cardSize)}     </span>
                    <span onClick = {() => this.props.need(["circle:20"])}> {chooseCard("circle:", cardSize)}     </span>
                    <span onClick = {() => this.props.need(["cross:20"])}> {chooseCard("cross:", cardSize)}      </span>
                </div>
            </center>
        )
    }

}

export default Need