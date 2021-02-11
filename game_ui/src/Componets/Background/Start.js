/*
 * Copyright (C) 2021 Joshua Evuetapha
 * Twitter : @evuetaphajoshua
 * Github : @Joshuajee
 * This program is distributed under the MIT license
 */


import Cards from "../../GameEnv/cards";
import chooseCard from "../../GameLogic/chooseCard";
import {shuffle} from "../../GameLogic/logics";

var cards = [...Cards.cards]
cards.push("cover:20")

function Start() {

    let width = window.innerWidth
    let height = window.innerHeight

    let area = width * height

    let size = Math.sqrt(area/(2 * 57))

    let cardSize = size

    cards =  shuffle(cards)

    let componet = []

    for (let i = 0; i < cards.length; i++) {
    
        componet.push(chooseCard(cards[i], cardSize))

    }
   

    return(
        <div className="start-page" >
            {componet}
        </div>
        )
}



export default Start