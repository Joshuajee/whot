const {GamePlay, shuffle} = require("./gamePlay")


class GameStart extends GamePlay{

    constructor(playerOneName, playerTwoName, rules, isPlayerOneHuman, isPlayerTwoHuman){

        super(playerOneName, playerTwoName, rules, isPlayerOneHuman, isPlayerTwoHuman)

    }

}


module.exports = {GameStart, shuffle}
