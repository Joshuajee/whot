/**
 * @author Joshua Evuetapha
 * @copyright (C) 2022 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */

import axios from "axios";
import { empty, removeLast, updateGameState, updatePlayerTwoStates } from "../Redux/actions";


var MOVE_WAITING_PERIOD = 1500


/**
 * This function adds card to player and remove that same card from
 * market for n number of times       
 * 
 * @param {*} player array of player cards
 * @param {*} market array of market cards
 * @param {*} times numbers of times to pick from market
 */

export function goMarket(gameState, player, times = 1, dispatch){

    const newGameState = { ...gameState };
    const market  = newGameState.market;

    for(let i = 0; i < times; i ++){

        if(market.length > 0){

            if (player === gameState.playerOne.name) {

                newGameState.playerOne.cardAtHand.push(market[market.length - 1]);

            } else if (player === gameState.playerTwo.name) {

                newGameState.playerTwo.cardAtHand.push(market[market.length - 1]);
            }

            newGameState.market.pop();

        }

    }

    dispatch(updateGameState(newGameState));

}



export function referee(gameState, card, playerName, dispatch) {

    const playerTwoName = gameState.playerTwo.name;
    const playerOneName = gameState.playerOne.name;
    let name = playerOneName;

    if(playerName === playerOneName) {
        name = playerTwoName;
    } else if(playerName === playerTwoName) {
        name = playerOneName;
    }

    const rules = gameState.rules;

    const index = card[0].indexOf(":") + 1;
    const number = parseInt(card[0].slice(index, card[0].length));

    if(card[1] !== -2) playGame(gameState, playerName, card, number, dispatch);

    if(rules.holdOn.active && number === rules.holdOn.card){

        return false
       
    }else if(rules.pickTwo.active && number === rules.pickTwo.card){

        goMarket(gameState, name, 2, dispatch);

        return false

    }else if(rules.pickThree.active && number === rules.pickThree.card){

        goMarket(gameState, name, 3, dispatch);

        return false

    }else if(rules.suspension.active && number === rules.suspension.card){

        return false

    }else if(rules.generalMarket.active && number === rules.generalMarket.card){

        goMarket(gameState, name, 1, dispatch);

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
export function playGame(gameState, playerName, card, number, dispatch){

    const newGameState = { ...gameState };

    let playerCardAtHand = newGameState.playerTwo.cardAtHand;

    if (newGameState.playerOne.name === playerName) {
        playerCardAtHand = newGameState.playerOne.cardAtHand;
    }

    console.log("game played ", card);

    if (number === 20){

        newGameState.cardPlayed.pop();

        newGameState.cardPlayed.push(card[0]);

    } else if(card[0] !== "z:goMarket"){

        newGameState.cardPlayed.push(card[0]);

        for(let i = 0; i < playerCardAtHand.length; i++){

            if(playerCardAtHand[i] === card[0]) playerCardAtHand.splice(i, 1);
            
        }

    }

    dispatch(updateGameState(newGameState));

    console.log(" Game State ", newGameState)

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

export function checkPlayResponse(response, gameState, playerTwoState, agent, dispatch, setOpponetIsPlaying){

    setTimeout(handleResponse, MOVE_WAITING_PERIOD, 0, response, gameState, playerTwoState, agent, dispatch, setOpponetIsPlaying)

}

/**
 *  Recursive function that loop through the server response and    
 *  handle them appropriately it calls the setTimeout function      
 *  it also update agent states    
 *                                  
 * @param {*} index current index in the moves array
 * @param {*} response array of moves
 * @param {*} gameState current gameState
 * @param {*} playerTwoState  state of the agent
 */

function handleResponse(index, response, gameState, playerTwoState, agent, dispatch, setOpponetIsPlaying){

    const playerTwoName = gameState.playerTwo.name;
    const playerCardAtHand = gameState.playerTwo.cardAtHand;
    const cardPlayed = gameState.cardPlayed;

    const cardIndex = response[index][0].indexOf(":") + 1
    const number = parseInt(response[index][0].slice(cardIndex, response[index][0].length))

    const availableMoves = availableMove(playerCardAtHand, cardPlayed[cardPlayed.length - 1])

    const state = (createState(gameState, availableMoves, false, agent));

    if(response[index][1] >= 0) {
        dispatch(updatePlayerTwoStates(state));
    }

    if(number === 20){

        const newGameState = {...gameState}

        newGameState.cardPlayed.push(response[index][0])

        for(let i = 0; i < playerCardAtHand.length; i++){

            if(playerCardAtHand[i] === "whot:20") newGameState.playerTwo.cardAtHand.splice(i, 1)
            
        }

        dispatch(updateGameState(newGameState))

    }else if(response[index][0] !== "z:goMarket"){

        referee(gameState, response[index], playerTwoName, dispatch);
        
    }else{

        goMarket(gameState, playerTwoName, 1, dispatch);

    }

    if(index + 1 < response.length) setTimeout(handleResponse, MOVE_WAITING_PERIOD, index + 1, response, gameState, playerTwoState, agent, dispatch, setOpponetIsPlaying)
    else { 
        setOpponetIsPlaying(false);
    }
}


/**
 * This method checks if any of the player cards or market is less 
 * than one then it calls the reward function, if  any      
 * of the player cards is finished that player wins the game and the 
 * game is over but if market is finished, it adds all cards from    
 * card Played to market and shuffle them while calling the reward
 * function, but the game continues     
 * 
 * @param {*} gameState object of the current game state
 */

export function checkGameState(gameState, playerOneStates, playerOneActions, playerTwoStates, playerTwoActions, dispatch, setModal){

    const newGameState = {...gameState};

    const playerOneCards = newGameState.playerOne.cardAtHand;

    const playerTwoCards = newGameState.playerTwo.cardAtHand;

    const market = newGameState.market;

    const cardPlayed = newGameState.cardPlayed;
/*
    console.log(" state 1", playerOneStates);
    console.log(" state 2", playerTwoStates);
    console.log(" action 1", playerOneActions);
    console.log(" action 2", playerTwoActions);
*/
    if(playerOneCards.length < 1 || playerTwoCards.length < 1)  {

        rewards(gameState, playerOneStates, playerOneActions, playerTwoStates, playerTwoActions, dispatch, setModal);

        if(gameState.playerOne.cardAtHand < 1){

            setModal({ type: 'Game End',  text: gameState.playerOne.name + " Wins "});
        } 
    
        if(gameState.playerTwo.cardAtHand < 1){

            setModal({ type: 'Game End',  text: gameState.playerTwo.name + " Wins "});
        } 
    
    }else if(market.length < 1) {

        rewards(gameState, playerOneStates, playerOneActions, playerTwoStates, playerTwoActions, dispatch, setModal);

        const inPlay = sanitizeCardPlayed(cardPlayed);

        //adds all the card played to market
        newGameState.market = inPlay;
        
        //reasign inplay giving it just its last value
        newGameState.cardPlayed = [ cardPlayed[cardPlayed.length - 1]];

        //removed the last card from market
        newGameState.market.pop();

        //shuffles the cards
        newGameState.market = shuffle([...newGameState.market]);

        dispatch(updateGameState(newGameState));

        console.log(newGameState)

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

export function undoMove(gameState, card, playerOneStates, playerOneActions, dispatch) {

    const newGameState = {  ...gameState  };

    //add card taken from player back to player    
    newGameState.playerOne.cardAtHand.push(card[0])

    //undo last game played
    newGameState.cardPlayed.pop()

    //undo last state update
    dispatch(removeLast(playerOneStates));
    dispatch(removeLast(playerOneActions));

    dispatch(updateGameState(newGameState));

}


export function rewards(gameState, playerOneStates, playerOneActions, playerTwoStates, playerTwoActions, dispatch, setModal) {

    let playerOneStateAndAction = separateStateAndAction(playerOneStates, playerOneActions);
    let playerTwoStateAndAction = separateStateAndAction(playerTwoStates, playerTwoActions);


    axios.post("/api/v1/save", 
        {
            agentName: gameState.playerTwo.name, 
            user: gameState.playerOne.name, 
            gameState: gameState, 
            playerOneStatesAndActions: playerOneStateAndAction, 
            playerTwoStatesAndActions: playerTwoStateAndAction 
        }
        ).then((res)=>{  

        console.log(res)
        //empty state array
        dispatch(empty());
        
        
    }, err => {

        console.log(err)

        setModal({ type: 'Network Error',  text: err});
        
    })

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