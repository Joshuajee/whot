/*
 * Copyright (C) 2021 Joshua Evuetapha
 * Twitter : @evuetaphajoshua
 * Github : @Joshuajee
 * Instagram: @Joshua.jee
 * This program is distributed under the MIT license
 */


require("../configs/dbConnections")


class GameEngine{

    constructor(playerOne, playerTwo){

        this.agentOneName = playerOne.agentName
        this.agentTwoName = playerTwo.agentName      
        
        this.playerOneStateRound = []
        this.playerTwoStateRound = []
        
        this.round = 1
    
    }

    get roundVal(){
        return this.round
    }

    
    addReward(agent, point, states, action, endGame=false, win=false){

        //+-----------------------------------------------------------------+
        //|  This method is used to add rewards to the agent in question    |                                                   |    
        //+-----------------------------------------------------------------+

    
        for(let i = 0; i < states.length; i++){

            states[i].actions[action[i][1]] = states[i].actions[action[i][1]] + point

            agent.states.push(states[i])

        }

        
        //save the agents to database when the game ends
        if(endGame){ 
            
            agent.points = agent.points + point

            if(win) agent.wins = agent.wins + 1
            else agent.losses = agent.losses + 1

            agent.save((err) => {

            })

        }

    }


    rewards(playerOneAgent, playerTwoAgent, playerOneCardAtHand, playerTwoCardAtHand, playerOneActions, playerTwoActions){

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
                this.addReward(playerOneAgent, 5 - 1 * playerOneNumber / 100, this.playerOneStateRound, playerOneActions)
                this.addReward(playerTwoAgent, -1 * playerTwoNumber / 100, this.playerTwoStateRound, playerTwoActions)
            }else if(this.playerOneNumber > this.playerTwoNumber){
                // rewards when player two has fewer card number than player one
                this.addReward(playerOneAgent, -1 * playerOneNumber / 100, this.playerOneStateRound, playerOneActions)
                this.addReward(playerTwoAgent, 5 - 1 * playerTwoNumber / 100, this.playerTwoStateRound, playerTwoActions)
            }else{
                //rewards when player two has same card number as player one
                this.addReward(playerOneAgent, -1 * playerOneNumber / 100, this.playerOneStateRound, playerOneActions)
                this.addReward(playerTwoAgent, -1 * playerTwoNumber / 100, this.playerTwoStateRound, playerTwoActions)
            }

         }

        if(playerOneNumber == 0){
            console.log("Player One")
            //reward player one
            this.addReward(playerOneAgent, 5,  this.playerOneStateRound, playerOneActions, true, true)
            //penalise player two
            this.addReward(playerTwoAgent, -2 - 1 * playerTwoNumber / 10, this.playerTwoStateRound, playerTwoActions, true, false)
        }else if(playerTwoNumber == 0){
            console.log("Player Two")
            //penalise player one
            this.addReward(playerOneAgent, -2 - 1 * playerTwoNumber / 10,  this.playerOneStateRound, playerOneActions, true, true)
            //reward player two
            this.addReward(playerTwoAgent, 5, this.playerTwoStateRound, playerTwoActions, true, false)
        }

        //empty the StateRound array after one round
        this.playerOneStateRound = []
        this.playerTwoStateRound = []
       
    }
    

    stateFinder(playerAgent, cardPlayed, cardAtHand,  noOfCardsWithOpponent, availableMove, inPlayCards, noOfCardsInMarket, rules){

        //+---------------------------------------------------------------------------+
        //|  This method finds all the relevant states an angent has                  |
        //+---------------------------------------------------------------------------+

        this.cardAtHand = cardAtHand

        this.player = playerAgent

        switch(this.player.states.length){
            case 0:
                return this.stateCreater(this.player, cardPlayed, cardAtHand,  noOfCardsWithOpponent, availableMove, inPlayCards, noOfCardsInMarket, rules)
            default:
                return this.stateSearch(this.player, cardPlayed, cardAtHand,  noOfCardsWithOpponent, availableMove, inPlayCards, noOfCardsInMarket, rules)
        }


    }


    stateCreater(player, cardPlayed, cardAtHand,  noOfCardsWithOpponent, availableMove, inPlayCards, noOfCardsInMarket, rules){
        
        //+---------------------------------------------------------------------------+
        //|  This method creates a state and save it to an angent in the database     |
        //|  it also save it to the correspondingn state array                        |
        //+---------------------------------------------------------------------------+

        let actions = this.actionCreater(availableMove, player.states)

        let currState = {"cardAtHand":cardAtHand, 
                        "noOfCardsWithOpponent": noOfCardsWithOpponent,
                        "cardInPlay":inPlayCards,
                        "cardPlayed": cardPlayed, 
                        "noOfCardsInMarket":noOfCardsInMarket,
                        "availableMove":availableMove,
                        "actions":actions,
                        "rules":rules
                    }
                    

        //add this state to the right player
        if(this.agentOneName == player.agentName) this.playerOneStateRound.push(currState)
        if(this.agentTwoName == player.agentName) this.playerTwoStateRound.push(currState)

        //return the state action
        return actions
    }


    stateSearch(player, cardPlayed, cardAtHand,  noOfCardsWithOpponent, availableMove, inPlayCards, noOfCardsInMarket, rules){
        
        //+---------------------------------------------------------------------------+
        //|  This method search for existing states within an angent and returns      |
        //|  it's action value if no state is found it returns the stateCreater       |
        //|  method                                                                   |
        //+---------------------------------------------------------------------------+

            let states = player.states

            let currentState = {
                                "cardAtHand":cardAtHand, 
                                "cardPlayed":cardPlayed,
                                "availableMove":availableMove,
                                "cardInPlay":inPlayCards,
                                "noOfCardsInMarket":noOfCardsInMarket,
                                "noOfCardsWithOpponent":noOfCardsWithOpponent                            
                            }
            
            let state = this.findState(states, currentState)
    
            if(state){ 

                //add to state
                if(this.agentOneName == player.agentName) this.playerOneStateRound.push(state)
                if(this.agentTwoName == player.agentName) this.playerTwoStateRound.push(state)

                //return the action of the selected state
                return state.actions
            }


        //create a new state if a state doesn't exist and return it's actions
        return this.stateCreater(this.player, cardPlayed, cardAtHand, noOfCardsWithOpponent, availableMove, inPlayCards, noOfCardsInMarket, rules)
              
    }


    actionCreater(availableMove, playerStates){

        //+---------------------------------------------------------------------------+
        //|  This method initialise actions for newly created states                  |
        //+---------------------------------------------------------------------------+

        let states = this.filterState(playerStates, availableMove)

        let output = []

        //set inital values of zeros for output
        for(let i = 0; i < availableMove.length; i++){
            output.push(0)
        }

        //check if any state was fount if no state was found it returns actions of zeros
        if(!states.length) return output

        for(let i = 0; i < states.length; i++){

            //get an aggregated sum of similar actions
            output = this.sumArray(output, states[i].actions)

        }
 
        //return arithmentic mean of all the state action
        return this.multiplyArray(output, (1/states.length))
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