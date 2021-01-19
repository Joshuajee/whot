const {GameStart, shuffle}  = require("./gameStart")
const agents = require("../models/agents")

let rules = {"holdOn":{"active":true, "card":1, "defend":false},
                     "pickTwo":{"active":true, "card":2, "defend":false},
                     "pickThree":{"active":true, "card":5, "defend":false}, 
                     "suspension":{"active":true, "card":8, "defend":false},
                     "generalMarket":{"active":true, "card":14, "defend":false}
                    } 
                    

agents.find((err, data)=>{
    if(err){
        console.log("Failed to retrieve data " + err)

    }else{

        let agentOrder = shuffle(data) 


            new GameStart(agentOrder[4], agentOrder[5], rules, true)

    }
})


