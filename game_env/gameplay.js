GameEngine = require("./gameEngine")

const agents = require("../models/agents")

const cards = require("../cards").cards




class GamePlay extends GameEngine
{
    
    constructor(agentOne, agentTwo, rules){
        
        super(agentOne, agentTwo)

        const inGameCards = cards

        this.player1 = []
        this.player2 = []
        this.inPlay = []
        this.availableMove = []
        this.rules = rules
        this.need = false

        this.agentOne = agentOne
        this.agentTwo = agentTwo
        this.action1 = []
        this.action2 = []

        this.market = shuffle(inGameCards)

        this.goMarket(this.player1, 3)

        this.goMarket(this.player2, 3)

        this.goMarket(this.inPlay)

        console.log("player 1 " + this.player1)

        console.log("player 2 " + this.player2)
        
        console.log("player 2 " + this.inPlay)


        this.interval = setInterval(() => {
            
            if (this.market.length > 0 && this.player1.length > 0 && this.player2.length > 0) {
                        
                this.play(this.player1, agentOne, this.player2)
        
                this.play(this.player2, agentTwo, this.player1)

            }
            this.checkGame()
        }, 500)

    }



    referee(action, rules, avialableMove, playerCardAtHand, agent, opponentsCardAtHand){

        this.checkGame()

        console.log(agent.agentName) 
        console.log(playerCardAtHand)
        console.log(" in play " + this.inPlay[this.inPlay.length - 1])
        
     
        let card = this.chooseAction(action, avialableMove)
        
        let index = card[0].indexOf(":") + 1
        let number = card[0].slice(index, card[0].length)

        if(agent.agentName == this.agentOne.agentName){
            this.action1.push(card)
        }else{
            this.action2.push(card)
        }

        this.playGame(playerCardAtHand, card)

        if(this.market.length <= 0 && this.player1.length <= 0 && this.player2.length <= 0)
            return super.rewards(this.agentOne, this.agentTwo, this.player1, this.player2, this.action1, this.action2)
            

        if(rules.holdOn.active && number == rules.holdOn.card){

            console.log("hold On")

            this.play(playerCardAtHand, agent, opponentsCardAtHand)
            
        }

        if(rules.pickTwo.active && number == rules.pickTwo.card){

            console.log("pick 2")

            this.goMarket(opponentsCardAtHand, 2)
            this.play(playerCardAtHand, agent, opponentsCardAtHand)

        }

        if(rules.pickThree.active && number == rules.pickThree.card){

            console.log("pick 3")

            this.goMarket(opponentsCardAtHand, 3)
            this.play(playerCardAtHand, agent, opponentsCardAtHand)
   

        }

        if(rules.suspension.active && number == rules.suspension.card){

            console.log("suspension")

            this.play(playerCardAtHand, agent, opponentsCardAtHand)
        }

        if(rules.generalMarket.active && number == rules.generalMarket.card){

            console.log("general market")

            this.goMarket(opponentsCardAtHand)

        }

        if(number == 20){

            this.need = true

            this.needOption = ["circle:20", "cross:20", "square:20", "star:20", "triangle:20"]
            this.neededAction =  super.stateFinder(agent, this.cardPlayed, this.cardAtHand.sort(), this.noOfCardsWithOpponent, this.needOption, this.inPlay[this.inPlay.length - 1], this.market.length, rules)
            this.neededCard = this.chooseAction(this.neededAction, this.needOption)

            if(agent.agentName == this.agentOne.agentName){
                this.action1.push(this.neededCard)
            }else{
                this.action2.push(this.neededCard)
            }

            console.log("needed card " + this.neededCard[0])
            
            //this.play(playerCardAtHand, agent, opponentsCardAtHand)

        }

        console.log("---------------------------------")

    }



    play(playerCardAtHand, agent, opponentsCardAtHand){

        this.checkGame();

        let inPlayIndex = this.inPlay.length - 1
        let index_in = this.inPlay[inPlayIndex].indexOf(":") + 1
        let number_in = this.inPlay[inPlayIndex].slice(index_in, this.inPlay[inPlayIndex].length)
        let shape_in = this.inPlay[inPlayIndex].slice(0, index_in)
        this.availableMove = ["z:goMarket"]
        this.playerAgent = agent
        this.cardAtHand = playerCardAtHand
        this.cardPlayed = this.inPlay
        this.noOfCardsWithOpponent = opponentsCardAtHand.length
        this.opponent = opponentsCardAtHand


       


        if(this.need){

            for(let i = 0; i < playerCardAtHand.length; i++){

                let index_in = this.neededCard[0].indexOf(":") + 1
                let shape_in = this.neededCard[0].slice(0, index_in)

                let index = playerCardAtHand[i].indexOf(":") + 1
                let number = playerCardAtHand[i].slice(index, playerCardAtHand[0].length)
                let shape = playerCardAtHand[i].slice(0, index)
                
                if(shape == shape_in){
                
                    this.availableMove.push(playerCardAtHand[i])

                }else if(number == 20){

                    this.availableMove.push("whot:20")

                }

            }
            
        }else{

            for(let i = 0; i < playerCardAtHand.length; i++){
                let index = playerCardAtHand[i].indexOf(":") + 1
                let number = playerCardAtHand[i].slice(index, playerCardAtHand[0].length)
                let shape = playerCardAtHand[i].slice(0, index)
                
                if(number == number_in){

                    this.availableMove.push(playerCardAtHand[i])

                }else if(shape == shape_in){
                
                    this.availableMove.push(playerCardAtHand[i])

                }else if(number == 20){

                    this.availableMove.push("whot:20")

                }

            }

        }

        if(this.availableMove.length == 1){
            console.log(agent.agentName) 
            console.log(playerCardAtHand)
            console.log(" in play " + this.inPlay[this.inPlay.length - 1])
            this.goMarket(this.cardAtHand)
            
        }else{

            let action =  super.stateFinder(this.playerAgent, this.cardPlayed, this.cardAtHand.sort(), this.noOfCardsWithOpponent, this.availableMove.sort(), this.inPlay[this.inPlay.length - 1], this.market.length, this.rules)

            this.referee(action, this.rules, this.availableMove.sort(), this.cardAtHand.sort(), this.playerAgent, this.opponent)
        
        }
    
    }

    chooseAction(action, availableMove){

        //+---------------------------------------------------------------------------+
        //|  This method receive action a vector of numbers and the availableMoves,   |
        //|  and return the available move with highest corresponding action value    |
        //|  or a random value of the maximums move if there is move than one maximum | 
        //+---------------------------------------------------------------------------+

        let maxAction = Math.max(action)

        let actionPicked = []
        let pickedAction = []

        let maxFound = false

        for(let i = 0; i < action.length; i++){

            if(maxAction === action[i]){
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

        if(card[0] === "z:goMarket"){

            this.goMarket(player)

        }else if(!this.need){

            this.inPlay[this.inPlay.length] = card[0]

            for(let i = 0; i < player.length; i++){
                if(player[i] == card[0]){
                    player.splice(i, 1)
                    this.need = false
                }
            }

        }else if(this.need){

            this.inPlay[this.inPlay.length] = card[0]

            for(let i = 0; i < player.length; i++){
                if(player[i] == card[0]){
                    player.splice(i, 1)
                    this.need = false
                }
            }

        }

    }

    goMarket(player, times = 1){

        //+---------------------------------------------------------------------------+
        //|      This method adds card to player and remove that same card from       |  
        //|      market for n number of times                                         |
        //+---------------------------------------------------------------------------+

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

            super.rewards(this.agentOne, this.agentTwo, this.player1, this.player2, this.action1, this.action2)
            clearInterval(this.interval)

        }else if(this.market.length < 1){
            super.rewards(this.agentOne, this.agentTwo, this.player1, this.player2, this.action1, this.action2)

            //adds all the card played to market
            this.market = this.inPlay
            //removed the last card from market
            this.market.pop()
            //shuffles the cards
            this.market = shuffle(this.market)
            console.log("YYYYYYYYYYYYyy")
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

module.exports = {GamePlay, shuffle}