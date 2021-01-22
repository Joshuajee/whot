/*
 * Copyright (C) 2021 Joshua Evuetapha
 * Twitter : @evuetaphajoshua
 * Github : @Joshuajee
 * This program is distributed under the MIT license
 */

const {GameTraining, shuffle}  = require("./gameStart")
const agents = require("../models/agents")

let rules = {"holdOn":{"active":true, "card":1, "defend":false},
                     "pickTwo":{"active":true, "card":2, "defend":false},
                     "pickThree":{"active":true, "card":5, "defend":false}, 
                     "suspension":{"active":true, "card":8, "defend":false},
                     "generalMarket":{"active":true, "card":14, "defend":false}
                    } 
                    

agents.find().select("agentName").exec((err, data)=>{

    if(err){
        console.log("Failed to retrieve data " + err)

    }else{

        let agentOrder = shuffle(data) 
        let isPlayerOneHuman = false
        let isPlayerTwoHuman = false

        new GameTraining(agentOrder[0].agentName, agentOrder[1].agentName, rules, isPlayerOneHuman, isPlayerTwoHuman).startGame()

    }

})