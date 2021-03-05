/*
 * Copyright (C) 2021 Joshua Evuetapha
 * Twitter : @evuetaphajoshua
 * Github : @Joshuajee
 * This program is distributed under the MIT license
 */

const {GameTrain, shuffle} = require("./gameTrain")
const GamePlay = require("./gamePlay")



class GameTraining extends GameTrain{

    constructor(playerOneName, playerTwoName, rules, isPlayerOneHuman, isPlayerTwoHuman){

        super(playerOneName, playerTwoName, rules, isPlayerOneHuman, isPlayerTwoHuman)

    }

}


class GamePlaying extends GamePlay{

    constructor(playerOneName, playerTwoName, rules, isPlayerOneHuman, isPlayerTwoHuman){

        super(playerOneName, playerTwoName, rules, isPlayerOneHuman, isPlayerTwoHuman)
        
    }

 


}


module.exports = {GameTraining, GamePlaying, shuffle}
