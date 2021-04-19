/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2021 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */


const GameEngine = require("./gameEngine")

const cards = require("../cards").cards

const inGameCards = [...cards]




class GameTrain extends GameEngine{
    
    constructor(playerOneName, playerTwoName, rules, isPlayerOneHuman, isPlayerTwoHuman){

        super(playerOneName, playerTwoName, rules, isPlayerOneHuman, isPlayerTwoHuman)

        this.rules = rules

        //class variables to hold players Names
        this.playerOneName = playerOneName
        this.playerTwoName = playerTwoName
        
        this.currentPlayerName = this.playerOneName

        super.on("playerOne", () => {
            this.checkGame()
            if(this.player1.length > 0 && this.player2.length > 0)
                this.play(this.player1, this.player2, this.playerOneName, this.playerTwoName)
        })

        super.on("playerTwo", () => {
            this.checkGame()
            if(this.player1.length > 0 && this.player2.length > 0)
                this.play(this.player2, this.player1, this.playerTwoName, this.playerOneName)
        })

        super.on("received", ()=>{
            let action = super.getAction
            this.referee(action, this.rules, this.availableMove, this.cardAtHand.sort(), this.playerName, this.opponent)
        })


    }


    startGame(){

        //class variables to hold game variables
        this.player1 = []
        this.player2 = []
        this.inPlay = []
        this.availableMove = []

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

        this.play(this.player1, this.player2, this.playerOneName, this.playerTwoName)

    }


    referee(action, rules, avialableMove, playerCardAtHand, playerName, opponentsCardAtHand){

        console.log(playerName) 
        console.log(playerCardAtHand)
        console.log(" in play " + this.inPlay[this.inPlay.length - 1])
        
        let card = this.chooseAction(action, avialableMove)

        let index = card[0].indexOf(":") + 1
        let number = card[0].slice(index, card[0].length)

        if(playerName == this.playerOneName){

            if(action[0])
                this.actionOneNew.push(card)
            else
                this.actionOneOld.push(card)
            
        }else{
            
            if(action[0])
                this.actionTwoNew.push(card)
            else
                this.actionTwoOld.push(card)

        }

        this.playGame(playerCardAtHand, card)

        if(rules.holdOn.active && number == rules.holdOn.card){

            console.log("hold On")

            this.close()
            
            this.playerController()
           
        }else if(rules.pickTwo.active && number == rules.pickTwo.card){

            console.log("pick 2")

            this.checkGame()

            this.goMarket(opponentsCardAtHand, 2)

            this.playerController()

        }else if(rules.pickThree.active && number == rules.pickThree.card){

            console.log("pick 3")

            this.checkGame()

            this.goMarket(opponentsCardAtHand, 3)

            this.playerController()

        }else if(rules.suspension.active && number == rules.suspension.card){

            console.log("suspension")
            
            this.playerController()

        }else if(rules.generalMarket.active && number == rules.generalMarket.card){

            console.log("general market")

            this.checkGame()

            this.goMarket(opponentsCardAtHand)

            this.playerController()

        }else{

            this.playerController(true)

        }

    }

    close(){

        console.log("round : " + super.roundVal)
        console.log("---------------------------------")

    }


    /**
     * This method decide which player makes the next move.
     * @param changePlayer boolean with a defalut value of false, if the value true
     * the next player make a move if it is false the current player continue playing
     */
    playerController(changePlayer = false){
    
        this.close()

        if(changePlayer)
        {

            if(this.currentPlayerName !== this.playerOneName)
                super.emit("playerOne")
            else
                super.emit("playerTwo")
            
        }else{

            if(this.currentPlayerName === this.playerOneName)
                super.emit("playerOne")
            else
                super.emit("playerTwo")

        }

    }

    /**
     * This method search for valid moves           
     * @param {*} playerCard cards of the player that is to make a move
     * @param {*} inPlayCard last card played
     * @returns an array all valid moves that can be mades
     */
    availableMoves(playerCard, inPlayCard){

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

    play(playerCardAtHand, opponentsCardAtHand, playerName, opponentName){

        console.log("Market " + this.market.length)

        let inPlayIndex = this.inPlay.length - 1
        let inPlayCard = this.inPlay[inPlayIndex]
        this.playerName = playerName
        this.opponent = opponentsCardAtHand
        this.cardAtHand = playerCardAtHand
        this.cardPlayed = this.inPlay
        this.noOfCardsWithOpponent = opponentsCardAtHand.length
        this.opponent = opponentsCardAtHand

        this.currentPlayerName = playerName

        this.availableMove = this.availableMoves(this.cardAtHand, inPlayCard)

        if(this.availableMove.length === 1){

            console.log(playerName) 
            console.log(playerCardAtHand)
            console.log(" in play " + this.inPlay[this.inPlay.length - 1])
            this.goMarket(this.cardAtHand) 
            
            this.playerController(true)

        }else{

            //search for states
            super.stateFinder(this.playerName, this.cardPlayed, this.cardAtHand.sort(), this.noOfCardsWithOpponent, this.availableMove, this.inPlay[this.inPlay.length - 1], this.market.length, this.rules)
        
        }
    
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
    playGame(player, move){

        console.log("game move " + move[0])
        
        let index = move[0].indexOf(":") + 1
        let number = move[0].slice(index, move[0].length)

        if(number == 20){
        
            this.inPlay.push(move[0])
            
            for(let i = 0; i < player.length; i++){
             
                if(player[i] == "whot:20"){
                    player.splice(i, 1) 
                    break
                }
            
            }

        }else if(move[0] === "z:goMarket"){

            this.goMarket(player)

        }else{

            this.inPlay.push(move[0])
            
            for(let i = 0; i < player.length; i++){

                if(player[i] == move[0]) player.splice(i, 1)

            }

        }
        console.log(this.market.length + this.inPlay.length + this.player1.length + this.player2.length)

        
        if(this.market.length + this.inPlay.length + this.player1.length + this.player2.length != 56){
            //bbbbbbbbbbbbbbbb
        }

    }

  
    /**
     * This method adds card to player and remove that same card from market
     * for n number of times   
     * @param {*} player cards of the player that is going to the market
     * @param {*} times number of times the player goes to market has a default value of 1
     */
    goMarket(player, times = 1){

        console.log("card picked " +times)

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

        if(this.player1.length < 1 || this.player2.length < 1){

            super.rewards(this.agentOne, this.agentTwo, this.player1, this.player2, this.actionOneNew, this.actionOneOld, this.actionTwoNew, this.actionTwoOld)

        }else if(this.market.length < 1){
   
            super.rewards(this.agentOne, this.agentTwo, this.player1, this.player2, this.actionOneNew, this.actionOneOld, this.actionTwoNew, this.actionTwoOld)
            
            //santize the card
            let inPlay = sanitizeCardPlayed(this.inPlay)

            //adds all the card played to market
            this.market = inPlay
            
            //reasign inplay giving it just its last value
            this.inPlay = [this.inPlay[this.inPlay.length - 1]]

            //removed the last card from market
            this.market.pop()

            //shuffles the cards
            this.market = shuffle(this.market)

            console.log("Micro Reward")
            console.log(this.market)
            console.log(this.inPlay)
            console.log(this.player1)
            console.log(this.player2)

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



/**
 * This function changes all cards with a number of 20 to whot 
 * @param {*} cards array of cards
 * @returns array of transformed cards
 */
function sanitizeCardPlayed(cards){

    let result = []

    for(let i = 0; i < cards.length; i++){

        let index = cards[i].indexOf(":") + 1
        let number = cards[i].slice(index, cards.length)

        if(number == 20)
            result.push("whot:20")
        else
            result.push(cards[i])

    }

    return result

}



module.exports = {GameTrain, shuffle}