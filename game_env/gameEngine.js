require("../configs/dbConnections")

const agents = require("../models/agents")

class GameEngine{

    constructor(playerOneName, playerTwoName){

        

        agents.findOne({agentName:playerOneName}, (err, data)=>{
            if(err){
                console.log("Failed to retrieve data " + err)
            }else{
                console.log(data)
                this.agentOne = data
            }
        })


        agents.findOne({agentName:playerTwoName}, (err, data)=>{
            if(err){
                console.log("Failed to retrieve data " + err)
            }else{
                console.log(data)
                this.agentTwo = data
                console.log(this.agentTwo.agentName)
            }
        })
        
    }

    

    stateFinder(playerName, actionCards, inPlayCards, noOfCardsInMarket){
        console.log("fff" + this.agentOne)
    
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

        console.log(this.player)

        

    }

    stateCreater(playerName, actionCards, inPlayCards, noOfCardsInMarket){

    }

}

module.exports = GameEngine