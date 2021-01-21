/*
 * Copyright (C) 2021 Joshua Evuetapha
 * Twitter : @evuetaphajoshua
 * Github : @Joshuajee
 * This program is distributed under the MIT license
 */

const { EventEmitter } = require("events")
const agents = require("../models/agents")
const states = require("../models/states")


require("../configs/dbConnections")

class GameEngine extends EventEmitter{

    constructor(playerOneName, playerTwoName, rules, isPlayerOneHuman, isPlayerTwoHuman){
        
        super()

        console.log(playerOneName)
        console.log(playerTwoName)

        this.action = []
            
        this.playerOneStateRoundOld = []
        this.playerTwoStateRoundOld = []

        this.playerOneStateRoundNew = []
        this.playerTwoStateRoundNew = []

        this.playerStateOld = []
        this.playerStateNew = []

        
        this.round = 1
        
        super.on("actionOutput", ()=>{

            const state = {
                            "agentName":this.playerName,
                            "cardAtHand":this.cardAtHand, 
                            "noOfCardsWithOpponent": this.noOfCardsWithOpponent,
                            "cardInPlay":this.inPlayCards,
                            "cardPlayed": this.cardPlayed, 
                            "noOfCardsInMarket":this.noOfCardsInMarket,
                            "availableMove":this.availableMove,
                            "actions":this.actionOutput,
                            "rules":this.rules
                        }
                    
            this.action = [true, this.actionOutput]

            console.log(this.eventString)

            //add this state to the right player
            if(this.playerName === playerOneName)
                this.playerOneStateRoundNew.push(state)
            else
                this.playerTwoStateRoundNew.push(state)

            super.emit(this.eventString)
        })

        super.on("action", () => {

            for(let i = 0; i < this.states.length; i++){

                //get an aggregated sum of similar actions
                this.output = this.sumArray(this.output, this.states[i].actions)
            }
 
            //get arithmentic mean of all the state action
            if(this.states.length > 0){
                this.actionOutput = this.multiplyArray(this.output, (1/this.states.length))
            }else{
                this.actionOutput = this.output
            }
            
            super.emit("actionOutput")

        })
    

        
    }

    get roundVal(){
        return this.round
    }

    get getAction(){
        return this.action
    }

    addReward(point, statesOld, statesNew, actionsOld, actionsNew){

        //+-----------------------------------------------------------------+
        //|  This method is used to add rewards to the agent in question    |                                                   |    
        //+-----------------------------------------------------------------+

        for(let i = 0; i < statesNew.length; i++){

            statesNew[i].actions[actionsNew[i][1]] = statesNew[i].actions[actionsNew[i][1]] + point
            this.playerStateNew.push(statesNew[i])

        }

        for(let i = 0; i < statesOld.length; i++){

            statesOld[i].actions[actionsOld[i][1]] = statesOld[i].actions[actionsOld[i][1]] + point
            this.playerStateOld.push(statesOld[i])

        }

        console.log(this.playerTwoStateOne)

        console.log(this.playerTwoStateOld)
        
    }


    rewards(playerOneName, playerTwoName, playerOneCardAtHand, playerTwoCardAtHand, playerOneActionsNew, playerOneActionsOld, playerTwoActionsNew, playerTwoActionsOld){

        //+---------------------------------------------------------------------------+
        //|  This method is called when the game ends it reward the agents according  |
        //|  to the reward policy                                                     |    
        //+---------------------------------------------------------------------------+

        this.round++
        
        let playerOneNumber = 0
        let playerTwoNumber = 0


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

        if(playerOneNumber != 0 || playerTwoNumber != 0){
            //penalise both agent
            if(this.playerOneNumber < this.playerTwoNumber){
                // rewards when player one has fewer card number than player two
                this.addReward(5 - 1 * playerOneNumber / 100, this.playerOneStateRoundOld, this.playerOneStateRoundNew, playerOneActionsOld, playerOneActionsNew)
                this.addReward(-1 * playerTwoNumber / 100, this.playerTwoStateRoundOld, this.playerTwoStateRoundNew, playerTwoActionsOld, playerTwoActionsNew)
            
            }else if(this.playerOneNumber > this.playerTwoNumber){
                // rewards when player two has fewer card number than player one
                this.addReward(-1 * playerOneNumber / 100, this.playerOneStateRoundOld, this.playerOneStateRoundNew, playerOneActionsOld, playerOneActionsNew)
                this.addReward(5 - 1 * playerTwoNumber / 100, this.playerTwoStateRoundOld, this.playerTwoStateRoundNew, playerTwoActionsOld, playerTwoActionsNew)
       
            }else{
                //rewards when player two has same card number as player one
                this.addReward(-1 * playerOneNumber / 100, this.playerOneStateRoundOld, this.playerOneStateRoundNew, playerOneActionsOld, playerOneActionsNew)
                this.addReward(-1 * playerTwoNumber / 100, this.playerTwoStateRoundOld, this.playerTwoStateRoundNew, playerTwoActionsOld, playerTwoActionsNew)

            }


         }

        if(playerOneNumber == 0){

            console.log("Player One Win")
            //reward player one
            this.addReward(playerOneName, 5, this.playerOneStateRoundOld, this.playerOneStateRoundNew, playerOneActionsOld, playerOneActionsNew)
            //penalise player two
            this.addReward(playerTwoName, -2 - 1 * playerTwoNumber / 10, this.playerTwoStateRoundOld, this.playerTwoStateRoundNew, playerTwoActionsOld, playerTwoActionsNew)

            //save the new states
            states.insertMany(this.playerStateNew)

        }else if(playerTwoNumber == 0){

            console.log("Player Two Win")
            //penalise player one
            this.addReward(playerOneName, -2 - 1 * playerOneNumber / 10, this.playerOneStateRoundOld, this.playerOneStateRoundNew, playerOneActionsOld, playerOneActionsNew)
            //reward player two
            this.addReward(playerTwoName, 5, this.playerTwoStateRoundOld, this.playerTwoStateRoundNew, playerTwoActionsOld, playerTwoActionsNew)
            
            //save the new states
            states.insertMany(this.playerStateNew)
    
        }

        //empty the StateRound array after one round
        this.playerOneStateRoundNew = []
        this.playerOneStateRoundOld = []

        this.playerTwoStateRoundNew = []
        this.playerTwoStateRoundOld = []
  
    }
    

    stateFinder(playerName, cardPlayed, cardAtHand,  noOfCardsWithOpponent, availableMove, inPlayCards, noOfCardsInMarket, rules, eventString="received"){

        //+---------------------------------------------------------------------------+
        //|  This method finds all the relevant states an angent has                  |
        //+---------------------------------------------------------------------------+

        this.playerName = playerName

        //make sure action array is empty for every play
        this.action = []

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

        console.log("search")
        
        states.find(query, (error, data) =>{


            if(data.length === 0){

                this.stateCreater(playerName, cardPlayed, cardAtHand,  noOfCardsWithOpponent, availableMove, inPlayCards, noOfCardsInMarket, rules, eventString)
            
            }else{

                this.action = [false, data.action]

                if(playerName === playerOneName)
                    this.playerOneStateRoundOld.push(data)
                else
                    this.playerTwoStateRoundOld.push(data)
                
                super.emit(eventString)

            }

        })

    }


    stateCreater(playerName, cardPlayed, cardAtHand,  noOfCardsWithOpponent, availableMove, inPlayCards, noOfCardsInMarket, rules, eventString){
        
        //+---------------------------------------------------------------------------+
        //|  This method creates a state and save it to an angent in the database     |
        //|  it also save it to the correspondingn state array                        |
        //+---------------------------------------------------------------------------+

        this.cardAtHand = cardAtHand
        this.noOfCardsWithOpponent = noOfCardsWithOpponent
        this.inPlayCards = inPlayCards
        this.cardPlayed = cardPlayed
        this.noOfCardsInMarket = noOfCardsInMarket
        this.availableMove = availableMove
        this.rules = rules
        this.eventString = eventString

        this.actionCreater(availableMove, playerName)
        
    }



    actionCreater(availableMove, playerName){

        //+---------------------------------------------------------------------------+
        //|  This method initialise actions for newly created states                  |
        //+---------------------------------------------------------------------------+

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

        states.find(query, (error, data) =>{

            this.states = data
                       
            super.emit('action')

        })

        
        
    }


    sumArray(array1, array2){

        //+---------------------------------------------------------------------------+
        //|    This method adds two arrays and return the sum                         |
        //+---------------------------------------------------------------------------+

        let result = []

        for(let i = 0; i < array1.length; i++){
            result.push(array1[i] + array2[i])
        }

        return result
    }

    multiplyArray(array, num){

        //+---------------------------------------------------------------------------+
        //|    This method multiply an array with a scaler value, it receive an       |
        //|    array as the first argument and the scalar value as the second         |
        //+---------------------------------------------------------------------------+

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

            let condition = compareArray(el.cardAtHand, state.cardAtHand)           && 
                            compareArray(el.cardPlayed, state.cardPlayed)           && 
                            compareArray(el.availableMove, state.availableMove)     &&
                            el.cardInPlay == state.cardInPlay                          &&
                            el.noOfCardsInMarket == state.noOfCardsInMarket             &&
                            el.noOfCardsWithOpponent == state.noOfCardsWithOpponent           

            return condition

        })

    }


    filterState(states, state) {

        //+---------------------------------------------------------------------------+
        //|    This method receives two arguments states and state, and uses the      |
        //|    state object to search the states array return an array of state       |
        //|    objects that was found                                                 |
        //+---------------------------------------------------------------------------+


        return states.filter(function(el) {

            return compareArray(el.availableMove, state)

        })

    }
   

}

function compareArray(array1, array2){

    //+---------------------------------------------------------------------------+
    //|    This function compares two one dimensional arrays and return true if   |
    //|    they are thesame else false it takes an arrays as the first and        |
    //|    second argument  |                                                     |
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