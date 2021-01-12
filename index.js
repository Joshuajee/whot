require("./configs/dbConnections")

const express = require('express')

const app = express()

const agents = require("./models/agents")





app.get('/agents', (req, res) =>{

    agents.find((err, data)=>{
        if(err){
            res.json({"err":err})
            console.log("Failed to retrieve data " + err)
        }else{
            res.send(data)
        }
    })

})

app.get('/add_agents', (req, res) =>{

    let age = new agents()
    age.agentName = "Jee"
    age.save()

    res.send("Jee")

})

app.post('/add_agents', (req, res) =>{

    let age = new agents()
    age.agentName = "Jee"
    age.save()

})



const PORT = process.env.PORT || 10000

app.listen(PORT)