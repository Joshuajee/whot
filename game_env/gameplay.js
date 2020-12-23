GameEngine = require("./gameEngine")

const agents = require("../models/agents")

const cards = require("../cards").cards




class GamePlay extends GameEngine
{
    
    constructor(playerOneName, playerTwoName){
        
        super(playerOneName, playerTwoName)

        const inGameCards = cards

        this.player1 = []
        this.player2 = []
        this.inPlay = []
        this.action = []

        this.market = shuffle(inGameCards)

        this.Repeater(this.player1, 3)

        this.Repeater(this.player2, 3)

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
        return this.action
    }

    get playerNames(){
        return this.playerName
    }

    play(player, name){

        let inPlayIndex = this.inPlay.length - 1
        let index_in = this.inPlay[inPlayIndex].indexOf(":") + 1
        let number_in = this.inPlay[inPlayIndex].slice(index_in, this.inPlay[inPlayIndex].length)
        let shape_in = this.inPlay[inPlayIndex].slice(0, index_in)
        this.action = ["go:market"]
        this.playerName = name

        for(let i = 0; i < player.length; i++){
            let index = player[i].indexOf(":") + 1
            let number = player[i].slice(index, player[0].length)
            let shape = player[i].slice(0, index)
            
            if(number === number_in){

                this.action.push(player[i])

            }else if(shape === shape_in){
               
                this.action.push(player[i])

            }

        }

        
        super.stateFinder(this.playerName, this.action, this.inPlay, this.market.length)

    }

    PlayGame(player, card, index){

        this.inPlay[this.inPlay.length] = card

        player.splice(index, 1)
        
    }

    GoMarket(player){
        player[player.length] = this.market[this.market.length - 1]

        this.market.pop()

        console.log("Market")

    }
    
    Repeater(player, times){
        for(let i = 0; i < times; i ++){
            this.GoMarket(player)
        }
    }

}


function shuffle(array){

    let currIndex = array.length

    while (0 !== currIndex) {
        
        //Pick an element not prevously selected
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