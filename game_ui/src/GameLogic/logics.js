/*
 * Copyright (C) 2021 Joshua Evuetapha
 * Twitter : @evuetaphajoshua
 * Github : @Joshuajee
 * This program is distributed under the MIT license
 */



export function goMarket(player,  market, times = 1){

    //+---------------------------------------------------------------------------+
    //|      This function adds card to player and remove that same card from     |  
    //|      market for n number of times                                         |
    //+---------------------------------------------------------------------------+

    for(let i = 0; i < times; i ++){

        if(market.length > 0){

            player.push(market[market.length - 1])

            market.pop()

        }

    }

}

export function referee(card, rules, playerCardAtHand, opponentsCardAtHand, cardPlayed, market){

 
    let index = card[0].indexOf(":") + 1
    let number = parseInt(card[0].slice(index, card[0].length))

    playGame(playerCardAtHand, card, cardPlayed, number)

    if(rules.holdOn.active && number === rules.holdOn.card){

        alert("hold On")
       
    }else if(rules.pickTwo.active && number === rules.pickTwo.card){

        alert("pick 2")

        goMarket(opponentsCardAtHand, market, 2)

    }else if(rules.pickThree.active && number === rules.pickThree.card){

        alert("pick 3")

    
        goMarket(opponentsCardAtHand, market, 3)



    }else if(rules.suspension.active && number === rules.suspension.card){

        alert("suspension")

    }else if(rules.generalMarket.active && number === rules.generalMarket.card){

        alert("general market")


        goMarket(opponentsCardAtHand, market)

   
    }

    alert(card)

}




export function playGame(player, card, cardPlayed, number){

    //+---------------------------------------------------------------------------+
    //|     This function takes in the player cards at hand an the action to be   |
    //|     taken it takes it, if a card is played it adds it to gamePlayed and   |
    //|     subracts it from the player card at hand                              |
    //+---------------------------------------------------------------------------+
    
    console.log("game played " + card)

    //if player goes to market
    if(card[0] === "z:goMarket"){

    }else if(number === 20){

        cardPlayed.push(card[0])

        for(let i = 0; i < player.length; i++){

            if(player[i] === "whot:20") player.splice(i, 1)
            
        }

    }else{

        cardPlayed.push(card[0])

        for(let i = 0; i < player.length; i++){

            if(player[i] === card[0]) player.splice(i, 1)
            
        }

    }

}


export function canPlay(card, inPlay, need = false) {

    let index = card.indexOf(":") + 1
    let number = parseInt(card.slice(index, card.length))
    let shape = card.slice(0, index)

    let index_in = inPlay.indexOf(":") + 1
    let number_in = parseInt(inPlay.slice(index_in, inPlay.length))
    let shape_in = inPlay.slice(0, index_in)

    if(number === 20) return [true, true]
    
    if(number === number_in || shape === shape_in || need) return [true, false]

    return false

}

export function checkGame(card, inPlay) {

    let index = card.indexOf(":") + 1
    let number = card.slice(index, card.length)
    let shape = card.slice(0, index)

    let index_in = inPlay.indexOf(":") + 1
    let number_in = inPlay.slice(index_in, inPlay.length)
    let shape_in = inPlay.slice(0, index_in)
    
    if(number === number_in || shape === shape_in || number === 20) return true

    return false

}

export function checkPlayResponse(response, rules, playerCardAtHand, opponentsCardAtHand, cardPlayed, market){

    let responseIndex = response.length - 1

    if(response[responseIndex][0] !== "z:goMarket"){

        referee(response[responseIndex], rules, playerCardAtHand, opponentsCardAtHand, cardPlayed, market)
    
    }else{

        goMarket(playerCardAtHand, market)

    }

}



export function checkGameState(gameState){

    //+---------------------------------------------------------------------------+
    //|      This method checks if any of the player cards or market is less      |  
    //|      than one then it calls the reward method in GameEngine, if  any      |
    //|      of the player cards is finished that player wins the game and the    |
    //|      game is over but if market is finished, it adds all cards from       |
    //|      card Played to market and shuffle them while calling the reward      |
    //|      method in GameEngine, but the game continues                         |
    //+---------------------------------------------------------------------------+
    console.log(gameState.playerOne)
    
    if(gameState.playerOne.cardAtHand.length < 1 || gameState.playerOne.cardAtHand.length < 1){

        //super.rewards(this.agentOne, this.agentTwo, this.player1, this.player2, this.actionOneNew, this.actionOneOld, this.actionTwoNew, this.actionTwoOld)

    }else if(gameState.market.length < 1){

        console.log(gameState.cardPlayed)

        //super.rewards(this.agentOne, this.agentTwo, this.player1, this.player2, this.actionOneNew, this.actionOneOld, this.actionTwoNew, this.actionTwoOld)
        
        //
        let inPlay = sanitizeCardPlayed(gameState.cardPlayed)

        //adds all the card played to market
        gameState.market = inPlay
        
        //reasign inplay giving it just its last value
        gameState.cardPlayed = [ gameState.cardPlayed[gameState.cardPlayed.length - 1]]

        //removed the last card from market
        gameState.market.pop()

        //shuffles the cards
        gameState.market = shuffle(gameState.market)

    }

}


export function shuffle(array){

    let currIndex = array.length

    while (0 !== currIndex) {
        
        //pick an element not prevously selected
        let randIndex = Math.floor(Math.random() * currIndex)
        currIndex--

        //swap it with the current element
        let tempVal  = array[currIndex]
        array[currIndex] = array[randIndex]
        array[randIndex] = tempVal
    
    }

    return array
}




export function sanitizeCardPlayed(cards){

    let result = []

    for(let i = 0; i < cards.length; i++){

        let index = cards[i].indexOf(":") + 1
        let number = cards[i].slice(index, cards.length)

        if(number == 20)
            result.push("whot:20")
        else
            result.push(cards[i])
    }

    return result

}


