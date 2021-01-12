const {GameStart, shuffle}  = require("./gameStart")
const agents = require("../models/agents")


agents.find((err, data)=>{
    if(err){
        console.log("Failed to retrieve data " + err)

    }else{

        let agentOrder = shuffle(data) 

        for(let i = 0; i < agentOrder.length / 2; i++){
            new GameStart(agentOrder[i], agentOrder[agentOrder.length / 2 + i])
        }

    }
})


