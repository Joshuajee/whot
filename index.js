require("./configs/dbConnections")

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const agents = require("./models/agents")
const {GameStart, shuffle}  = require("./game_env/gameStart")


//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/play', (req, res) =>{

    console.log(req.body)
    /*
    agents.find({agentName: agentName}, (err, data)=>{
   
        if(err){
            res.json({"err":err})
            console.log("Failed to retrieve data " + err)
        }else{
            
            res.send(data[0])
        }
    })*/

})



//this route starts the game
app.post('/api/game', (req, res) =>{

    console.log(req.body)

    new GameStart(req.body.agentName, req.body.user, req.body.rules, false, false)

    res.send(req.body)


})

//this route fetch the agents from leaderboard
app.get('/api/leaderboard/:skip', (req, res) =>{

    let skip = parseInt(req.params.skip)

    console.log(skip)
    agents.find().select("agentName wins losses points createdBy createdOn").sort("-points").limit(20).skip(skip)
    .exec((error, response)=>{
        console.log(response)
        res.send(response)
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