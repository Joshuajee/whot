const GamePlay = require("./gamePlay")

class GameStart extends GamePlay{

    constructor(){

        let rules = {"holdOn":true, "pickTwo":true, "pickThree":true, "suspension":true, "generalMarket":true, "need":true, "endGame":true}

        super("Jee", "Angella", rules)


        super.on("start", ()=>{

            setInterval(() => {

                if (this.marketCards.length > 0 && this.playerOne.length > 0 && this.playerTwo.length > 0) {
                    super.play(super.playerOne, "Jee", this.playerTwo)
    
    
                    super.play(super.playerTwo, "Angella", this.playerOne)
                    console.log(this.playerOne.length)
                }
                
            }, 2000);


            super.play(super.playerOne, "Jee", this.playerTwo)
    
    
            super.play(super.playerTwo, "Angella", this.playerOne)

            /*
            while (this.marketCards.length > 0 && this.playerOne.length > 0 && this.playerTwo.length > 0) {
                super.play(super.playerOne, "Jee", this.playerTwo)


                super.play(super.playerTwo, "Angella", this.playerOne)
                console.log(this.playerOne.length)
            }
           */

            
        })

    }

}


module.exports = GameStart