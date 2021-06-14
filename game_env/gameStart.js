/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2021 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */

const {GameTrain, shuffle} = require("./gameTrain")
const GamePlay = require("./gamePlay")


class GameTraining extends GameTrain{

    constructor(playerOneName, playerTwoName, rules, agents, currentPlayerIndex, currentOpponentIndex, gameEvents){

        super(playerOneName, playerTwoName, rules, agents, currentPlayerIndex, currentOpponentIndex, gameEvents)

    }

}



class GamePlaying extends GamePlay{

    

    constructor(playerOneName, playerTwoName, rules, agent, isPlayerOneHuman, isPlayerTwoHuman){

        super(playerOneName, playerTwoName, rules, agent, isPlayerOneHuman, isPlayerTwoHuman)
        
    }

}

module.exports = {GameTraining, GamePlaying, shuffle}