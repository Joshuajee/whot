GameEngine = require("./gameEngine")

const agents = require("../models/agents")

const cards = require("../cards").cards




class GamePlay extends GameEngine
{
    
    constructor(playerOneName, playerTwoName, rules){
        
        super(playerOneName, playerTwoName)

        const inGameCards = cards

        this.player1 = []
        this.player2 = []
        this.inPlay = []
        this.availableMove = []
        this.rules = rules

        this.market = shuffle(inGameCards)

        this.repeater(this.player1, 10)

        this.repeater(this.player2, 10)

        this.GoMarket(this.inPlay)


        console.log(playerOneName)
        console.log(this.player1)

        console.log(playerTwoName)
        console.log(this.player2)

        console.log("in play")
        console.log(this.inPlay)

        console.log("market")
        console.log(this.market)

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

    referee(action, rules, player, playerName, opponent){

        let index = action.indexOf(":") + 1
        let number = action.slice(index, action.length)

        if(rules.holdOn && number === 1){
            this.play(player, playerName, opponent.length)
        }

        if(rules.pickTwo && number === 2){
            this.repeater(opponent, 2)
            this.play(player, playerName, opponent.length)
        }

        if(rules.pickThree && number === 5){
            this.repeater(opponent, 3)
            this.play(player, playerName, opponent.length)
        }

        if(rules.supension && number === 8){
            this.play(player, playerName, opponent.length)
        }

        if(rules.generalMarket && number === 14){
            this.play(player, playerName, opponent.length)
        }

        if(rules.need && number === 20){
            //this.play(player, playerName, opponent.length)
        }

        if(rules.endGame && this.market.length === 0){
            
        }

    }



    play(player, name, noOfCardsWithOpponent){

        let inPlayIndex = this.inPlay.length - 1
        let index_in = this.inPlay[inPlayIndex].indexOf(":") + 1
        let number_in = this.inPlay[inPlayIndex].slice(index_in, this.inPlay[inPlayIndex].length)
        let shape_in = this.inPlay[inPlayIndex].slice(0, index_in)
        this.availableMove = ["z:gomarket"]
        this.playerName = name
        this.cardAtHand = player
        this.cardPlayed = this.inPlay
        this.noOfCardsWithOpponent = noOfCardsWithOpponent

        for(let i = 0; i < player.length; i++){
            let index = player[i].indexOf(":") + 1
            let number = player[i].slice(index, player[0].length)
            let shape = player[i].slice(0, index)
            
            if(number === number_in){

                this.availableMove.push(player[i])

            }else if(shape === shape_in){
               
                this.availableMove.push(player[i])

            }

        }

        
        let action =  super.stateFinder(this.playerName, this.cardPlayed, this.cardAtHand.sort(), this.noOfCardsWithOpponent, this.availableMove.sort(), this.inPlay[this.inPlay.length - 1], this.market.length, this.rules)


        this.PlayGame(this.cardAtHand, this.chooseAction(action, this.availableMove))
    
        
    }

    chooseAction(action, availableMove){

        availableMove.sort()

        let maxAction = Math.max(action)

        for(let i = 0; i < action.length; i++){
            if(maxAction === action[i]) return [availableMove[i], i]
        }
        return [availableMove[0], 0]
    }

    PlayGame(player, card){

        this.inPlay[this.inPlay.length] = card[0]

        player.splice(cards[1], 1)

        console.log("in Play")
        console.log(this.cardPlayed)
        
    }

    GoMarket(player){

        //method adds card to player and remove that same card from market

        player[player.length] = this.market[this.market.length - 1]

        this.market.pop()

    }
    
    repeater(player, times){
        for(let i = 0; i < times; i ++){
            this.GoMarket(player)
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

module.exports = GamePlay