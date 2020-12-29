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

        this.market = shuffle(inGameCards)

        this.goMarket(this.player1, 3)

        this.goMarket(this.player2, 3)

        this.goMarket(this.inPlay)

    }

    get playerOne(){
         return this.player1
    }

    get playerTwo(){
        return this.player2
    }

    get marketCards(){
        return this.market
    }

    get inPlayCards(){
        return this.inPlay
    }

    get actions(){
        return this.availableMove
    }

    get playerNames(){
        return this.playerName
    }



    referee(action, rules, avialableMove, playerCardAtHand, agent, opponentsCardAtHand){
        
        let card = this.chooseAction(action, avialableMove)
        
        let index = card[0].indexOf(":") + 1
        let number = card[0].slice(index, card[0].length)

        this.playGame(playerCardAtHand, card)
            

        if(rules.holdOn && number == 1){

            console.log("hold On")

            this.play(playerCardAtHand, agent, opponentsCardAtHand)
            
        }

        if(rules.pickTwo && number == 2){

            console.log("pick 2")

            this.goMarket(opponentsCardAtHand, 2)
            this.play(playerCardAtHand, agent, opponentsCardAtHand)

        }

        if(rules.pickThree && number == 5){

            console.log("pick 3")

            this.goMarket(opponentsCardAtHand, 3)
            this.play(playerCardAtHand, agent, opponentsCardAtHand)
   

        }

        if(rules.suspension && number == 8){

            console.log("suspension")

            this.play(playerCardAtHand, agent, opponentsCardAtHand)
        }

        if(rules.generalMarket && number == 14){

            console.log("general market")

            this.goMarket(opponentsCardAtHand)

        }

        if(rules.need && number == 20){

            this.need = true

            this.needOption = ["circle:20", "cross:20", "square:20", "star:20", "triangle:20"]
            this.neededAction =  super.stateFinder(agent, this.cardPlayed, this.cardAtHand.sort(), this.noOfCardsWithOpponent, this.needOption, this.inPlay[this.inPlay.length - 1], this.market.length, rules)
            this.neededCard = this.chooseAction(this.neededAction, this.needOption)
            
            
            this.play(playerCardAtHand, agent, opponentsCardAtHand)

        }

        if(this.rules.endGame && this.market.length == 0){
            
            
        }


    }



    play(playerCardAtHand, agent, opponentsCardAtHand){

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

        console.log(this.playerAgent.agentName)


        if(this.need){

            console.log("need  " + this.neededCard)

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

            console.log("ava " + this.availableMove)

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

        let action =  super.stateFinder(this.playerAgent, this.cardPlayed, this.cardAtHand.sort(), this.noOfCardsWithOpponent, this.availableMove.sort(), this.inPlay[this.inPlay.length - 1], this.market.length, this.rules)

        this.referee(action, this.rules, this.availableMove, this.cardAtHand, this.playerAgent, this.opponent)

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

        console.log("cards " + player)

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

        console.log("in Play " + this.inPlay[this.inPlay.length - 1])
        console.log("cards after play " + player)

        console.log("-----------------------------------")

    }

    goMarket(player, times = 1){

        //method adds card to player and remove that same card from market for n number of times
        for(let i = 0; i < times; i ++){

            player.push(this.market[this.market.length - 1])

            this.market.pop()

            console.log("market "+ player)
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