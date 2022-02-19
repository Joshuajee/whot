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

    constructor(playerOneName, playerTwoName, rules, agents, currentPlayerIndex, currentOpponentIndex, gameEvents){

        super(playerOneName, playerTwoName, rules, agents, currentPlayerIndex, currentOpponentIndex, gameEvents)

        this.rules = rules

        //class variables to hold players Names
        this.playerOneName = playerOneName
        this.playerTwoName = playerTwoName

        this.agentOne = agents[0]
        this.agentTwo = agents[1]
        
        this.currentPlayerName = this.playerOneName

        super.on("playerOne", async () => {
            await this.checkGame()
            if(this.player1.length > 0 && this.player2.length > 0)
                this.play(this.player1, this.player2, this.playerOneName, this.playerTwoName)
        })

        super.on("playerTwo", async () => {
            await this.checkGame()
            if(this.player1.length > 0 && this.player2.length > 0)
                this.play(this.player2, this.player1, this.playerTwoName, this.playerOneName)
        })

        super.on("received", async () =>{
            let action = super.getAction
            await this.referee(action, this.rules, this.availableMove, this.cardAtHand.sort(), this.playerName, this.opponent)
        })

    }

    /**
     * This method starts the game and set all the class variables
     */
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

        this.goMarket(this.player1, 3)

        this.goMarket(this.player2, 3)

        this.goMarket(this.inPlay)

        if(this.inPlay[0] === "whot:20"){

            let whot = ["circle:20", "cross:20", "square:20", "star:20", "triangle:20"]

            this.inPlay[0] = whot[Math.floor(Math.random() * whot.length)]
        }

        this.referee(this.inPlay, this.rules, "avialableMove", this.player2, this.playerTwoName, this.player1, true, true)
        
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
    referee(action, rules, avialableMove, playerCardAtHand, playerName, opponentsCardAtHand, startGame = false, firstMove = false){

        let card = null

        let index = null
        let number = null

        if(!startGame){

            console.log("Market " + this.market.length)
            console.log(playerName) 
            console.log(playerCardAtHand)
            console.log(" in play " + this.inPlay[this.inPlay.length - 1])
        

            card = this.chooseAction(action, avialableMove)

            console.log(action, avialableMove)
            console.log(card)

            index = card[0].indexOf(":") + 1
            number = card[0].slice(index, card[0].length)

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

        }else{

            console.log("player 1 " + this.player1)

            console.log("player 2 " + this.player2)
        
            console.log("in play " + this.inPlay)

            card = action
            console.log(card)
            console.log(action)
            console.log(startGame)
            index = card[0].indexOf(":") + 1
            number = card[0].slice(index, card[0].length)

        }


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
     * @param {*} changePlayer boolean with a defalut value of false, if the value true
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
    
                        console.log("__________________________________")
    
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

        //determines the agent that is playing and if the agent can always go to market
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

        if(availableMove.length === 0) availableMove = ["z:goMarket"]
    
        return availableMove.sort()
    
    }

    /**
     * This Methods set different class variables and call the stateFinder
     * method from the GameEngine class
     * @param {*} playerCardAtHand cards with the current playing agent
     * @param {*} opponentsCardAtHand cards with the other agent
     * @param {*} playerName current agent name
     */
    play(playerCardAtHand, opponentsCardAtHand, playerName){

        let inPlayIndex = this.inPlay.length - 1
        let inPlayCard = this.inPlay[inPlayIndex]
        this.playerName = playerName
        this.opponent = opponentsCardAtHand
        this.cardAtHand = playerCardAtHand
        this.cardPlayed = this.inPlay
        this.noOfCardsWithOpponent = opponentsCardAtHand.length
        this.opponent = opponentsCardAtHand

        this.currentPlayerName = playerName

        this.availableMove = this.availableMoves(this.cardAtHand, inPlayCard, playerName)

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
    playGame(player, move){

        console.log(this.market.length + this.inPlay.length + this.player1.length + this.player2.length)

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

            
            for(let i = 0; i < player.length; i++){

                if(player[i] == move[0]){

                    this.inPlay.push(move[0])
                    player.splice(i, 1)
                    break

                }

            }

        }

        

        console.log("Market ", this.market)
        console.log("InPlay ", this.inPlay)
        console.log("Player 1 ", this.player1)
        console.log("Player 2 ", this.player2)

        console.log(this.market.length + this.inPlay.length + this.player1.length + this.player2.length)

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
    async checkGame() {

        if(this.player1.length < 1 || this.player2.length < 1){

            await super.rewards(this.playerOneName, this.playerTwoName, this.player1, this.player2, this.actionOneNew, this.actionOneOld, this.actionTwoNew, this.actionTwoOld)
            
            this.actionOneNew = []
            this.actionOneOld = []
            this.actionTwoNew = []
            this.actionTwoOld = []
            
        } else if(this.market.length < 1){
   
            await super.rewards(this.playerOneName, this.playerTwoName, this.player1, this.player2, this.actionOneNew, this.actionOneOld, this.actionTwoNew, this.actionTwoOld)
            
            //santize the card
            let inPlay = sanitizeCardPlayed(this.inPlay)

            //adds all the card played to market
            this.market = inPlay
            
            //reasign inplay giving it just its last value
            this.inPlay = [this.inPlay[this.inPlay.length - 1]]

            //removed the last card from market
            this.market.pop()

            //shuffles the cards
            this.market = shuffle([...this.market])

            this.actionOneNew = []
            this.actionOneOld = []
            this.actionTwoNew = []
            this.actionTwoOld = []
                 
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
 * This function changes all cards with a number of 20 to whot:20 
 * @param {*} cards array of cards
 * @returns array of transformed cards
 */
function sanitizeCardPlayed(cards){

    let result = []

    for(let i = 0; i < cards.length; i++){

        let index = cards[i].indexOf(":") + 1
        let number = parseInt(cards[i].slice(index, cards.length))


        if(number === 20)
            result.push("whot:20")
        else
            result.push(cards[i])

    }

    return result

}

module.exports = {GameTrain, shuffle}