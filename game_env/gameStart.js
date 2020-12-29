const {GamePlay, shuffle} = require("./gamePlay")

class GameStart extends GamePlay{

    constructor(agentOne, agentTwo){

        let rules = {"holdOn":true, "pickTwo":true, "pickThree":true, "suspension":true, "generalMarket":true, "need":true, "endGame":true}

        super(agentOne, agentTwo, rules)

       
        setInterval(() => {
            if (this.marketCards.length > 0 && super.playerOne.length > 0 && super.playerTwo.length > 0) {
                        
                super.play(super.playerOne, agentOne, super.playerTwo)
        
                super.play(super.playerTwo, agentTwo, super.playerOne)

            }
        })


        //super.on("start", ()=>{
        /*
            setInterval(() => {

                if (this.marketCards.length > 0 && super.playerOne.length > 0 && super.playerTwo.length > 0) {
                    
                    super.play(super.playerOne, "Jee", super.playerTwo)
    
                    super.play(super.playerTwo, "Angella", super.playerOne)

                }
                
            }, 2000);

            */
        //})

    }

}


module.exports = GameStart