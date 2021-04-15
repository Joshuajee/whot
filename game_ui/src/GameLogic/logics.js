/*
 * Copyright (C) 2021 Joshua Evuetapha
 * Twitter : @evuetaphajoshua
 * Github : @Joshuajee
 * This program is distributed under the MIT license
 */


var MOVE_WAITING_PERIOD = 2000



export function goMarket(player,  market, times = 1){

    //+---------------------------------------------------------------------------+
    //|      This function adds card to player and remove that same card from     |  
    //|      market for n number of times                                         |
    //+---------------------------------------------------------------------------+

    for(let i = 0; i < times; i ++){

        if(market.length > 0){

            player.push(market[market.length - 1])

            console.log(market[market.length - 1])

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

export function checkPlayResponse(response, gameState, events, playerTwoState){

    setTimeout(handleResponse, MOVE_WAITING_PERIOD, 0, response, gameState, events, playerTwoState)

}


function handleResponse(index, response, gameState, events, playerTwoState){

    //+----------------------------------------------------------------------+
    //|     Recursive function that loop through the server response and     |
    //|     handle them appropriately it calls the setTimeout function       |
    //|     it also update agent states                                      |
    //+----------------------------------------------------------------------+

    
    let playerCardAtHand = gameState.playerTwo.cardAtHand
    let opponentsCardAtHand = gameState.playerOne.cardAtHand
    let cardPlayed = gameState.cardPlayed
    let market = gameState.market


    let rules = gameState.rules
   
    let cardIndex = response[index][0].indexOf(":") + 1
    let number = parseInt(response[index][0].slice(cardIndex, response[index][0].length))

    let availableMoves = availableMove(playerCardAtHand, cardPlayed[cardPlayed.length - 1])

    playerTwoState.push(createState(gameState, availableMoves, false))


    if(number === 20){

        cardPlayed.push(response[index][0])

        for(let i = 0; i < playerCardAtHand.length; i++){

            if(playerCardAtHand[i] === "whot:20") playerCardAtHand.splice(i, 1)
            
        }

    }else if(response[index][0] !== "z:goMarket"){

        referee(response[index], rules, playerCardAtHand, opponentsCardAtHand, cardPlayed, market)
        
    }else{

        goMarket(playerCardAtHand, market)

    }

    events.emit("play")

    if(index + 1 < response.length) setTimeout(handleResponse, MOVE_WAITING_PERIOD, index + 1, response, gameState, events, playerTwoState)
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

        //rewards(gameState, actionOneNew, actionOneOld, actionTwoNew, actionTwoOld)

    }else if(gameState.market.length < 1){

        //rewards(gameState, actionOneNew, actionOneOld, actionTwoNew, actionTwoOld)
 
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


export function rewards(gameState, actionOneNew, actionOneOld, actionTwoNew, actionTwoOld){

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


export function availableMove(playerCard, inPlayCard){

    let index_in = inPlayCard.indexOf(":") + 1
    let number_in = parseInt(inPlayCard.slice(index_in, inPlayCard.length))
    let shape_in = inPlayCard.slice(0, index_in)

    let availableMove = ["z:goMarket"]

    for(let i = 0; i < playerCard.length; i++){
         
        let index = playerCard[i].indexOf(":") + 1
        let number = parseInt(playerCard[i].slice(index, playerCard[i].length))
        let shape = playerCard[i].slice(0, index)

        if(number === number_in){

            availableMove.push(playerCard[i])

        }else if(shape === shape_in){
        
            availableMove.push(playerCard[i])

        }else if(number === 20){

            availableMove.push("whot:20")

        }

    }


    return availableMove

}



export function createState(gameState,  availableMoves, isPlayerOne){

    if(isPlayerOne)
        return { 
            agentName: gameState.playerOne.name,
            cardAtHand: gameState.playerOne.cardAtHand,
            cardInPlay: gameState.cardPlayed[gameState.cardPlayed.length - 1],
            cardPlayed: gameState.cardPlayed,
            noOfCardsInMarket: gameState.market.length,
            noOfCardsWithOpponent: gameState.playerTwo.cardAtHand.length,
            availableMove: availableMoves,
            actions:[],
            rules: gameState.rules, 
            createdOn : Date.now(), 
            lastUpdatedOn : Date.now(),
        }
    else
        return { 
            agentName: gameState.playerTwo.name,
            cardAtHand: gameState.playerTwo.cardAtHand,
            cardInPlay: gameState.cardPlayed[gameState.cardPlayed.length - 1],
            cardPlayed: gameState.cardPlayed,
            noOfCardsInMarket: gameState.market.length,
            noOfCardsWithOpponent: gameState.playerOne.cardAtHand.length,
            availableMove: availableMoves,
            actions:[],
            rules: gameState.rules, 
            createdOn : Date.now(), 
            lastUpdatedOn : Date.now(),
        }   
    
}