/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2021 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */

const guest = require("../cards/user.json")

const Agents = require("../models/agents")
const states = require("../models/states")


 
const GameEngine = require("./gameEngine")

const cards = require("../cards").cards

const inGameCards = [...cards]

class GamePlay extends GameEngine{
    
    constructor(playerOneName, playerTwoName, rules, agents, currentPlayerIndex, currentOpponentIndex, gameEvents){

        super(playerOneName, playerTwoName, rules, agents, currentPlayerIndex, currentOpponentIndex, gameEvents)

        this.playerOneName = playerOneName
        this.playerTwoName = playerTwoName
        this.rules = rules

        this.agentOne = agents[0]
        this.agentTwo = agents[1]

        super.on("need", ()=>{

            const action = super.getAction

            this.neededAction =  action[1]

            this.neededCard = this.chooseAction(action, this.needOption)

            console.log("needed card " + this.neededCard[0])

            this.moves.push(this.neededCard)

            if(!this.start) this.res.send(this.moves)

            this.close()

        })

        super.on("received", async() => {

            console.log(super.getAction)

            await this.referee(super.getAction, this.gameRules, this.availableMove, this.playerTwoCard.sort(), this.playerTwoName, false, false)
        
        })  

    }

    /**
     * getter get the move made
     */
    get move(){
        return this.moves
    }

    /**
    * This method starts the game and set all the class variables
    */
    async startGame(rules, res, start){

        console.log("START GAME")

        this.firstGameState = {}

        this.moves = []

        this.start = true

        this.res = res

        //class variables to hold game variables
        this.playerOneCard = []
        this.playerTwoCard = []
        this.inPlay = []
        this.availableMove = []
        this.need = false

        //class variables to hold players actions
        this.actionOneNew = []
        this.actionOneOld = []
        this.actionTwoNew = []
        this.actionTwoOld = []

        this.market = [...shuffle(inGameCards)]

        this.goMarket(this.playerOneCard, start)

        this.goMarket(this.playerTwoCard, start)

        this.goMarket(this.inPlay)

        if(this.inPlay[0] === "whot:20"){

            let whot = ["circle:20", "cross:20", "square:20", "star:20", "triangle:20"]

            this.inPlay[0] = whot[Math.floor(Math.random() * whot.length)]
        }

        this.moves.push([this.inPlay[0], -2])

        this.state = {gameState: {"playerOne":{
                            "cardAtHand":this.playerOneCard,
                            "name":this.playerOneName
                            },
                        "playerTwo":{
                            "cardAtHand":this.playerTwoCard,
                            "name":this.playerTwoName
                            },
                        "market":this.market,
                        "cardPlayed":this.inPlay,
                        rules: rules
                        }}


        console.log("player 1 " + this.playerOneCard)

        console.log("player 2 " + this.playerTwoCard)
        
        console.log("in play " + this.inPlay)

        await this.referee(this.inPlay, rules, "avialableMove", this.playerTwoCard, this.playerTwoName, true, true)
    

    }
    
    /**
     * 
     * @param {*} state game state gotten from client
     * @param {*} res response object to be sent to client
     * @returns state gotten from client
     */
    async humanPlay(state, res){

        this.start = false

        this.state = state

        this.moves = []

        this.res = res
        
        await this.play(state, this.agentOne.agentName)

        return state
    }

    async separateStates(state, index, max, agentName, newOrOldArray = []){

        let currentState = state[index]
        let newOrOld = newOrOldArray

        const playerStates = states(agentName)

        try{

            await playerStates.find({currentState}).then( async (data, err) => {

                if(err === undefined){

                    if(data.length > 0){
                        newOrOld.push(data[0])
                    }else{
                        newOrOld.push(null)
                    }

                }else{
                    await this.separateStates(state, index, max, agentName, newOrOld)
                }

                if(index + 1 < max){
                    await this.separateStates(state, index + 1, max, agentName, newOrOld)
                }else{
                    console.log("DONE")
                }

            })

            return newOrOld

        }catch{
            console.log("eRrorrrrrrrr")
        }
    }

    async save(requestBody, res){

        let playerOneCardAtHand = requestBody.gameState.playerOne.cardAtHand
        let playerTwoCardAtHand = requestBody.gameState.playerTwo.cardAtHand

        let playerOneStates = requestBody.playerOneStatesAndActions[0]
        let playerOneActions = requestBody.playerOneStatesAndActions[1]

        let playerTwoStates = requestBody.playerTwoStatesAndActions[0]
        let playerTwoActions = requestBody.playerTwoStatesAndActions[1]

        console.log(playerOneStates)
        console.log(playerOneActions)

        res.status(200).json({status: 'received'})

        try{

            const playerOneSeparated = await this.separateStates(playerOneStates, 0, playerOneStates.length, this.playerOneName)
            const playerTwoSeparated = await this.separateStates(playerTwoStates, 0, playerTwoStates.length, this.playerTwoName)

            let playerOneNewOldSA = this.separateToNewOldSA(playerOneSeparated, playerOneStates, playerOneActions)

            let playerTwoNewOldSA = this.separateToNewOldSA(playerTwoSeparated, playerTwoStates, playerTwoActions)

            this.addActionsToNewState(playerOneNewOldSA[0], playerTwoNewOldSA[0])
            console.log("ONE")
            console.log(playerOneNewOldSA[0])

            console.log("NEW")
            console.log(playerTwoNewOldSA[0])


            let human = {}

            human.playerOneStateNew = playerOneNewOldSA[0]
            human.playerOneStateOld = playerOneNewOldSA[2]
            human.playerTwoStateNew = playerTwoNewOldSA[0]
            human.playerTwoStateOld = playerTwoNewOldSA[2]

            console.log(playerOneNewOldSA[2])
    
            
            super.rewards(
                this.agentOne.agentName, 
                this.agentTwo.agentName, 
                playerOneCardAtHand,        
                playerTwoCardAtHand, 
                playerOneNewOldSA[1], 
                playerOneNewOldSA[3], 
                playerTwoNewOldSA[1], 
                playerTwoNewOldSA[3], 
                human) 

        } catch(err) {

            console.log(err)

        }
        

        

    }

    separateToNewOldSA(filteredPlayerState, playerStates, playerActions){

        let newStates = []
        let oldStates = []
        let newActions = []
        let oldActions = []

        for (let i = 0; i < filteredPlayerState.length; i++){

            if(filteredPlayerState[i] === null){

                newStates.push(playerStates[i])
                newActions.push(playerActions[i])

            }else{

                oldStates.push(filteredPlayerState[i])
                oldActions.push(playerActions[i])

            }

        }

        return [newStates, newActions, oldStates, oldActions]
    }

    addActionsToNewState (playerOneStates, playerTwoStates){

        for(let i = 0; i < playerOneStates.length; i++){

            let output = []
            
            //set inital values of zeros for output
            for(let x = 0; x < playerOneStates[i].availableMove.length; x++){

                output.push(0)

            }

            playerOneStates[i].actions = output

        }
 


        for(let i = 0; i < playerTwoStates.length; i++){

            let output = []
            
            //set inital values of zeros for output
            for(let x = 0; x < playerTwoStates[i].availableMove.length; x++){

                output.push(0)

            }

            playerTwoStates[i].actions = output

        }


    }




    /**
     * This method controls the game with the game rules, actions, availableMove,
     * playerName and opponentCard at hand. It evualuate rules with player actions
     * @param {*} action array of agent actions
     * @param {*} rules game rules
     * @param {*} avialableMove moves available to the playing agent
     * @param {*} playerCardAtHand arrays of cards wih agent
     * @param {*} playerName current agent name
     * @param {*} opponentsCardAtHand arrays of cards with opponent
     */
    async referee(action, rules, avialableMove, playerTwoCard, playerName, startGame = false, firstMove = false){
    
        console.log(playerName) 
        console.log(playerTwoCard)

        let card = []

        let index = -1
        let number = -1

        if(!startGame){

            card = this.chooseAction(action, avialableMove)

            index = card[0].indexOf(":") + 1
            number = card[0].slice(index, card[0].length)

            this.playGame(playerTwoCard, card)

            this.moves.push(card)

            this.state.playerMove = card[0]

        }else{

            card = action
            console.log(card)
            console.log(action)
            console.log(startGame)
            index = card[0].indexOf(":") + 1
            number = card[0].slice(index, card[0].length)

        }

        if(firstMove) this.firstGameState = JSON.parse(JSON.stringify(this.state.gameState))

        if(rules.holdOn.active && number == rules.holdOn.card){

            console.log("hold On")

            await this.play(this.state)
          
        } else if(rules.pickTwo.active && number == rules.pickTwo.card){

            console.log("pick 2")

            this.goMarket(this.playerOneCard, 2) 

            await this.play(this.state)

        } else if(rules.pickThree.active && number == rules.pickThree.card){

            console.log("pick 3")

            this.goMarket(this.playerOneCard, 3) 

            await this.play(this.state)

        }else if(rules.suspension.active && number == rules.suspension.card){

            console.log("suspension")

            await this.play(this.state)

        }else if(rules.generalMarket.active && number == rules.generalMarket.card){

            console.log("general market")

            this.goMarket(this.playerOneCard, 1) 

            await this.play(this.state)

        }else{

            if(!this.start){
                //send the move made to the client
                this.res.send(this.moves)
            }else{

                const agent = await Agents.findOne({agentName: this.playerTwoName})//.then((data, err)=>{

                this.res.send(
                    {
                        gameState: this.firstGameState, 
                        moves: this.moves, 
                        agentInfo: agent,
                        playerInfo: guest
                    })
                
            }

        }

    }

    close(){

        console.log("round : " + super.roundVal)
        console.log("---------------------------------")
        
    }

    /**
     * This method deals with available moves when Whot:20 card is involved
     * @param {*} agent current agent property object
     * @param {*} playerCard current player cards at hand
     * @returns array of available moves for whot
     */

    whotAvailableMoves(agent, playerCard){

        let availableMove = []

        if(!agent.canNeedAnyCard && playerCard.length > 1) {
    
            for(let i = 0; i < playerCard.length; i++){

                let index = playerCard[i].indexOf(":") + 1
                let shape = playerCard[i].slice(0, index)

                if(playerCard[i] !== "whot:20") {

                    for(let i = 0; i < availableMove.length; i++) {

                        if(availableMove[i] === shape + "20") break

                        if(i + 1 === availableMove.length) availableMove.push(shape + "20")

                    }

                    if(availableMove.length === 0){
                        availableMove.push(shape + "20")
                    }

                }

            }

        } else {
            
            availableMove.push("circle:20", "cross:20", "square:20", "star:20", "triangle:20")

        }

        return availableMove.sort()
    }

    /**
     * This method search for valid moves           
     * @param {*} playerCard cards of the player that is to make a move
     * @param {*} inPlayCard last card played
     * @returns an array all valid moves that can be mades
     */    
    availableMoves(playerCard, inPlayCard, playerName){

        let index_in = inPlayCard.indexOf(":") + 1
        let number_in = parseInt(inPlayCard.slice(index_in, inPlayCard.length))
        let shape_in = inPlayCard.slice(0, index_in)
    
        let availableMove = ["z:goMarket"]

        if(playerName === this.agentOne.agentName){

            if(!this.agentOne.canGoMarket) availableMove = []

        }else{

            if(!this.agentTwo.canGoMarket) availableMove = []
       
        } 
    
        for(let i = 0; i < playerCard.length; i++){
             
            let index = playerCard[i].indexOf(":") + 1
            let number = parseInt(playerCard[i].slice(index, playerCard[i].length))
            let shape = playerCard[i].slice(0, index)
    
            if(number === 20){
    
                availableMove.sort()
    
                    //determines the agent that is playing and if the agent can need any card
                    if(playerName === this.agentOne.agentName){

                        availableMove.push(...this.whotAvailableMoves(this.agentOne, playerCard))
    
                    }else{
    
                        availableMove.push(...this.whotAvailableMoves(this.agentOne, playerCard))
                
                    }

                
                return availableMove
    
            }if(number === number_in){
    
                availableMove.push(playerCard[i])
    
            }else if(shape === shape_in){
            
                availableMove.push(playerCard[i])
    
            }
    
        }
    
        return availableMove.sort()
    
    }

    /**
     * This Methods set different class variables and call the stateFinder
     * method from the GameEngine class
     * @param {*} state current game state gotten from the client
     */
    async play(state, playerName = this.agentTwo.agentName){

        console.log(" __________________ " + playerName)
        
        let gameState = state.gameState

        this.playerMove = state.playerMove
        this.market = gameState.market
        this.cardPlayed = gameState.cardPlayed

        //get player details
        this.playerOne = gameState.playerOne
        this.playerOneName = this.playerOne.name
        this.playerOneCard = this.playerOne.cardAtHand

        //get agents details
        this.playerTwo = gameState.playerTwo
        this.playerTwoName = this.playerTwo.name
        this.playerTwoCard = this.playerTwo.cardAtHand

        this.availableMove = this.availableMoves(this.playerTwoCard, this.cardPlayed[this.cardPlayed.length - 1], playerName)

        this.noOfCardsWithPlayerOne = gameState.playerOne.cardAtHand.length
        
        this.gameRules = gameState.rules

        if(this.availableMove.length === 0){
       
            this.goMarket(this.playerTwoCard, 1) 

            this.moves.push(["z:goMarket", -1])

            if(!this.start){
                //send the move made to the client
                this.res.send(this.moves)

            } else {

                const agent = await Agents.findOne({agentName: this.playerTwoName});

                this.res.send({gameState: this.firstGameState, moves: this.moves, agentInfo: agent});
   
            }
            
        } else {
            //search for states
            super.stateFinder(this.playerTwoName, this.cardPlayed, this.playerTwoCard, this.noOfCardsWithPlayerOne, this.availableMove, this.playerMove, this.market.length, this.gameRules)
        }
    
        console.log("available moves: " + this.availableMove)

    }

    /**
    * This method chooses the action taken by the agent
    * @param {*} action an array where the first element is a boolean
    * and the second element is an array of numbers
    * @param {*} availableMove an array of all the moves that is available
    * @returns an array which is the action picked by the agent
    */
    chooseAction(action, availableMove){

        let maxAction = Math.max(...action[1])

        console.log("ACTION", action[1])
        console.log(maxAction)

        let actionPicked = []
        let pickedAction = []

        let maxFound = false


        for(let i = 0; i < action[1].length; i++){

            if(maxAction === action[1][i]){
                actionPicked.push([availableMove[i], i])
                maxFound = true
            } 

            pickedAction.push([availableMove[i], i])

        }
  
        if(maxFound) return actionPicked[Math.floor(Math.random() * (actionPicked.length))]

        return pickedAction[Math.floor(Math.random() * (pickedAction.length))]

    }

    /**
     * This method handles move made by updating the appropriate variables, which are
     * this.market, player and this.inPlay depending on the move 
     * @param {*} player cards of the player that is to make a move
     * @param {*} move move made by the player
     */
    playGame(player, card){

        console.log("game played " + card[0])

        let index = card[0].indexOf(":") + 1
        let number = card[0].slice(index, card[0].length)

        if(number == 20){
        
            this.cardPlayed.push(card[0])
            
            for(let i = 0; i < player.length; i++){
             
                if(player[i] == "whot:20"){ 
                    player.splice(i, 1)
                    break
                }
            
            }

        }else if(card[0] === "z:goMarket"){

            this.goMarket(player)

        }else{

            this.cardPlayed.push(card[0])
            
            for(let i = 0; i < player.length; i++){

                if(player[i] == card[0]) player.splice(i, 1)

            }

        }

    }

    /**
     * This method adds card to player and remove that same card from market
     * for n number of times   
     * @param {*} player cards of the player that is going to the market
     * @param {*} times number of times the player goes to market has a default value of 1
     */
    goMarket(player, times = 1){

        console.log("card picked " + times)

        for(let i = 0; i < times; i ++){

            if(this.market.length > 0){

                player.push(this.market[this.market.length - 1])

                this.market.pop()

            }

        }

    }

    /**
     * This method checks if any of the player cards or market is less than one then 
     * it calls the reward method in GameEngine, if  any of the player cards is 
     * finished that player wins the game and the game is over but if market is 
     * finished, it adds all cards from card Played to market and shuffle them 
     * while calling the reward method in GameEngine, but the game continues  
     */
    checkGame(){

        if(this.playerOneCard.length < 1 || this.playerTwoCard.length < 1){

            super.rewards(this.agentOne, this.agentTwo, this.playerOneCard, this.playerTwoCard, this.actionOneNew, this.actionOneOld, this.actionTwoNew, this.actionTwoOld)

        }else if(this.market.length < 1){
   
            super.rewards(this.agentOne, this.agentTwo, this.playerOneCard, this.playerTwoCard, this.actionOneNew, this.actionOneOld, this.actionTwoNew, this.actionTwoOld)
            
            //
            let inPlay = copyArray(this.inPlay)

            //adds all the card played to market
            this.market = inPlay
            
            //reasign inplay giving it just its last value
            this.inPlay = [inPlay[inPlay.length - 1]]

            //removed the last card from market
            this.market.pop()

            //shuffles the cards
            this.market = shuffle(this.market)
        }

    }

}

/**
 * This function shuffles an array
 * @param {*} array array to be shuffled
 * @returns shuffled array
 */
function shuffle(array){

    let currIndex = array.length

    while (0 !== currIndex) {
        
        //pick an element not prevously selected
        let randIndex = Math.floor(Math.random() * currIndex)
        currIndex--

        //swap it with the current element
        let tempVal  = array[currIndex]
        array[currIndex] = array[randIndex]
        array[randIndex] = tempVal
    
    }

    return array
}

function copyArray(array){

    let result = []

    for(let i = 0; i < array.length; i++){
        result.push(array[i])
    }

    return result

}

module.exports = GamePlay