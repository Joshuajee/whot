const {GamePlay, shuffle} = require("./gamePlay")


class GameStart extends GamePlay{

    constructor(agentOne, agentTwo){

        let rules = {"holdOn":true, "pickTwo":true, "pickThree":true, "suspension":true, "generalMarket":true, "need":true, "endGame":true}

        super(agentOne, agentTwo, rules)

       
        var interval = setInterval(() => {
            if (super.marketCards.length > 0 && super.playerOne.length > 0 && super.playerTwo.length > 0) {
                        
                super.play(super.playerOne, agentOne, super.playerTwo)
        
                super.play(super.playerTwo, agentTwo, super.playerOne)

            }
            if(super.marketCards.length < 1 || super.playerOne.length < 1 || super.playerTwo.length < 1){

                super.rewards(super.agentOne, super.agentTwo, super.playerOne, super.playerTwo, super.actionOne, super.actionTwo)
                clearInterval(interval)
            }
        }, 1000)

    }

}


module.exports = GameStart
