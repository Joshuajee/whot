const GameStart = require("./gameStart")
const agents = require("../models/agents")


agents.find((err, data)=>{
    if(err){
        console.log("Failed to retrieve data " + err)

    }else{

        new GameStart(data[0], data[1])

    }
})


