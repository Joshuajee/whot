/*
 * Copyright (C) 2021 Joshua Evuetapha
 * Twitter : @evuetaphajoshua
 * Github : @Joshuajee
 * This program is distributed under the MIT license
 */

var actionOneNew = []
var actionOneOld = []

var actionTwoNew = []
var actionTwoOld = []

var MOVE_WAITING_PERIOD = 1000




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

        return false
       
    }else if(rules.pickTwo.active && number === rules.pickTwo.card){

        goMarket(opponentsCardAtHand, market, 2)

        return false

    }else if(rules.pickThree.active && number === rules.pickThree.card){

        goMarket(opponentsCardAtHand, market, 3)

        return false

    }else if(rules.suspension.active && number === rules.suspension.card){

        return false

    }else if(rules.generalMarket.active && number === rules.generalMarket.card){

        goMarket(opponentsCardAtHand, market)

        return false
   
    }

    return true

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

        cardPlayed.pop()

        cardPlayed.push(card[0])

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

export function checkPlayResponse(response, rules, playerCardAtHand, opponentsCardAtHand, cardPlayed, market, events){

    setTimeout(handleResponse, MOVE_WAITING_PERIOD, 0, response, rules, playerCardAtHand, opponentsCardAtHand, cardPlayed, market, events)

}


function handleResponse(index, response, rules, playerCardAtHand, opponentsCardAtHand, cardPlayed, market, events){
   
    

    if(response[index][0] === "whot:20"){

        cardPlayed.push("whot:20")

        for(let i = 0; i < playerCardAtHand.length; i++){

            if(playerCardAtHand[i] === "whot:20") playerCardAtHand.splice(i, 1)
            
        }

    }else if(response[index][0] !== "z:goMarket"){

        referee(response[index], rules, playerCardAtHand, opponentsCardAtHand, cardPlayed, market)
        
    }else{

        goMarket(playerCardAtHand, market)

    }

    events.emit("play")

    if(index + 1 < response.length) setTimeout(handleResponse, MOVE_WAITING_PERIOD, index + 1, response, rules, playerCardAtHand, opponentsCardAtHand, cardPlayed, market, events)
    else events.emit("play-end")
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
    
    if(gameState.playerOne.cardAtHand.length < 1 || gameState.playerOne.cardAtHand.length < 1){

        rewards(gameState, actionOneNew, actionOneOld, actionTwoNew, actionTwoOld)

    }else if(gameState.market.length < 1){

        rewards(gameState, actionOneNew, actionOneOld, actionTwoNew, actionTwoOld)
 
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
        let number = parseInt(cards[i].slice(index, cards.length))

        if(number === 20)
            result.push("whot:20")
        else
            result.push(cards[i])
    }

    return result

}


function rewards(gameState, actionOneNew, actionOneOld, actionTwoNew, actionTwoOld){

    if(gameState.playerOne.cardAtHand < 1) alert(gameState.playerOne.name + " Wins ")

    if(gameState.playerTwo.cardAtHand < 1) alert(gameState.playerTwo.name + " Wins ")
    
}

export function checkGameChanges(gameState, cardPlayed, market){

    //returns true if there is a change in market length
    if(gameState.market.length !== market.length){
        
        market = gameState.market
        cardPlayed = gameState.cardPlayed

        return true
    }

    //returns true if there is a change in market length
    if(gameState.cardPlayed.length !== cardPlayed.length){
        
        market = gameState.market
        cardPlayed = gameState.cardPlayed
        
        return true
    }

    return false

}