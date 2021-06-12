/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2021 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */


const { EventEmitter } = require("events")
const prompt = require("prompt-sync")()
const {GameTraining}  = require("./gameStart")
const agents = require("../models/agents")
const { exitCode } = require("process")

let rules = {"holdOn":{"active":true, "card":1, "defend":false},
                     "pickTwo":{"active":true, "card":2, "defend":false},
                     "pickThree":{"active":true, "card":5, "defend":false}, 
                     "suspension":{"active":true, "card":8, "defend":false},
                     "generalMarket":{"active":true, "card":14, "defend":false}
                    } 

const rounds = prompt('Numbers of Tournament    ');

                    

agents.find().exec((err, data)=>{

    if(err){
        console.log("Failed to retrieve data " + err)

    }else{

        const gameEmitter = new EventEmitter();

        let currentTournament = 0

        let currentPlayer = 0

        let currentOpponent = 1

        let totalPlayers = data.length - 1

        gameEmitter.on("new", ()=>{

            if(currentOpponent === totalPlayers && currentPlayer !== totalPlayers){
                currentPlayer++
                currentOpponent = 0
            }else if(currentPlayer === currentOpponent){
                currentOpponent++
            }


            console.log("New Game")
            console.log(currentPlayer)
            console.log(currentOpponent)

            if(currentOpponent <= totalPlayers)
                new GameTraining(data[currentPlayer].agentName, data[currentOpponent].agentName, rules, data, 0, 1, gameEmitter).startGame()
            else{

                if(currentTournament <= rounds){

                    currentPlayer = 0
                    currentOpponent = 1
                    totalPlayers = data.length - 1
                    
                    gameEmitter.emit("new")
                    currentTournament++
                }else{
                    exitCode()
                }
                
            } 

            currentOpponent++
        })

        gameEmitter.emit("new")

    }

})