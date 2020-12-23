const GamePlay = require("./gamePlay")

class GameStart extends GamePlay{

    constructor(){
        super("Jee", "Jee1")


        super.on("start", ()=>{

            super.play(super.playerOne, "Jee")

            console.log(super.playerNames)
            console.log(super.playerOne)
            console.log(super.actions)


            super.play(super.playerTwo, "Jee1")

            console.log(super.playerNames)
            console.log(super.playerTwo)
            console.log(super.actions)
            
        })

    }


}


module.exports = GameStart