/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2021 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */

import axios from "axios"


var MOVE_WAITING_PERIOD = 1500


/**
 * This function adds card to player and remove that same card from
 * market for n number of times       
 * 
 * @param {*} player array of player cards
 * @param {*} market array of market cards
 * @param {*} times numbers of times to pick from market
 */

export function goMarket(player,  market, times = 1){


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



/**
 * This function takes in the player cards at hand an the action to be   
 * taken it takes it, if a card is played it adds it to gamePlayed and   
 * subracts it from the player card at hand 
 * 
 * @param {*} player the player making the move
 * @param {*} card the move made by player
 * @param {*} cardPlayed the card played in the game
 * @param {*} number the number on the card
 */
export function playGame(player, card, cardPlayed, number){


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

export function checkPlayResponse(response, gameState, events, playerTwoState, agent){

    setTimeout(handleResponse, MOVE_WAITING_PERIOD, 0, response, gameState, events, playerTwoState, agent)

}

/**
 *  Recursive function that loop through the server response and    
 *  handle them appropriately it calls the setTimeout function      
 *  it also update agent states    
 *                                  
 * @param {*} index current index in the moves array
 * @param {*} response array of moves
 * @param {*} gameState current gameState
 * @param {*} events events emitter object
 * @param {*} playerTwoState  state of the agent
 */

function handleResponse(index, response, gameState, events, playerTwoState, agent){
    
    let playerCardAtHand = gameState.playerTwo.cardAtHand
    let opponentsCardAtHand = gameState.playerOne.cardAtHand
    let cardPlayed = gameState.cardPlayed
    let market = gameState.market


    let rules = gameState.rules
   
    let cardIndex = response[index][0].indexOf(":") + 1
    let number = parseInt(response[index][0].slice(cardIndex, response[index][0].length))

    let availableMoves = availableMove(playerCardAtHand, cardPlayed[cardPlayed.length - 1])

    playerTwoState.push(createState(gameState, availableMoves, false, agent))

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


/**
 * This method checks if any of the player cards or market is less 
 * than one then it calls the reward function, if  any      
 * of the player cards is finished that player wins the game and the 
 * game is over but if market is finished, it adds all cards from    
 * card Played to market and shuffle them while calling the reward
 * function, but the game continues     
 * 
 * @param {*} state object of the current game state
 */

export function checkGameState(state){

    let gameState = state.gameState

    if(gameState.playerOne.cardAtHand.length < 1 || gameState.playerOne.cardAtHand.length < 1){

        rewards(state)

    }else if(gameState.market.length < 1){

        rewards(state)
 
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


export function rewards(state){

    let gameState = state.gameState

    let playerOneStates = state.playerOneStates
    let playerOneActions = state.playerOneActions

    let playerTwoStates = state.playerTwoStates
    let playerTwoActions = state.playerTwoActions

    let playerOneStateAndAction = separateStateAndAction(playerOneStates, playerOneActions)
    let playerTwoStateAndAction = separateStateAndAction(playerTwoStates, playerTwoActions)
  

    if(gameState.playerOne.cardAtHand < 1){

        alert(gameState.playerOne.name + " Wins ")
    } 

    if(gameState.playerTwo.cardAtHand < 1){

        alert(gameState.playerTwo.name + " Wins ")
    } 

    axios.post("/api/save", {"agentName": gameState.playerTwo.name, "user": gameState.playerOne.name, gameState: gameState, playerOneStatesAndActions: playerOneStateAndAction, playerTwoStatesAndActions: playerTwoStateAndAction }).then((res)=>{  

        console.log(res)
        
    }).catch(error => {

        console.log(error)

        alert(error)
    })
    
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

/**
 * This function receive two arguments, the function loop through 
 * the first argument and return 
 * 
 * @param {*} playerCard the card in the player hand
 * @param {*} inPlayCard the card played
 * @returns return all the valid moves that can be made 
 */

export function availableMove(playerCard, inPlayCard){

    let index_in = inPlayCard.indexOf(":") + 1
    let number_in = parseInt(inPlayCard.slice(index_in, inPlayCard.length))
    let shape_in = inPlayCard.slice(0, index_in)

    let availableMove = ["z:goMarket"]

    for(let i = 0; i < playerCard.length; i++){
         
        let index = playerCard[i].indexOf(":") + 1
        let number = parseInt(playerCard[i].slice(index, playerCard[i].length))
        let shape = playerCard[i].slice(0, index)

        if(number === 20){

            availableMove.sort()

            availableMove.push("circle:20", "cross:20", "square:20", "star:20", "triangle:20")
            
            return availableMove

        }if(number === number_in){

            availableMove.push(playerCard[i])

        }else if(shape === shape_in){
        
            availableMove.push(playerCard[i])

        }

    }


    return availableMove.sort()

}



export function createState(gameState,  availableMoves, isPlayerOne, agent = {}){

    if(isPlayerOne){

        return { 
            agentName: gameState.playerOne.name,
            cardAtHand: [...gameState.playerOne.cardAtHand],
            cardInPlay: gameState.cardPlayed[gameState.cardPlayed.length - 1],
            cardPlayed: [...gameState.cardPlayed],
            noOfCardsInMarket: gameState.market.length,
            noOfCardsWithOpponent: gameState.playerTwo.cardAtHand.length,
            noOfCardPlayed: gameState.cardPlayed.length,
            noOfCardAtHand: gameState.playerOne.cardAtHand.length,
            availableMove: [...availableMoves],
            rules: gameState.rules, 
        }

    }else{

        let state = {
            agentName: gameState.playerTwo.name,
            availableMove: [...availableMoves],
        }


        if(agent.useCardAtHand)
            state.cardAtHand = [...gameState.playerTwo.cardAtHand]
        if(agent.useNoOfCardAtHand)
            state.noOfCardAtHand = gameState.playerTwo.cardAtHand.length
        if(agent.useCardInPlay)
            state.cardInPlay = gameState.cardPlayed[gameState.cardPlayed.length - 1]
        if(agent.useCardPlayed)
            state.cardPlayed = [...gameState.cardPlayed]
        if(agent.useNoOfCardPlayed)
            state.noOfCardPlayed = gameState.cardPlayed.length
        if(agent.useNoOfCardsInMarket)
            state.noOfCardsInMarket = gameState.market.length
        if(agent.useNoOfCardsWithOpponent)
            state.noOfCardsWithOpponent = gameState.playerOne.cardAtHand.length
        if(agent.useRules)
            state.rules = gameState.rules



        return state
    }
    
}

export function cardIndex(availableMove, move){

    if(availableMove.length === 0) return -1

    for (let i = 0; i < availableMove.length; i++) if(availableMove[i] === move) return i   

}


/**
 * 
 * @param {*} state 
 * @param {*} action 
 */

function separateStateAndAction(state, action){

    let validStates = []
    let validActions = []


    for(let i = 0; i < action.length; i++){

        if(action[i][1] > -1){

            //state[i].actions = []
            validStates.push(state[i])
            validActions.push([action[i][0], action[i][1]])

        }

    }


    return [validStates, validActions]
}