export function shuffle(array){

    let currIndex = array.length

    while (0 !== currIndex) {
        
        //pick an element not prevously selected
        let randIndex = Math.floor(Math.random() * currIndex)
        currIndex--

        //swap it with the current element
        let tempVal  = array[currIndex]
        array[currIndex] = array[randIndex]
        array[randIndex] = tempVal
    
    }

    return array
}

export function goMarket(player,  market, times = 1){

    //+---------------------------------------------------------------------------+
    //|      This method adds card to player and remove that same card from       |  
    //|      market for n number of times                                         |
    //+---------------------------------------------------------------------------+

    for(let i = 0; i < times; i ++){

        if(market.length > 0){

            player.push(market[market.length - 1])

            market.pop()

        }

    }

}

export function referee(card, rules, playerCardAtHand, opponentsCardAtHand, cardPlayed){

    let index = card[0].indexOf(":") + 1
    let number = card[0].slice(index, card[0].length)

    playGame(playerCardAtHand, card, cardPlayed)

    if(rules.holdOn.active && number === rules.holdOn.card){

        console.log("hold On")
       
    }else if(rules.pickTwo.active && number === rules.pickTwo.card){

        console.log("pick 2")

        checkGame()

        goMarket(opponentsCardAtHand, 2)

    }else if(rules.pickThree.active && number === rules.pickThree.card){

        console.log("pick 3")

        checkGame()

        goMarket(opponentsCardAtHand, 3)



    }else if(rules.suspension.active && number === rules.suspension.card){

        console.log("suspension")

    }else if(rules.generalMarket.active && number === rules.generalMarket.card){

        console.log("general market")

        checkGame()

        goMarket(opponentsCardAtHand)

   
    }else if(number === 20){

        let need = true

        let needOption = ["circle:20", "cross:20", "square:20", "star:20", "triangle:20"]

    }

}

export function playGame(player, card, cardPlayed){


    //+---------------------------------------------------------------------------+
    //|     This function takes in the player cards at hand an the action to be   |
    //|     taken it takes it, if a card is played it adds it to gamePlayed and   |
    //|     subracts it from the player card at hand                              |
    //+---------------------------------------------------------------------------+
    

    let need = false

    console.log("game played " + card[0])

    if(card[0] === "z:goMarket"){

        //goMarket(player)

    }else if(!need){

        cardPlayed.push(card[0])
        alert(cardPlayed)

        for(let i = 0; i < player.length; i++){
            if(player[i] === card[0]){
                player.splice(i, 1)
                console.log(player)
                need = false
            }
        }

    }else if(need){

        cardPlayed.push(card[0])

        for(let i = 0; i < player.length; i++){
            if(player[i] === card[0]){
                player.splice(i, 1)
                need = false
            }
        }

    }

}


export function canPlay(card, inPlay) {

    let index = card.indexOf(":") + 1
    let number = parseInt(card.slice(index, card.length))
    let shape = card.slice(0, index)

    let index_in = inPlay.indexOf(":") + 1
    let number_in = parseInt(inPlay.slice(index_in, inPlay.length))
    let shape_in = inPlay.slice(0, index_in)

    if(number === 20) return [true, true]
    
    if(number === number_in || shape === shape_in) return [true, false]

    return [false, false]

}

export function checkGame(card, inPlay) {

    let index = card.indexOf(":") + 1
    let number = card.slice(index, card.length)
    let shape = card.slice(0, index)

    let index_in = inPlay.indexOf(":") + 1
    let number_in = inPlay.slice(index_in, inPlay.length)
    let shape_in = inPlay.slice(0, index_in)
    
    if(number === number_in || shape === shape_in || number === 20) return true

    return false

}

export function checkPlayResponse(response, rules, playerCardAtHand, opponentsCardAtHand, cardPlayed){

    for (let i = 0; i < response.length; i++) {

        //console.log(response[i])
        
        referee(response[i], rules, playerCardAtHand, opponentsCardAtHand, cardPlayed)
        
    }

}
