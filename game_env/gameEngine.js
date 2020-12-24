require("../configs/dbConnections")

const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants")
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


    

    stateFinder(playerName, cardPlayed, cardAtHand, actions, inPlayCards, noOfCardsInMarket, rules){

        //console.log(playerName)
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
                this.stateCreater(this.player, cardPlayed, cardAtHand, actions, inPlayCards, noOfCardsInMarket, rules)
                break
            default:
                console.log("searching")
                this.stateSearch(this.player, cardPlayed, cardAtHand, actions, inPlayCards, noOfCardsInMarket, rules)
        }


    }

    stateCreater(player, cardPlayed, cardAtHand, actions, inPlayCards, noOfCardsInMarket, rules){
        console.log("state created")
        player.states.push({"cardAtHand":cardAtHand, 
                            "cardInPlay":inPlayCards,
                            "cardPlayed": cardPlayed, 
                            "noOfCardsInMarket":noOfCardsInMarket,
                            "actions":actions,
                            "rules":rules
                        })
        player.save(function (err) {
            if (err) return handleError(err);
            console.log('the subdocs were removed');
          })

        console.log("modifief")
        console.log(player)
    }


    stateSearch(player, cardPlayed, cardAtHand, actions, inPlayCards, noOfCardsInMarket, rules){
        console.log("state search")

                        let states = player.states
                        for(let i = 0; i < states.length; i++){
                            let condition = states[i].cardAtHand.sort() === cardAtHand.sort()    &&
                                            states[i].cardInPlay === inPlayCards                 &&
                                            states[i].cardPlayed.sort() === cardPlayed.sort()    &&
                                            states[i].noOfCardsInMarket === noOfCardsInMarket    &&
                                            states[i].actions  === actions                       &&
                                            states.rules === rules

                            if(condition){
                                return states[i]
                            }
                        }

        return this.stateCreater(this.player, cardPlayed, cardAtHand, actions, inPlayCards, noOfCardsInMarket, rules)
              
    }

}

module.exports = GameEngine