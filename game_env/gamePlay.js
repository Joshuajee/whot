/*
 * Copyright (C) 2021 Joshua Evuetapha
 * Twitter : @evuetaphajoshua
 * Github : @Joshuajee
 * This program is distributed under the MIT license
 */

const GameEngine = require("./gameEngine")

const cards = require("../cards").cards

const inGameCards = [...cards]


class GamePlay extends GameEngine{
    
    constructor(playerOneName, playerTwoName, rules, isPlayerOneHuman, isPlayerTwoHuman){

        super(playerOneName, playerTwoName, rules, isPlayerOneHuman, isPlayerTwoHuman)

        this.playerOneName = playerOneName
        this.playerTwoName = playerTwoName
        this.rules = rules

        super.on("need", ()=>{

            const action = super.getAction

            this.neededAction =  action[1]

            this.neededCard = this.chooseAction(action, this.needOption)

            console.log("needed card " + this.neededCard[0])

            this.moves.push(this.neededCard)

            this.res.send(this.moves)

            this.close()

        })


        super.on("received", ()=>{
            let action = super.getAction
            console.log(action)
            console.log(this.availableMove)
            this.referee(action, this.gameRules, this.availableMove, this.playerTwoCard.sort(), this.playerTwoName, this.playerTwoCard)
        })  

    }

    get move(){
        return this.moves
    }

    startGame(rules){

        //class variables to hold game variables
        this.player1 = []
        this.player2 = []
        this.inPlay = []
        this.availableMove = []
        this.need = false

        //class variables to hold players actions
        this.actionOneNew = []
        this.actionOneOld = []
        this.actionTwoNew = []
        this.actionTwoOld = []

        this.market = [...shuffle(inGameCards)]

        this.goMarket(this.player1, 5)

        this.goMarket(this.player2, 5)

        this.goMarket(this.inPlay)

        console.log("player 1 " + this.player1)

        console.log("player 2 " + this.player2)
        
        console.log("in play " + this.inPlay)

        let state = {"playerOne":{
                        "cardAtHand":this.player1,
                        "name":this.playerOneName
                        },
                    "playerTwo":{
                        "cardAtHand":this.player2,
                        "name":this.playerTwoName
                        },
                    "market":this.market,
                    "cardPlayed":this.inPlay,
                    rules : rules
                    }

        return state
    }

    humanPlay(state, res){

        this.state = state

        this.moves = []

        this.res = res

        console.log(state)
        
        this.play(state)

        return state
    }



    referee(action, rules, avialableMove, playerTwoCard, playerName, opponentsCardAtHand){


        console.log(playerName) 
        console.log(playerTwoCard)
        
        let card = this.chooseAction(action, avialableMove)

        let index = card[0].indexOf(":") + 1
        let number = card[0].slice(index, card[0].length)

        this.playGame(playerTwoCard, card)

        this.moves.push(card)

        this.state.playerMove = card[0]

        if(rules.holdOn.active && number == rules.holdOn.card){

            console.log("hold On")

            this.play(this.state)
          
        }else if(rules.pickTwo.active && number == rules.pickTwo.card){

            console.log("pick 2")

            this.play(this.state)

            this.goMarket(this.playerOneCard, 2) 

        }else if(rules.pickThree.active && number == rules.pickThree.card){

            console.log("pick 3")

            this.play(this.state)

            this.goMarket(this.playerOneCard, 3) 

        }else if(rules.suspension.active && number == rules.suspension.card){

            console.log("suspension")

            this.play(this.state)

        }else if(rules.generalMarket.active && number == rules.generalMarket.card){

            console.log("general market")

            this.play(this.state)

            this.goMarket(this.playerOneCard, 1) 

        }else{

            //send the move made to the client
            this.res.send(this.moves)

        }

    }

    close(){

        console.log("round : " + super.roundVal)
        console.log("---------------------------------")
        
    }


    
    availableMoves(playerCard, inPlayCard){

        //+----------------------------------------------------------------------+
        //|     This method receive two arguments, the first argument is the     |
        //|     card in the player hand and the second argument is the last      |
        //|     card played, the method loop through the first argument and    |
        //|     return all the valid moves that can be made                      | 
        //+----------------------------------------------------------------------+

        let index_in = inPlayCard.indexOf(":") + 1
        let number_in = parseInt(inPlayCard.slice(index_in, inPlayCard.length))
        let shape_in = inPlayCard.slice(0, index_in)
    
        let availableMove = ["z:goMarket"]
    
        for(let i = 0; i < playerCard.length; i++){
             
            let index = playerCard[i].indexOf(":") + 1
            let number = parseInt(playerCard[i].slice(index, playerCard[i].length))
            let shape = playerCard[i].slice(0, index)
    
            
    
            if(number === 20){
    
                availableMove.sort()
    
                availableMove.push("circle:20", "cross:20", "square:20", "star:20", "triangle:20")
                
                return availableMove
    
            }if(number === number_in){
    
                availableMove.push(playerCard[i])
    
            }else if(shape === shape_in){
            
                availableMove.push(playerCard[i])
    
            }
    
        }
    
    
        return availableMove.sort()
    
    }




    play(state){
        
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

        this.availableMove = this.availableMoves(this.playerTwoCard, this.cardPlayed[this.cardPlayed.length - 1])

        this.noOfCardsWithPlayerOne = gameState.playerOne.cardAtHand.length
        
        this.gameRules = state.rules

        

        if(this.availableMove.length === 1){
            //console.log(playerName) 
            //console.log(this.playerTwoCard)
            //console.log(" in play " + this.inPlay[this.inPlay.length - 1])
            this.goMarket(this.playerTwoCard, 1) 
            this.moves.push(["z:goMarket", -1])

            this.res.send(this.moves)

        }else{
            //search for states
            super.stateFinder(this.playerTwoName, this.cardPlayed, this.playerTwoCard, this.noOfCardsWithPlayerOne, this.availableMove, this.playerMove, this.market.length, this.gameRules)
        }
    
        console.log("available moves: "+ this.availableMove)

    }




    chooseAction(action, availableMove){

        //+---------------------------------------------------------------------------+
        //|  This method receive action a vector of numbers and the availableMoves,   |
        //|  and return the available move with highest corresponding action value    |
        //|  or a random value of the maximums move if there is move than one maximum | 
        //+---------------------------------------------------------------------------+

        let maxAction = Math.max(...action)

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

    




    playGame(player, card){


        //+---------------------------------------------------------------------------+
        //|     This method takes in the player cards at hand an the action to be     |
        //|     taken it takes it, if a card is played it adds it to gamePlayed and   |
        //|     subracts it from the player card at hand                              |
        //+---------------------------------------------------------------------------+

        console.log("game played " + card[0])

        let index = card[0].indexOf(":") + 1
        let number = card[0].slice(index, card[0].length)

        if(number == 20){
        
            this.cardPlayed.push(card[0])
            
            for(let i = 0; i < player.length; i++){
             
                if(player[i] == "whot:20") player.splice(i, 1)
            
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




    goMarket(player, times = 1){

        //+---------------------------------------------------------------------------+
        //|      This method adds card to player and remove that same card from       |  
        //|      market for n number of times                                         |
        //+---------------------------------------------------------------------------+

        console.log("card picked " +times)

        for(let i = 0; i < times; i ++){


            if(this.market.length > 0){

                player.push(this.market[this.market.length - 1])

                this.market.pop()

            }

        }

    }




    checkGame(){

        //+---------------------------------------------------------------------------+
        //|      This method checks if any of the player cards or market is less      |  
        //|      than one then it calls the reward method in GameEngine, if  any      |
        //|      of the player cards is finished that player wins the game and the    |
        //|      game is over but if market is finished, it adds all cards from       |
        //|      card Played to market and shuffle them while calling the reward      |
        //|      method in GameEngine, but the game continues                         |
        //+---------------------------------------------------------------------------+

        if(this.player1.length < 1 || this.player2.length < 1){

            super.rewards(this.agentOne, this.agentTwo, this.player1, this.player2, this.actionOneNew, this.actionOneOld, this.actionTwoNew, this.actionTwoOld)

        }else if(this.market.length < 1){
   
            super.rewards(this.agentOne, this.agentTwo, this.player1, this.player2, this.actionOneNew, this.actionOneOld, this.actionTwoNew, this.actionTwoOld)
            
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