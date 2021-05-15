/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2021 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */


const { EventEmitter } = require("events")
const { query } = require("express")
const agents = require("../models/agents")
const states = require("../models/states")


require("../configs/dbConnections")

class GameEngine extends EventEmitter{

    constructor(playerOneName, playerTwoName, rules, isPlayerOneHuman, isPlayerTwoHuman){
        
        super()

        this.playerOneName = playerOneName
        this.playerTwoName = playerTwoName

        console.log(playerOneName)
        console.log(playerTwoName)

        this.action = []
            
        this.playerOneStateRoundOld = []
        this.playerTwoStateRoundOld = []

        this.playerOneStateRoundNew = []
        this.playerTwoStateRoundNew = []

        this.playerStateOld = []
        this.playerStateNew = []

        this.playerOnePoints = 0
        this.playerTwoPoints = 0

        this.round = 1
        
        super.on("actionOutput", ()=>{

            /*

            let state = {
                            "agentName" :   this.playerName,
                            "cardAtHand"    :   [...this.cardAtHand], 
                            "noOfCardsWithOpponent" : this.noOfCardsWithOpponent,
                            "cardInPlay"    :   this.inPlayCards,
                            "cardPlayed"    : [...this.cardPlayed], 
                            "noOfCardsInMarket" :    this.noOfCardsInMarket,
                            "availableMove" :   [...this.availableMove],
                            "actions"   :   [...this.actionOutput],
                            "rules" :   this.rules
                        }
                    
            */

            let state = {
                "agentName" :   this.playerName,
                "availableMove" :   [...this.availableMove],
                "actions"   :   [...this.actionOutput],
            }

            this.action = [true, ...this.actionOutput]

            //add this state to the right player
            if(this.playerName === playerOneName)
                this.playerOneStateRoundNew.push(state)
            else
                this.playerTwoStateRoundNew.push(state)
           
            super.emit(this.eventString)

        })

        super.on("action", () => {

            /*
            for(let i = 0; i < this.states.length; i++){

                //get an aggregated sum of similar actions
                this.output = this.sumArray(this.output, this.states[i].actions)
            
            }
            */
            
            /*
            //get arithmentic mean of all the state action
            if(this.states.length > 0){

                this.actionOutput = this.multiplyArray(this.output, (1/this.states.length))
           
            }else{

                this.actionOutput = this.output
            
            }

            */

            this.actionOutput = this.output
            
            super.emit("actionOutput")

        })
    
    }

    /**
     * getter for the current round
     */
    get roundVal(){
        return this.round
    }

    /**
     * getter for the last action taken
     */
    get getAction(){
        return this.action
    }

    updateAgentWithNewStates(playerOneStates, playerTwoStates){

        //save the new states for player one
        playerOneStates.insertMany(this.playerOneStateRoundNew, (error)=>{

            if(error) console.log("error: " + error)

        })

        //save the new states for player two
        playerTwoStates.insertMany(this.playerTwoStateRoundNew, (error)=>{

            if(error) console.log("error: " + error)

        })

    }

    /**
     * This method sum the actions of different states
     * @param {*} states states array of objects
     * @returns states with summed actions without duplicate 
     */
    moderateState(states){

        let result = []

        states.forEach(state => {

            let currentState = []

            if(this.filterState(result, state).length === 0){

                this.filterState(states, state).forEach(element =>{
                    currentState.push(element)
                }) 

                if(currentState.length > 1){

                    let action = []

                    for(let i = 0; i < currentState.length - 1; i++){

                        if(i === 0)
                            action = this.sumArray(currentState[i].actions, currentState[i + 1].actions)
                        else
                            action = this.sumArray(action, currentState[i + 1].actions)

                    }

                    currentState[0].actions = action

                    result.push(currentState[0])

                }else{

                    result.push(currentState[0])

                }

            }

        })

        return result

    }

    updateAgentWithOldStates(playerStates, playerRound){

        //save the new states for player one
        playerRound.forEach(state => {

            let query = {
                "agentName": state.agentName,
                "availableMove": state.availableMove,
            }

            playerStates.updateOne(query, {actions : state.actions}, (error)=>{

                if(error) console.log("error: " + error)
    
            })

        })

    }

    /**
     * Update existing states
     * @param {*} winnerName name of winner
     * @param {*} losserName name of loser
     * @param {*} winnerPoints points to be added to winner
     * @param {*} losserPoints points to be substracted from loser
     */
    updatePlayer(winnerName, losserName, winnerPoints, losserPoints){

        agents.findOne({agentName: winnerName})
            .then((data, err) => {
                
                if(!err){

                    agents.updateOne({agentName: winnerName},
                        {
                            "wins": data.wins + 1,
                            "points": data.points + winnerPoints, 
                            "botWins": data.botWins + 1, 
                            "botPoints": data.botPoints + winnerPoints
                        }, 
                        {useFindAndModify:false}).then((data, err) => {
                            console.log(data)
                    })

                }

            })

        agents.findOne({agentName: losserName})
            .then((data, err) => {
                
                if(!err){

                    agents.updateOne({agentName: losserName},
                        {
                            "losses": data.losses + 1, 
                            "points": data.points + losserPoints, 
                            "botLosses": data.botLosses + 1, 
                            "botPoints": data.botPoints + losserPoints
                        }, 
                        {useFindAndModify:false}).then((data, err) => {
                            console.log(data)
                    })

                }

            })


    }

    /**
     * 
     * @param {*} point points to reward player with
     * @param {*} statesOld states that already exists in database
     * @param {*} statesNew states that are newly created
     * @param {*} actionsOld actions of old states
     * @param {*} actionsNew actions of new states
     */
    addReward(point, statesOld, statesNew, actionsOld, actionsNew){

        statesOld = [...statesOld]
        statesNew  = [...statesNew]
        actionsOld = [...actionsOld]
        actionsNew = [...actionsNew]

        for(let i = 0; i < statesNew.length; i++){

            statesNew[i].actions[actionsNew[i][1]] = statesNew[i].actions[actionsNew[i][1]] + point

        }

        for(let i = 0; i < statesOld.length; i++){

            statesOld[i].actions[actionsOld[i][1]] = statesOld[i].actions[actionsOld[i][1]] + point

        }

    }


    /**
     * This method is called when the game ends it reward the agents according 
     * to the reward policy   
     * @param {*} playerOneName agent one name
     * @param {*} playerTwoName agent two name
     * @param {*} playerOneCardAtHand player one card at hand
     * @param {*} playerTwoCardAtHand player two card at hand
     * @param {*} playerOneActionsNew actions of player one that are new
     * @param {*} playerOneActionsOld actions of player one that are gotten from database
     * @param {*} playerTwoActionsNew actions of player two that are new
     * @param {*} playerTwoActionsOld actions of player two that are gotten from database
     */
    rewards(playerOneName, playerTwoName, playerOneCardAtHand, playerTwoCardAtHand, playerOneActionsNew, playerOneActionsOld, playerTwoActionsNew, playerTwoActionsOld){

        this.round++
        
        let playerOneNumber = 0
        let playerTwoNumber = 0

        const playerOneStates = states(playerOneName)
        const playerTwoStates = states(playerTwoName)

        //sum the card numbers if any is remaining for agent one
        if(playerOneCardAtHand.length > 0){

            for(let i = 0; i < playerOneCardAtHand.length; i++)
            {

                let index_in = playerOneCardAtHand[i].indexOf(":") + 1
                let number_in = parseInt(playerOneCardAtHand[i].slice(index_in, playerOneCardAtHand[i].length))
                let shape_in = playerOneCardAtHand[i].slice(0, index_in)

                if(shape_in == "star"){

                    playerOneNumber += number_in * 2

                }else{

                    playerOneNumber += number_in 

                }
                
            }
            
        }

        //sum the card numbers if any is remaining for agent two
        if(playerTwoCardAtHand.length > 0){

            for(let i = 0; i < playerTwoCardAtHand.length; i++)
            {

                let index_in = playerTwoCardAtHand[i].indexOf(":") + 1
                let number_in = parseInt(playerTwoCardAtHand[i].slice(index_in, playerTwoCardAtHand[i].length))
                let shape_in = playerTwoCardAtHand[i].slice(0, index_in)

                if(shape_in == "star"){

                    playerTwoNumber += number_in * 2

                }else{

                    playerTwoNumber += number_in 

                }
                
            }
            
        }

        if(playerOneNumber !== 0 || playerTwoNumber !== 0){

            //penalise both agent
            if(this.playerOneNumber < this.playerTwoNumber){

                // rewards when player one has fewer card number than player two
                this.addReward(5 - 1 * playerOneNumber / 100, this.playerOneStateRoundOld, this.playerOneStateRoundNew, playerOneActionsOld, playerOneActionsNew)
                this.addReward(-1 * playerTwoNumber / 100, this.playerTwoStateRoundOld, this.playerTwoStateRoundNew, playerTwoActionsOld, playerTwoActionsNew)

                this.playerOnePoints += 5 - 1 * playerOneNumber / 100
                this.playerTwoPoints += -1 * playerTwoNumber / 100

            }else if(this.playerOneNumber > this.playerTwoNumber){

                // rewards when player two has fewer card number than player one
                this.addReward(-1 * playerOneNumber / 100, this.playerOneStateRoundOld, this.playerOneStateRoundNew, playerOneActionsOld, playerOneActionsNew)
                this.addReward(5 - 1 * playerTwoNumber / 100, this.playerTwoStateRoundOld, this.playerTwoStateRoundNew, playerTwoActionsOld, playerTwoActionsNew)

                this.playerOnePoints += -1 * playerOneNumber / 100
                this.playerTwoPoints += 5 -1 * playerTwoNumber / 100

            }else{

                //rewards when player two has same card number as player one
                this.addReward(-1 * playerOneNumber / 100, this.playerOneStateRoundOld, this.playerOneStateRoundNew, playerOneActionsOld, playerOneActionsNew)
                this.addReward(-1 * playerTwoNumber / 100, this.playerTwoStateRoundOld, this.playerTwoStateRoundNew, playerTwoActionsOld, playerTwoActionsNew)

                this.playerOnePoints += -1 * playerOneNumber / 100
                this.playerTwoPoints += -1 * playerTwoNumber / 100

            }
        
        }

        if(playerOneNumber === 0){

            console.log("Player One Win")
            
            //reward player one
            this.addReward(5, this.playerOneStateRoundOld, this.playerOneStateRoundNew, playerOneActionsOld, playerOneActionsNew)
           
            //penalise player two
            this.addReward(-2 - 1 * playerTwoNumber / 10, this.playerTwoStateRoundOld, this.playerTwoStateRoundNew, playerTwoActionsOld, playerTwoActionsNew)

            this.updatePlayer(playerOneName, playerTwoName, 5, -2 - 1 * playerTwoNumber / 10)

        }else if(playerTwoNumber === 0){

            console.log("Player Two Win")
            //penalise player one
            this.addReward(-2 - 1 * playerOneNumber / 10, this.playerOneStateRoundOld, this.playerOneStateRoundNew, playerOneActionsOld, playerOneActionsNew)
            //reward player two
            this.addReward(5, this.playerTwoStateRoundOld, this.playerTwoStateRoundNew, playerTwoActionsOld, playerTwoActionsNew)
            
            this.updatePlayer(playerTwoName, playerOneName, 5, -2 - 1 * playerOneNumber / 10)

        }

        if(this.playerOneStateRoundOld.length > 0){

            // remove duplicate states
            this.playerOneStateRoundOld = this.moderateState(this.playerOneStateRoundOld)
            
            this.updateAgentWithOldStates(playerOneStates, this.playerOneStateRoundOld)
        }

        if(this.playerTwoStateRoundOld.length > 0){

            // remove duplicate states
            this.playerTwoStateRoundOld = this.moderateState(this.playerTwoStateRoundOld)
            
            this.updateAgentWithOldStates(playerTwoStates, this.playerTwoStateRoundOld)
        }

    
        // remove duplicate states
        this.playerOneStateRoundNew = this.moderateState(this.playerOneStateRoundNew)
        this.playerTwoStateRoundNew = this.moderateState(this.playerTwoStateRoundNew)

        //save new states
        this.updateAgentWithNewStates(playerOneStates, playerTwoStates)

        //empty the StateRound array after one round
        this.playerOneStateRoundNew = []
        this.playerOneStateRoundOld = []

        this.playerTwoStateRoundNew = []
        this.playerTwoStateRoundOld = []

        playerOneActionsNew = []
        playerOneActionsOld = []
        playerTwoActionsNew = []
        playerTwoActionsOld = []
    }
    
    /**
     * This method search for matching states in the database
     * @param {*} playerName name of current agent
     * @param {*} cardPlayed last card played
     * @param {*} cardAtHand array of cards of current agent
     * @param {*} noOfCardsWithOpponent number of cards with opponent
     * @param {*} availableMove array moves that the player can make
     * @param {*} inPlayCards array of cards played
     * @param {*} noOfCardsInMarket number of cards in market 
     * @param {*} rules game rules
     * @param {*} eventString name of events
     */
    stateFinder(playerName, cardPlayed, cardAtHand,  noOfCardsWithOpponent, availableMove, inPlayCards, noOfCardsInMarket, rules, eventString="received"){

        this.playerName = playerName

        //make sure action array is empty for every play
        this.action = []

        /*
        let query = {
                    "agentName":playerName,
                    "cardAtHand":cardAtHand, 
                    "noOfCardsWithOpponent": noOfCardsWithOpponent,
                    "cardInPlay":inPlayCards,
                    "cardPlayed": cardPlayed, 
                    "noOfCardsInMarket":noOfCardsInMarket,
                    "availableMove":availableMove,
                    "rules":rules
                }
                */

        agents.findOne({agentName:playerName}, (error, data)=>{

            if(error===null){

                this.agent = data
                
                let query = {
                    "agentName":playerName,
                    "availableMove":availableMove,
                    }
                
                if(this.agent.useCardAtHand)
                    query.cardAtHand = this.cardAtHand
                if(this.agent.useNoOfCardAtHand)
                    query.noOfCardAtHand = this.cardAtHand.length
                if(this.agent.useCardInPlay)
                    query.cardInPlay = this.cardPlayed[this.cardPlayed.length - 1]
                if(this.agent.useCardPlayed)
                    query.cardPlayed = this.cardPlayed
                if(this.agent.useNoOfCardPlayed)
                    query.noOfCardPlayed = this.cardPlayed.length
                if(this.agent.useNoOfCardsInMarket)
                    query.noOfCardsInMarket = this.noOfCardsInMarket
                if(this.agent.useNoOfCardsWithOpponent)
                    query.noOfCardsWithOpponent = this.noOfCardsWithOpponent
                 

       


                const playerStates = states(playerName)

                playerStates.find(query, (error, data) =>{

                    if(data.length === 0){

                        this.stateCreater(playerName, cardPlayed, cardAtHand,  noOfCardsWithOpponent, availableMove, inPlayCards, noOfCardsInMarket, rules, eventString)
                        
                        if(error) console.log("error: " + error)

                    }else{

                        //console.log(data)
                        this.action = [false, data[0].actions]

                        console.log(this.action)
                        
                        if(playerName === this.playerOneName)
                            this.playerOneStateRoundOld.push(data[0])
                        else
                            this.playerTwoStateRoundOld.push(data[0])
                    
                        super.emit(eventString)

                    }

                })

            }

        })

    }

    /**
     * This method creates a state and save it to an angent in the database 
     * it also save it to the correspondingn state array 
     * @param {*} playerName name of current agent
     * @param {*} cardPlayed last card played
     * @param {*} cardAtHand array of cards of current agent
     * @param {*} noOfCardsWithOpponent number of cards with opponent
     * @param {*} availableMove array moves that the player can make
     * @param {*} inPlayCards array of cards played
     * @param {*} noOfCardsInMarket number of cards in market 
     * @param {*} rules game rules
     * @param {*} eventString name of events
     */
    stateCreater(playerName, cardPlayed, cardAtHand,  noOfCardsWithOpponent, availableMove, inPlayCards, noOfCardsInMarket, rules, eventString){
        
        this.cardAtHand = cardAtHand
        this.noOfCardsWithOpponent = noOfCardsWithOpponent
        this.inPlayCards = inPlayCards
        this.cardPlayed = cardPlayed
        this.noOfCardsInMarket = noOfCardsInMarket
        this.availableMove = availableMove
        this.rules = rules
        this.eventString = eventString

        this.output = []
        
        //set inital values of zeros for output
        for(let i = 0; i < availableMove.length; i++){
            this.output.push(0)
        }

        /*
        let state = {
            "agentName" :   this.playerName,
            "cardAtHand"    :   [...this.cardAtHand], 
            "noOfCardsWithOpponent" : this.noOfCardsWithOpponent,
            "cardInPlay"    :   this.inPlayCards,
            "cardPlayed"    : [...this.cardPlayed], 
            "noOfCardsInMarket" :    this.noOfCardsInMarket,
            "availableMove" :   [...this.availableMove],
            "actions"   :   [...this.output],
            "rules" :   this.rules
        }

        */

        let state = {
            "agentName" :   this.playerName,
            "availableMove" :   [...this.availableMove],
            "actions"   :   [...this.output],
        }

        
        
        if(this.agent.useCardAtHand)
            state.cardAtHand = this.cardAtHand
        if(this.agent.useNoOfCardAtHand)
            state.noOfCardAtHand = this.cardAtHand.length
        if(this.agent.useCardInPlay)
            state.cardInPlay = this.cardPlayed[this.cardPlayed.length - 1]
        if(this.agent.useCardPlayed)
            state.cardPlayed = this.cardPlayed
        if(this.agent.useNoOfCardPlayed)
            state.noOfCardPlayed = this.cardPlayed.length
        if(this.agent.useNoOfCardsInMarket)
            state.noOfCardsInMarket = this.noOfCardsInMarket
        if(this.agent.useNoOfCardsWithOpponent)
            state.noOfCardsWithOpponent = this.noOfCardsWithOpponent

        this.action = [true, this.output]
                
        if(playerName === this.playerOneName)
            this.playerOneStateRoundNew.push(state)
        else
            this.playerTwoStateRoundNew.push(state)
            
        super.emit(eventString)

        //this.actionCreater(availableMove, playerName)
        
    }

    /**
     * This method initialise actions for newly created states 
     * @deprecated not used
     * @param {*} availableMove array of moves for playing agent
     * @param {*} playerName name of playing agent
     */
    actionCreater(availableMove, playerName){
        
        let query = {
            "agentName":playerName,
            "availableMove":availableMove
            }
        
        this.output = []
        
        //set inital values of zeros for output
        for(let i = 0; i < availableMove.length; i++){
            this.output.push(0)
        }

        this.states = []

        const playerStates = states(playerName)

        //find state with similar cars and moves
        playerStates.find(query, (error, data) =>{

            this.states = data

            if(error) console.log("error: " + error)
                       
            super.emit('action')

        })
        
    }

    /**
     * This method adds the elements two arrays and return the sum
     * @param {*} array1 first array
     * @param {*} array2 second array
     * @returns  sum of array
     */
    sumArray(array1, array2){

        let result = []

        for(let i = 0; i < array1.length; i++){
            result.push(array1[i] + array2[i])
        }

        return result
    }

    /**
     * This method multiply an array with a scaler value
     * @param {*} array array to be multiplied
     * @param {*} num number to multiply array with
     * @returns array of results
     */
    multiplyArray(array, num){

        let result = []

        for(let i = 0; i < array.length; i++){
            result.push(array[i] * num)
        }

        return result
    }

    findState(states, state) {

        //+---------------------------------------------------------------------------+
        //|    This method receives two arguments states and state, and uses the      |
        //|    state object to search the states array return the state object        |
        //|    if found                                                               |
        //+---------------------------------------------------------------------------+

        return states.find(function(el) {

            let cardAtHand = true
            let noOfCardAtHand = true
            let cardInPlay = true
            let cardPlayed = true
            let noOfCardsInMarket = true
            let noOfCardsWithOpponent = true

            if(this.agent.useCardAtHand)
                cardAtHand = compareArray(el.cardAtHand, state.cardAtHand)

            if(this.agent.useNoOfCardAtHand)
                noOfCardAtHand = compareArray(el.cardAtHand.length, state.cardAtHand.length)
    
            if(this.agent.useCardInPlay)
                cardInPlay = el.cardInPlay == state.cardInPlay 

            if(this.agent.useCardPlayed)
                cardPlayed = compareArray(el.cardPlayed, state.cardPlayed)

            if(this.agent.useNoOfCardPlayed)
                noOfCardPlayed = compareArray(el.cardPlayed.length, state.cardPlayed.length)

            if(this.agent.useNoOfCardsInMarket)
                noOfCardsInMarket = el.noOfCardsInMarket == state.noOfCardsInMarket

            if(this.agent.useNoOfCardsWithOpponent)
                noOfCardsWithOpponent = el.noOfCardsWithOpponent == state.noOfCardsWithOpponent

  
            let condition = compareArray(el.availableMove, state.availableMove) && cardAtHand && noOfCardAtHand
                            && cardInPlay && cardPlayed && noOfCardPlayed && noOfCardsInMarket && noOfCardsWithOpponent
 
            return condition

        })

    }

    /**
     * This uses the state object to search the states
     * @param {*} states array of states object
     * @param {*} state state object
     * @returns array of filtered state that matched the conditions
     */
    filterState(states, state) {

        return states.filter(function(el) {

            return compareArray(el.availableMove, state.availableMove)
        
        })

    }

}

function compareArray(array1, array2){

    //+---------------------------------------------------------------------------+
    //|    This function compares two one dimensional arrays and return true if   |
    //|    they are thesame else false it takes an arrays as the first and        |
    //|    second argument                                                        |
    //+---------------------------------------------------------------------------+ 

    if(array1.length == array2.length){

        for(let i = 0; i < array1.length; i++){

            if(array1[i] != array2[i]){
                return false;
            }

        }

    }else{
        return false
    }

    return true

}

module.exports = GameEngine