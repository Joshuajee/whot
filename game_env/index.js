const GamePlay = require("./gameplay")

require("./gameplay")

gamePlay = new GamePlay("Jee", "Jee1")

gamePlay.play(gamePlay.playerOne, "Jee")

console.log(gamePlay.playerNames)
console.log(gamePlay.playerOne)
console.log(gamePlay.actions)



gamePlay.play(gamePlay.playerTwo, "Jee1")

console.log(gamePlay.playerNames)
console.log(gamePlay.playerTwo)
console.log(gamePlay.actions)

/*
while (gamePlay.playerOne.length > 0 && gamePlay.playerTwo.length > 0 && gamePlay.marketCards.length > 0) {

    console.log("player One ")
    gamePlay.play(gamePlay.playerOne)
    
    console.log("In Play " + gamePlay.inPlayCards[gamePlay.inPlayCards.length - 1])

    console.log("player Two")
    gamePlay.play(gamePlay.playerTwo)

    console.log("In Play " +gamePlay.inPlayCards[gamePlay.inPlayCards.length - 1])

    //break
}
*/


//console.log(gamePlay.marketCards)