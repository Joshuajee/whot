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


    

    stateFinder(playerName, actionCards, inPlayCards, noOfCardsInMarket){

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
/*
        console.log(this.player)
        console.log(actionCards)
        console.log(inPlayCards)
        console.log(noOfCardsInMarket)
        console.log(this.player.states)
*/
        switch(this.player.states.length){
            case 0:
                this.stateCreater(this.player, actionCards, inPlayCards, noOfCardsInMarket)
                break
            default:
                console.log("searching")
        }


    }

    stateCreater(player, actionCards, inPlayCards, noOfCardsInMarket){
        console.log("state created")
    }

}

module.exports = GameEngine