const {GamePlay, shuffle} = require("./gamePlay")


class GameStart extends GamePlay{

    constructor(agentOne, agentTwo){

        let rules = {"holdOn":{"active":true, "card":1, "defend":false},
                     "pickTwo":{"active":true, "card":2, "defend":false},
                     "pickThree":{"active":true, "card":5, "defend":false}, 
                     "suspension":{"active":true, "card":8, "defend":false},
                     "generalMarket":{"active":true, "card":14, "defend":false}
                    } 

        super(agentOne, agentTwo, rules)

    }

}


module.exports = GameStart
