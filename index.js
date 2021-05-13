/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2021 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */


require("./configs/dbConnections")

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const agents = require("./models/agents")

const {GamePlaying, shuffle}  = require("./game_env/gameStart")
const { error } = require("console")



var gameStart = new GamePlaying()


//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//this route plays the game
app.post('/api/play', (req, res) =>{

    gameStart.humanPlay(req.body, res)

})



//this route starts the game
app.post('/api/game', (req, res) =>{

    gameStart = new GamePlaying(req.body.user, req.body.agentName, req.body.rules, false, false)

    console.log(req.body.rules)

    let response = gameStart.startGame(req.body.rules)

    console.log(response)

    gameStart.on("move-made", (moves, res) => {
 
        res.send(moves)

    })

    res.send(response)

})


//this route fetch the agents from leaderboard
app.get('/api/leaderboard/:skip', (req, res) =>{

    let skip = parseInt(req.params.skip)

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



app.post('/api/create-agent', (req, res) =>{

    console.log(req.body)

    let agentData = req.body.agent 

    agents.findOne({agentName:agentData.agentName}, (err, data) => {

        if(data===null){

            let agent = new agents()
            agent.agentName = agentData.agentName
            agent.useCardAtHand = agentData.cardAtHand
            agent.useNoOfCardAtHand = agentData.noOfCardAtHand
            agent.useCardInPlay = agentData.cardInPlay
            agent.useCardPlayed = agentData.cardPlayed
            agent.useNoOfCardPlayed = agentData.noOfCardPlayed
            agent.useNoOfCardsInMarket = agentData.noOfCardsInMarket
            agent.useNoOfCardsWithOpponent =  agentData.noOfCardsWithOpponent
            agent.useAvailableMove = agentData.availableMove
            agent.useRules = agentData.rules

            agent.save()

            res.json({"msg": "Agent Saved", "success":true})

        }else{
            res.json({"msg": "Error Agent Name already exist choose another", success:false})
        }

    })

    

    console.log(agentData)
    

})


app.get('/jee', (req, res) =>{
    /*
    agents.update({agentName:"jee"}, 
        {
            losses: 1,
            points: 1,
            botLosses: 1,
            botPoints: 1,
        }).then(err => {
            console.log(err)
        })
*/
    
    agents.findOne({agentName:"Siri"})
        .then((data, err) => {
            
            if(!err){

                agents.updateOne({agentName:"Siri"},
                    {
                        losses: data.losses + 1, 
                        points: data.points + 1, 
                        botLosses: data.botLosses + 1, 
                        botPoints: data.botPoints + 1
                    }, 
                    {useFindAndModify:false}).then((data, err) => {
                        console.log(data)
                })

            }

        })

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