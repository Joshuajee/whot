require("../configs/dbConnections")

const { EventEmitter } = require("events")
const agents = require("../models/agents")

class GameEngine extends EventEmitter{

    constructor(playerOne, playerTwo){

        super()

        this.playerOneState = []
        this.playerTwoState = []

        this.agentOneName = playerOne.agentName
        this.agentTwoName = playerTwo.agentName        
    
    }


    
    addReward(agent, point, states){

        agents.findOne({agentName:agent.agentName},(err, data)=>{

            if(err){

                console.log("Failed to retrieve data " + err)

            }else{

                let count = 0

                console.log(agent.agentName + " found ")

                console.log("move " + states.length)

                for(let x = 0; x < states.length; x++){

                    for(let y = 0; y < data.states.length; y++){

                        let dbStates = data.states[y]

                        let condition = this.compareArray(dbStates.cardAtHand, states[x].cardAtHand)           && 
                                        //this.compareArray(dbStates.cardPlayed, states[x].cardPlayed)           && 
                                        this.compareArray(dbStates.availableMove, states[x].availableMove)     &&
                                        dbStates.cardInPlay == states[x].cardInPlay                            &&
                                        dbStates.noOfCardsInMarket == states[x].noOfCardsInMarket              &&
                                        dbStates.noOfCardsWithOpponent == states[x].noOfCardsWithOpponent         

                        if(condition){

                            console.log(agent.agentName + " found ")
                            //console.log(this.compareArray(dbStates.cardAtHand, states[x].cardAtHand))
                            console.log(dbStates.cardAtHand)
                            console.log(dbStates.cardAtHand.length)
                            console.log(states[x].cardAtHand)
                            console.log(states[x].cardAtHand.length)
                            count++
                            break;

                        }

                    }
                
                }

                console.log(count)

            }

        })
        

    }


    rewards(playerOneAgent, playerTwoAgent, playerOneCardAtHand, playerTwoCardAtHand, playerOneActions, playerTwoActions){

        //+---------------------------------------------------------------------------+
        //|  This method is called when the game ends it reward the agents according  |
        //|  to the reward policy                                                     |    
        //+---------------------------------------------------------------------------+
        
        let playerOneNumber = 0
        let playerTwoNumber = 0

        console.log("Reward")

        console.log(playerOneActions)

        console.log(playerTwoActions)

        console.log(playerOneCardAtHand.length)

        console.log(playerTwoCardAtHand.length)

        console.log(playerOneCardAtHand)

        console.log(playerTwoCardAtHand)

        console.log(this.playerOneState)

        console.log(this.playerTwoState)


        if(playerOneCardAtHand.length > 0){

            
            for(let i = 0; i < playerOneCardAtHand.length; i++)
            {

                let index_in = playerOneCardAtHand[i].indexOf(":") + 1
                let number_in = playerOneCardAtHand[i].slice(index_in, playerOneCardAtHand[i].length)
                let shape_in = playerOneCardAtHand[i].slice(0, index_in)

                if(shape_in == "star"){
                    playerOneNumber += number_in * 2
                }else{
                    playerOneNumber += number_in 
                }
                
            }
            
        }


        if(playerTwoCardAtHand.length > 0){

            for(let i = 0; i < playerTwoCardAtHand.length; i++)
            {

                let index_in = playerTwoCardAtHand[i].indexOf(":") + 1
                let number_in = playerTwoCardAtHand[i].slice(index_in, playerTwoCardAtHand[i].length)
                let shape_in = playerTwoCardAtHand[i].slice(0, index_in)

                if(shape_in == "star"){
                    playerTwoNumber += number_in * 2
                }else{
                    playerTwoNumber += number_in 
                }
                
            }
            
        }

        if(playerOneNumber > playerTwoNumber){
            //agent One Wins
            this.addReward(playerOneAgent, 5 - playerOneNumber / 10, this.playerOneState)
            this.addReward(playerTwoAgent, -1 * 2 - playerTwoNumber / 10, this.playerTwoState)
            console.log("agent one wins")
        }else if(playerOneNumber < playerTwoNumber){
            //agent Two Wins
            this.addReward(playerOneAgent, -1 * 2 - playerOneNumber / 10, this.playerOneState)
            this.addReward(playerTwoAgent, 5 - playerTwoNumber / 10, this.playerTwoState)
            console.log("agent two wins")
        }else{
            //agent draws
            this.addReward(playerOneAgent, -1 * 2 - playerOneNumber / 10, this.playerOneState)
            this.addReward(playerTwoAgent, -1 * 2 - playerTwoNumber / 10, this.playerTwoState)
            console.log("agent two wins")
        }
       
    }
    

    stateFinder(playerAgent, cardPlayed, cardAtHand,  noOfCardsWithOpponent, availableMove, inPlayCards, noOfCardsInMarket, rules){


        //+---------------------------------------------------------------------------+
        //|  This method finds all the relevant states an angent has                  |
        //+---------------------------------------------------------------------------+


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


        let actions = this.actionCreater(availableMove, player)

        let currState = {"cardAtHand":cardAtHand, 
                        "noOfCardsWithOpponent": noOfCardsWithOpponent,
                        "cardInPlay":inPlayCards,
                        "cardPlayed": cardPlayed, 
                        "noOfCardsInMarket":noOfCardsInMarket,
                        "availableMove":availableMove,
                        "actions":actions,
                        "rules":rules
                    }

        player.states.push(currState)
        
        player.save(function (err) {
            if (err) return 0
        })

 
        if(this.agentOneName == player.agentName) this.playerOneState.push(currState)
        if(this.agentTwoName == player.agentName) this.playerTwoState.push(currState)
 
        return actions
    }


    stateSearch(player, cardPlayed, cardAtHand,  noOfCardsWithOpponent, availableMove, inPlayCards, noOfCardsInMarket, rules){
        

        //+---------------------------------------------------------------------------+
        //|  This method search for existing states within an angent and returns      |
        //|  it's action value if no state is found it returns the stateCreater       |
        //|  method                                                                   |
        //+---------------------------------------------------------------------------+

            let states = player.states
            for(let i = 0; i < states.length; i++){


                let condition = this.compareArray(states[i].cardAtHand, cardAtHand)           && 
                                this.compareArray(states[i].cardPlayed, cardPlayed)           && 
                                this.compareArray(states[i].availableMove, availableMove)     &&
                                states[i].cardInPlay === inPlayCards                          &&
                                states[i].noOfCardsInMarket === noOfCardsInMarket             &&
                                states[i].noOfCardsWithOpponent === noOfCardsWithOpponent           



                if(condition) return states[i].actions
            }

        return this.stateCreater(this.player, cardPlayed, cardAtHand,  noOfCardsWithOpponent, availableMove, inPlayCards, noOfCardsInMarket, rules)
              
    }


    actionCreater(availableMove, playerStates){

        //+---------------------------------------------------------------------------+
        //|  This method initialise actions for newly created states                  |
        //+---------------------------------------------------------------------------+

        let output = []

        for(let i = 0; i < availableMove.length; i++){
            output.push(0)
        }

        for(let i = 0; i < playerStates.length; i++){
            if(availableMove.sort() === playerStates[i].availableMove.sort()){
                output = this.sumArray(output, playerStates[i].actions)
            }
        }

 

        return output
    }

    sumArray(array1, array2){

        let result = []

        for(let i = 0; i < array1.length; i++){
            result.push(array1[i] + array2[i])
        }

        return result
    }

    compareArray(array1, array2){

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



}

module.exports = GameEngine