require("../configs/dbConnections")

const { EventEmitter } = require("events")
const agents = require("../models/agents")

class GameEngine extends EventEmitter{

    constructor(playerOneName, playerTwoName){

        super()

        
            agents.findOne({agentName:playerOneName}, (err, data)=>{
                if(err){
                    console.log("Failed to retrieve data " + err)

                }else{
                    //console.log(data)
                    this.agentOne = data
                    super.emit("agent_one")
                    
                }
            })
        

        super.on("agent_one", ()=>{

            agents.findOne({agentName:playerTwoName}, (err, data)=>{
                if(err){
                    console.log("Failed to retrieve data " + err)

                }else{
                    //console.log(data)
                    this.agentTwo = data
                    super.emit("start")

                }
            })

        })

    }





    

    stateFinder(playerName, cardPlayed, cardAtHand,  noOfCardsWithOpponent, availableMove, inPlayCards, noOfCardsInMarket, rules){


        //This method finds all the relevant states an angent has

        switch (playerName) {
            
            case this.agentOne.agentName:
                this.player = this.agentOne
                break;

            case this.agentTwo.agentName:
                this.player = this.agentTwo
                break;
            default:
                break;
        }

        switch(this.player.states.length){
            case 0:
                return this.stateCreater(this.player, cardPlayed, cardAtHand,  noOfCardsWithOpponent, availableMove, inPlayCards, noOfCardsInMarket, rules)
            default:
                return this.stateSearch(this.player, cardPlayed, cardAtHand,  noOfCardsWithOpponent, availableMove, inPlayCards, noOfCardsInMarket, rules)
        }


    }

    stateCreater(player, cardPlayed, cardAtHand,  noOfCardsWithOpponent, availableMove, inPlayCards, noOfCardsInMarket, rules){
        
        //This method finds creates a state and save it to an angent

        let actions = this.actionCreater(availableMove, player.states)

        //console.log(player)

        player.states.push({"cardAtHand":cardAtHand, 
                            "noOfCardsWithOpponent": noOfCardsWithOpponent,
                            "cardInPlay":inPlayCards,
                            "cardPlayed": cardPlayed, 
                            "noOfCardsInMarket":noOfCardsInMarket,
                            "availableMove":availableMove,
                            "actions":actions,
                            "rules":rules
                        })

            player.save(function (err) {
            //if (err) return handleError(err);
                //console.log('the subdocs were removed');
            })
        
        //console.log("modifief")
        //console.log(player)
        return actions
    }


    stateSearch(player, cardPlayed, cardAtHand,  noOfCardsWithOpponent, availableMove, inPlayCards, noOfCardsInMarket, rules){
        
        //This method search for existing states within an angent 

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