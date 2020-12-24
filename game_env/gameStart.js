const GamePlay = require("./gamePlay")

class GameStart extends GamePlay{

    constructor(){

        let rules = {"holdOn":true, "pickTwo":true, "pickThree":true, "suspension":true, "generalMarket":true, "need":true, "endGame":false}

        super("Jee", "Angella", rules)


        super.on("start", ()=>{

            super.play(super.playerOne, "Jee", this.playerTwo.length)

            console.log(super.playerNames)
            console.log(super.playerOne)
            console.log(super.actions)


            super.play(super.playerTwo, "Angella", this.playerOne.length)

            console.log(super.playerNames)
            console.log(super.playerTwo)
            console.log(super.actions)
            
        })

    }


}


module.exports = GameStart