require("./configs/dbConnections")

const express = require('express')

const app = express()

const agents = require("./models/agents")


app.get('/play/:agent', (req, res) =>{

    let agentName = req.params.agent

    agents.find({agentName: agentName}, (err, data)=>{
   
        if(err){
            res.json({"err":err})
            console.log("Failed to retrieve data " + err)
        }else{
            
            res.send(data[0])
        }
    })

})


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


//check if we are in a production environment
if(process.env.NODE_ENV === "production"){
    
    //serve static production asset
    app.use(express.static("game_ui/build"))

    //get the current file path
    const path = require('path')

    //handle any route that is missing from the Server
    app.get('*', (req, res) =>{  
        res.sendFile(path.resolve(__dirname, "game_ui", "build", "index.html"))
        console.log(path.resolve(__dirname, "game_ui", "build", "index.html"))
    })

}


const PORT = process.env.PORT || 10000

app.listen(PORT)