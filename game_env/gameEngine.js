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

        console.log(this.agentOneName)
        
    
    }





    

    stateFinder(playerAgent, cardPlayed, cardAtHand,  noOfCardsWithOpponent, availableMove, inPlayCards, noOfCardsInMarket, rules){


        //+---------------------------------------------------------------------------+
        //|  This method finds all the relevant states an angent has                  |
        //+---------------------------------------------------------------------------+

        

        this.player = playerAgent

        //console.log(this.player.agentName)

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

            //if(this.agentOneName == player.agentName) this.playerOneState.push(currState)
            //if(this.agentTwoName == player.agentName) this.playerTwoState.push(currState)
        })

 

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
                let condition = states[i].cardAtHand.sort() === cardAtHand.sort()           &&
                                states[i].cardInPlay === inPlayCards                        &&
                                states[i].cardPlayed === cardPlayed                         &&
                                states[i].noOfCardsInMarket === noOfCardsInMarket           &&
                                states[i].availableMove.sort()  === availableMove.sort()    &&
                                states.rules === rules

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

}

module.exports = GameEngine