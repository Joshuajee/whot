/*
 * Copyright (C) 2021 Joshua Evuetapha
 * Twitter : @evuetaphajoshua
 * Github : @Joshuajee
 * This program is distributed under the MIT license
 */



import React from "react"
import chooseCard from "../../GameLogic/chooseCard"
import LeftNav from "./LeftNav"
import RightNav from "./RightNav"

class Player extends React.Component {

    
    render(){

        let top = this.props.top

        let width = window.innerWidth
        let height = window.innerHeight
        let cardSize = height/10
        let angle = this.props.angle
        let margin = (width / 2) - cardSize * 0.6666666667 - width * 0.2

        const style = {
            position:"absolute",
            top:height * top - cardSize,
            left: margin,
            align:"center",
            width: (width - margin * 2),
            transform: "rotate(" + angle + "deg)"
            
        }


        return(
            <div style={style} className="in-play">
                <LeftNav top={top} /> {displayCards(this.props.cards.sort(), cardSize, this.props.action)}  <RightNav top={top} /> 
            </div>
            )
    }


}


function displayCards(cards, cardSize, action) {
    
    let cardArray = []

    for(let i = 0; i < cards.length; i++){
        cardArray.push(<span onClick = {() => action([cards[i], i])}> { chooseCard(cards[i], cardSize) } </span>)
    }

    return cardArray
}

export default Player