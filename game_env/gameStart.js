const {GamePlay, shuffle} = require("./gamePlay")


class GameStart extends GamePlay{

    constructor(agentOne, agentTwo){

        let rules = {"holdOn":true, "pickTwo":true, "pickThree":true, "suspension":true, "generalMarket":true, "need":true, "endGame":true}

        super(agentOne, agentTwo, rules)

    }

}


module.exports = GameStart
