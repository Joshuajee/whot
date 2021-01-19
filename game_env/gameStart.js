const {GamePlay, shuffle} = require("./gamePlay")


class GameStart extends GamePlay{

    constructor(agentOne, agentTwo, rules, agent){

        super(agentOne, agentTwo, rules, agent)

        console.log(agentOne)
        console.log(agentTwo)
    }

}


module.exports = {GameStart, shuffle}
