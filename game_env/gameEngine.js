require("../configs/dbConnections")



class GameEngine{

    constructor(playerOne, playerTwo){

        this.agentOneName = playerOne.agentName
        this.agentTwoName = playerTwo.agentName      
        
        this.playerOneStateRound = []
        this.playerTwoStateRound = []
        
        this.round = 1
    
    }

    get roundVal(){
        return this.round
    }

    
    addReward(agent, point, states, action){

        //+-----------------------------------------------------------------+
        //|  This method is used to add rewards to the agent in question    |                                                   |    
        //+-----------------------------------------------------------------+

        agent.points = agent.points + point

        for(let x = 0; x < states.length; x++){

            for(let y = 0; y < agent.states.length; y++){

                let agStates = agent.states[y]

                let condition = this.compareArray(agStates.cardAtHand, states[x].cardAtHand)           && 
                                this.compareArray(agStates.cardPlayed, states[x].cardPlayed)           && 
                                this.compareArray(agStates.availableMove, states[x].availableMove)     &&
                                agStates.cardInPlay == states[x].cardInPlay                            &&
                                agStates.noOfCardsInMarket == states[x].noOfCardsInMarket              &&
                                agStates.noOfCardsWithOpponent == states[x].noOfCardsWithOpponent         

                if(condition){

                    agent.states[y].actions[action[x][1]] = agent.states[y].actions[action[x][1]] + point

                    break;
                }

            }
        
        }

        agent.save((err) => {

        })

    }


    rewards(playerOneAgent, playerTwoAgent, playerOneCardAtHand, playerTwoCardAtHand, playerOneActions, playerTwoActions){

        //+---------------------------------------------------------------------------+
        //|  This method is called when the game ends it reward the agents according  |
        //|  to the reward policy                                                     |    
        //+---------------------------------------------------------------------------+

        this.round++
        
        let playerOneNumber = 0
        let playerTwoNumber = 0


        //sum the card numbers if any is remaining for agent one
        if(playerOneCardAtHand.length > 0){

            for(let i = 0; i < playerOneCardAtHand.length; i++)
            {

                let index_in = playerOneCardAtHand[i].indexOf(":") + 1
                let number_in = parseInt(playerOneCardAtHand[i].slice(index_in, playerOneCardAtHand[i].length))
                let shape_in = playerOneCardAtHand[i].slice(0, index_in)

                if(shape_in == "star"){
                    playerOneNumber += number_in * 2
                }else{
                    playerOneNumber += number_in 
                }
                
            }
            
        }


        //sum the card numbers if any is remaining for agent two
        if(playerTwoCardAtHand.length > 0){

            for(let i = 0; i < playerTwoCardAtHand.length; i++)
            {

                let index_in = playerTwoCardAtHand[i].indexOf(":") + 1
                let number_in = parseInt(playerTwoCardAtHand[i].slice(index_in, playerTwoCardAtHand[i].length))
                let shape_in = playerTwoCardAtHand[i].slice(0, index_in)

                if(shape_in == "star"){
                    playerTwoNumber += number_in * 2
                }else{
                    playerTwoNumber += number_in 
                }
                
            }
            
        }

        if(playerOneNumber != 0 || playerTwoNumber != 0){
            //penalise both agent
            if(this.playerOneNumber > this.playerTwoNumber){
                //
                this.addReward(playerOneAgent, 5 - 1 * playerOneNumber / 100, this.playerOneStateRound, playerOneActions)
                this.addReward(playerTwoAgent, -1 * playerTwoNumber / 100, this.playerTwoStateRound, playerTwoActions)
   
            }else if(this.playerOneNumber < this.playerTwoNumber){
                //
                this.addReward(playerOneAgent, -1 * playerOneNumber / 100, this.playerOneStateRound, playerOneActions)
                this.addReward(playerTwoAgent, 5 - 1 * playerTwoNumber / 100, this.playerTwoStateRound, playerTwoActions)
   
            }else{
                //
                this.addReward(playerOneAgent, -1 * playerOneNumber / 100, this.playerOneStateRound, playerOneActions)
                this.addReward(playerTwoAgent, -1 * playerTwoNumber / 100, this.playerTwoStateRound, playerTwoActions)
   
            }

         }

        if(playerOneNumber == 0){
            //reward player one
            this.addReward(playerOneAgent, 5,  this.playerOneStateRound, playerOneActions)
            //penalise player two
            this.addReward(playerTwoAgent, -2 -1 * playerTwoNumber / 10, this.playerTwoStateRound, playerTwoActions)
        }else if(playerTwoNumber == 0){
            //penalise player one
            this.addReward(playerOneAgent, -2 -1 * playerTwoNumber / 10,  this.playerOneStateRound, playerOneActions)
            //reward player two
            this.addReward(playerTwoAgent, 5, this.playerTwoStateRound, playerTwoActions)
        }

        //empty the StateRound array after one round
        this.playerOneStateRound = []
        this.playerTwoStateRound = []
       
    }
    

    stateFinder(playerAgent, cardPlayed, cardAtHand,  noOfCardsWithOpponent, availableMove, inPlayCards, noOfCardsInMarket, rules){

        //+---------------------------------------------------------------------------+
        //|  This method finds all the relevant states an angent has                  |
        //+---------------------------------------------------------------------------+

        this.cardAtHand = cardAtHand

        this.player = playerAgent

        switch(this.player.states.length){
            case 0:
                return this.stateCreater(this.player, cardPlayed, cardAtHand,  noOfCardsWithOpponent, availableMove, inPlayCards, noOfCardsInMarket, rules)
            default:
                return this.stateSearch(this.player, cardPlayed, cardAtHand,  noOfCardsWithOpponent, availableMove, inPlayCards, noOfCardsInMarket, rules)
        }


    }


    stateCreater(player, cardPlayed, cardAtHand,  noOfCardsWithOpponent, availableMove, inPlayCards, noOfCardsInMarket, rules){
        
        //+---------------------------------------------------------------------------+
        //|  This method creates a state and save it to an angent in the database     |
        //|  it also save it to the correspondingn state array                        |
        //+---------------------------------------------------------------------------+

        let actions = this.actionCreater(availableMove, player.states)

        let currState = {"cardAtHand":cardAtHand, 
                        "noOfCardsWithOpponent": noOfCardsWithOpponent,
                        "cardInPlay":inPlayCards,
                        "cardPlayed": cardPlayed, 
                        "noOfCardsInMarket":noOfCardsInMarket,
                        "availableMove":availableMove,
                        "actions":actions,
                        "rules":rules
                    }
                    
        player.states.push(currState)

        let stateLength = player.states.length - 1

        //add this state to the right player
        if(this.agentOneName == player.agentName) this.playerOneStateRound.push(player.states[stateLength])
        if(this.agentTwoName == player.agentName) this.playerTwoStateRound.push(player.states[stateLength])

        //return the state action
        return actions
    }


    stateSearch(player, cardPlayed, cardAtHand,  noOfCardsWithOpponent, availableMove, inPlayCards, noOfCardsInMarket, rules){
        
        //+---------------------------------------------------------------------------+
        //|  This method search for existing states within an angent and returns      |
        //|  it's action value if no state is found it returns the stateCreater       |
        //|  method                                                                   |
        //+---------------------------------------------------------------------------+

            let states = player.states
            for(let i = 0; i < states.length; i++){


                let condition = this.compareArray(states[i].cardAtHand, cardAtHand)           && 
                                this.compareArray(states[i].cardPlayed, cardPlayed)           && 
                                this.compareArray(states[i].availableMove, availableMove)     &&
                                states[i].cardInPlay === inPlayCards                          &&
                                states[i].noOfCardsInMarket === noOfCardsInMarket             &&
                                states[i].noOfCardsWithOpponent === noOfCardsWithOpponent           



                if(condition){ 

                    //add to state
                    if(this.agentOneName == player.agentName) this.playerOneStateRound.push(states[i])
                    if(this.agentTwoName == player.agentName) this.playerTwoStateRound.push(states[i])

                    //return the action of the selected state
                    return states[i].actions
                }
            }

        //create a new state if a state doesn't exist and return it's actions
        return this.stateCreater(this.player, cardPlayed, cardAtHand, noOfCardsWithOpponent, availableMove, inPlayCards, noOfCardsInMarket, rules)
              
    }


    actionCreater(availableMove, playerStates){

        //+---------------------------------------------------------------------------+
        //|  This method initialise actions for newly created states                  |
        //+---------------------------------------------------------------------------+

        let output = []

        //set inital values of zeros for output
        for(let i = 0; i < availableMove.length; i++){
            output.push(0)
        }

        for(let i = 0; i < playerStates.length; i++){
            if(this.compareArray(availableMove, playerStates[i].availableMove)){

                //get an aggregated sum of similar actions
                output = this.sumArray(output, playerStates[i].actions)

            }
        }

        //return arithmentic mean of all the state action
        return this.multiplyArray(output, (1/output.length))
    }

    sumArray(array1, array2){

        //+---------------------------------------------------------+
        //|    This method adds two arrays and return the sum       |
        //+---------------------------------------------------------+

        let result = []

        for(let i = 0; i < array1.length; i++){
            result.push(array1[i] + array2[i])
        }

        return result
    }

    multiplyArray(array, num){

        //+---------------------------------------------------------+
        //|    This method multiply an array with a scaler value    |
        //|    it receive an array as the first argument and the    |
        //|    scalar value as the second                           |
        //+---------------------------------------------------------+

        let result = []

        for(let i = 0; i < array.length; i++){
            result.push(array[i] * num)
        }

        return result
    }

    compareArray(array1, array2){

        //+---------------------------------------------------------+
        //|    This method compares two one dimensional arrays      |
        //|    and return true if they are thesame else false       |
        //|    it takes an arrays as the first and second argument  |                            |
        //+---------------------------------------------------------+

        if(array1.length == array2.length){

            for(let i = 0; i < array1.length; i++){

                if(array1[i] != array2[i]){
                    return false;
                }

            }

        }else{
            return false
        }

        return true

    }



}

module.exports = GameEngine