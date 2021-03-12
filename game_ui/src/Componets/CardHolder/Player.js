/*
 * Copyright (C) 2021 Joshua Evuetapha
 * Twitter : @evuetaphajoshua
 * Github : @Joshuajee
 * This program is distributed under the MIT license
 */



import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

import chooseCard from "../../GameLogic/chooseCard"


class Player extends React.Component {

    
    render(){

        let width = window.innerWidth
        let height = window.innerHeight
        let cardSize = height/10

        let margin = (width / 2) - cardSize * 0.6666666667 - width * 0.2

        let top = this.props.top * height - cardSize

        const style = {
            position:"absolute",
            top:top,
            left: margin,
            align:"center",
            width: (width - margin * 2),  
            height:  cardSize 
     
        }


        return(
            <div style={style} className="player">

                <span onClick={() => this.props.action("right")}>
                    <FontAwesomeIcon size="2x" color={"blue"} icon={faArrowLeft} /> 
                </span>

                    {displayCards(this.props.cards.sort(), cardSize, this.props.action)}  
                
                <span onClick={() => this.props.action("left")}>
                    <FontAwesomeIcon size="2x" color={"blue"} icon={faArrowRight} /> 
                </span>

            </div>
            )
    }


}


function displayCards(cards, cardSize, action) {
    
    let cardArray = []

    let width = window.innerWidth
    let height = window.innerHeight 

    let margin = (width / 2) - cardSize * 0.6666666667 - width * 0.2

    let cardSpaceNeeded = (cards.length + 1) * 1.1 * cardSize
    let cardSpaceAvailable = width - margin * 2 - cardSize

    console.log(cardSpaceNeeded)
    console.log(cardSpaceAvailable)

    for(let i = 0; i < cards.length; i++){
        console.log("FFFf" + (i + 1) * 1.1 * cardSize)
        if((i + 1) * 1.1 * cardSize >= cardSpaceAvailable) break

        cardArray.push(<span onClick = {() => action([cards[i], i])}> { chooseCard(cards[i], cardSize) } </span>)

    
    }

    
    return cardArray
}

export default Player