/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2021 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */



const { EventEmitter } = require("events");
const Agents = require("../models/agents");
const States = require("../models/states");


class GameEngine extends EventEmitter{

    constructor(playerOneName, playerTwoName, rules, agents, currentPlayerIndex, currentOpponentIndex, gameEvents){
        
        super();

        this.playerOneName = playerOneName;
        this.playerTwoName = playerTwoName;

        this.agentOne = agents[0];
        this.agentTwo = agents[1];

        this.currentAgentIndex = currentPlayerIndex;
        this.currentOpponentIndex = currentOpponentIndex;

        this.rules = rules;
        this.gameEvents = gameEvents;

        this.action = [];
            
        this.playerOneStateRoundOld = [];
        this.playerTwoStateRoundOld = [];

        this.playerOneStateRoundNew = [];
        this.playerTwoStateRoundNew = [];

        this.playerOnePoints = 0;
        this.playerTwoPoints = 0;

        this.round = 1;

        this.user = undefined;
        this.agent = undefined;
        
        super.on("actionOutput", () => {

            const state = {
                agentId: this.agent,
                userId: this.user,
                availableMove: [...this.availableMove],
                actions: [...this.actionOutput]
            };

            this.action = [true, ...this.actionOutput]

            //add this state to the right player
            if(this.playerName === playerOneName)
                this.playerOneStateRoundNew.push(state);
            else
                this.playerTwoStateRoundNew.push(state);
           
            super.emit(this.eventString);

        })

        super.on("action", () => {

            console.log(this.agents)

            /*
            for(let i = 0; i < this.states.length; i++){

                //get an aggregated sum of similar actions
                this.output = this.sumArray(this.output, this.states[i].actions)
            
            }
            */
            
            /*
            //get arithmentic mean of all the state action
            if(this.states.length > 0){

                this.actionOutput = this.multiplyArray(this.output, (1/this.states.length))
           
            }else{

                this.actionOutput = this.output
            
            }

            */

            this.actionOutput = this.output
            
            super.emit("actionOutput")

        })
    
    }

    /**
     * getter for the current round
     */
    get roundVal(){
        return this.round
    }

    /**
     * getter for the last action taken
     */
    get getAction(){
        return this.action
    }

    async updateAgentWithNewStates() {
        //save the new states for players
        console.log([...this.playerOneStateRoundNew, ...this.playerTwoStateRoundNew])
        await States.insertMany([...this.playerOneStateRoundNew, ...this.playerTwoStateRoundNew ]);
    }

    /**
     * This method sum the actions of different states
     * @param {*} states array of state objects
     * @param {*} agent object defining object
     * @returns states with summed actions without duplicate 
     */
    moderateState(states, agent){

        let result = []

        states.forEach(state => {

            let currentState = []

            if(this.filterState(result, state, agent).length === 0){

                this.filterState(states, state, agent).forEach(element =>{
                    currentState.push(element)
                }) 

                if(currentState.length > 1){

                    let action = []

                    for(let i = 0; i < currentState.length - 1; i++){

                        if(i === 0)
                            action = this.sumArray(currentState[i].actions, currentState[i + 1].actions)
                        else
                            action = this.sumArray(action, currentState[i + 1].actions)

                    }

                    currentState[0].actions = action

                    result.push(currentState[0])

                } else { 

                    result.push(currentState[0])

                }

            }

        })

        return result

    }

    async updateAgentWithOldStates(playerRound){

        //save the new states for player one
        playerRound.forEach(async state => {

            await States.updateOne(state);

        })

    }

    /**
     * Update existing states
     * @param {*} winnerName name of winner
     * @param {*} losserName name of loser
     * @param {*} winnerPoints points to be added to winner
     * @param {*} losserPoints points to be substracted from loser
     */
    async updatePlayer(winnerName, losserName, winnerPoints, losserPoints) {

        const winnerUpdate = { 
            $inc: { 
                wins: 1, 
                points: winnerPoints,
                botWins: 1, 
                botPoints: winnerPoints 
            }
        };

        const losserUpdate = { 
            $inc: { 
                losses: 1, 
                points: losserPoints,
                botLosses: 1, 
                botPoints: losserPoints
            }
        };

        await Agents.updateOne({agentName: winnerName}, winnerUpdate);

        await Agents.updateOne({agentName: losserName}, losserUpdate);

               
        this.gameEvents.emit("new");

    }

    /**
     * 
     * @param {*} point points to reward player with
     * @param {*} statesOld states that already exists in database
     * @param {*} statesNew states that are newly created
     * @param {*} actionsOld 2d array of actions of old states
     * @param {*} actionsNew 2d array actions of new states
     */
    addReward(point, statesOld, statesNew, actionsOld, actionsNew, learningRate){

        statesOld = [...statesOld]
        statesNew  = [...statesNew]
        actionsOld = [...actionsOld]
        actionsNew = [...actionsNew]


        for(let i = 0; i < statesNew.length; i++){

            statesNew[i].actions[actionsNew[i][1]] = this.learn(statesNew[i].actions[actionsNew[i][1]], point, learningRate)

        }


        for(let i = 0; i < statesOld.length; i++){

            statesOld[i].actions[actionsOld[i][1]] = this.learn(statesOld[i].actions[actionsOld[i][1]], point, learningRate)

        }

    }


    /**
     * This method is called when the game ends it reward the agents according 
     * to the reward policy   
     * @param {*} playerOneName agent one name
     * @param {*} playerTwoName agent two name
     * @param {*} playerOneCardAtHand player one card at hand
     * @param {*} playerTwoCardAtHand player two card at hand
     * @param {*} playerOneActionsNew actions of player one that are new
     * @param {*} playerOneActionsOld actions of player one that are gotten from database
     * @param {*} playerTwoActionsNew actions of player two that are new
     * @param {*} playerTwoActionsOld actions of player two that are gotten from database
     */
    async rewards(playerOneName, playerTwoName, playerOneCardAtHand, playerTwoCardAtHand, playerOneActionsNew, playerOneActionsOld, playerTwoActionsNew, playerTwoActionsOld, human = null){

        this.round++;

        if(human !== null){
            this.playerOneStateRoundNew = human.playerOneStateNew;
            this.playerOneStateRoundOld = human.playerOneStateOld;
            this.playerTwoStateRoundNew = human.playerTwoStateNew;
            this.playerTwoStateRoundOld = human.playerTwoStateOld;
        }
        
        let playerOneNumber = 0;
        let playerTwoNumber = 0;

        const playerOneStates = await States;//(playerOneName);
        const playerTwoStates = await States;//(playerTwoName);

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

        if(playerOneNumber !== 0 || playerTwoNumber !== 0){

            //penalise both agent
            if(this.playerOneNumber < this.playerTwoNumber){

                // rewards when player one has fewer card number than player two
                this.addReward(
                    5 - 1 * playerOneNumber / 100, 
                    this.playerOneStateRoundOld, 
                    this.playerOneStateRoundNew, 
                    playerOneActionsOld, 
                    playerOneActionsNew,
                    this.agentOne.learningRate
                    )

                this.addReward(
                    -1 * playerTwoNumber / 100, 
                    this.playerTwoStateRoundOld, 
                    this.playerTwoStateRoundNew, 
                    playerTwoActionsOld, 
                    playerTwoActionsNew,
                    this.agentTwo.learningRate
                    )

                this.playerOnePoints += 5 - 1 * playerOneNumber / 100
                this.playerTwoPoints += -1 * playerTwoNumber / 100

            }else if(this.playerOneNumber > this.playerTwoNumber){

                // rewards when player two has fewer card number than player one
                this.addReward(
                    -1 * playerOneNumber / 100, 
                    this.playerOneStateRoundOld, 
                    this.playerOneStateRoundNew, 
                    playerOneActionsOld, 
                    playerOneActionsNew,
                    this.agentOne.learningRate
                    )

                this.addReward(
                    5 - 1 * playerTwoNumber / 100, 
                    this.playerTwoStateRoundOld, 
                    this.playerTwoStateRoundNew, 
                    playerTwoActionsOld, 
                    playerTwoActionsNew,
                    this.agentTwo.learningRate)

                this.playerOnePoints += -1 * playerOneNumber / 100
                this.playerTwoPoints += 5 -1 * playerTwoNumber / 100

            }else{

                //rewards when player two has same card number as player one
                this.addReward(
                    -1 * playerOneNumber / 100, 
                    this.playerOneStateRoundOld, 
                    this.playerOneStateRoundNew, 
                    playerOneActionsOld, 
                    playerOneActionsNew,
                    this.agentOne.learningRate
                    )

                this.addReward(
                    -1 * playerTwoNumber / 100, 
                    this.playerTwoStateRoundOld, 
                    this.playerTwoStateRoundNew, 
                    playerTwoActionsOld, 
                    playerTwoActionsNew,
                    this.agentTwo.learningRate
                    )

                this.playerOnePoints += -1 * playerOneNumber / 100
                this.playerTwoPoints += -1 * playerTwoNumber / 100

            }
        
        }

        if(playerOneNumber === 0){

            console.log("Player One Win")
            
            //reward player one
            this.addReward(
                5, 
                this.playerOneStateRoundOld, 
                this.playerOneStateRoundNew, 
                playerOneActionsOld, 
                playerOneActionsNew,
                this.agentOne.learningRate
                )
           
            //penalise player two
            this.addReward(
                -2 - 1 * playerTwoNumber / 10, 
                this.playerTwoStateRoundOld, 
                this.playerTwoStateRoundNew, 
                playerTwoActionsOld, 
                playerTwoActionsNew,
                this.agentTwo.learningRate
                )

            this.updatePlayer(playerOneName, playerTwoName, 5, -2 - 1 * playerTwoNumber / 10)

        }else if(playerTwoNumber === 0){

            console.log("Player Two Win")
            //penalise player one
            this.addReward(
                -2 - 1 * playerOneNumber / 10, 
                this.playerOneStateRoundOld, 
                this.playerOneStateRoundNew, 
                playerOneActionsOld, 
                playerOneActionsNew,
                this.agentOne.learningRate)
            //reward player two
            this.addReward(
                5, 
                this.playerTwoStateRoundOld, 
                this.playerTwoStateRoundNew, 
                playerTwoActionsOld, 
                playerTwoActionsNew,
                this.agentTwo.learningRate)
            
            this.updatePlayer(playerTwoName, playerOneName, 5, -2 - 1 * playerOneNumber / 10)

        }

        if(this.playerOneStateRoundOld.length > 0){

            // remove duplicate states
            this.playerOneStateRoundOld = this.moderateState(this.playerOneStateRoundOld, this.agentOne)
            
            //await this.updateAgentWithOldStates(this.playerOneStateRoundOld)
        }

        if(this.playerTwoStateRoundOld.length > 0){

            // remove duplicate states
            this.playerTwoStateRoundOld = this.moderateState(this.playerTwoStateRoundOld, this.agentTwo)
            
            //await this.updateAgentWithOldStates(this.playerTwoStateRoundOld)
        }

    
        // remove duplicate states
        this.playerOneStateRoundNew = this.moderateState(this.playerOneStateRoundNew, this.agentOne)
        this.playerTwoStateRoundNew = this.moderateState(this.playerTwoStateRoundNew, this.agentTwo)

        //save new states
        await this.updateAgentWithNewStates();

        //empty the StateRound array after one round
        this.playerOneStateRoundNew = []
        this.playerOneStateRoundOld = []

        this.playerTwoStateRoundNew = []
        this.playerTwoStateRoundOld = []

        playerOneActionsNew = []
        playerOneActionsOld = []
        playerTwoActionsNew = []
        playerTwoActionsOld = []
    }
    
    /**
     * This method search for matching states in the database
     * @param {*} playerName name of current agent
     * @param {*} cardPlayed last card played
     * @param {*} cardAtHand array of cards of current agent
     * @param {*} noOfCardsWithOpponent number of cards with opponent
     * @param {*} availableMove array moves that the player can make
     * @param {*} inPlayCards array of cards played
     * @param {*} noOfCardsInMarket number of cards in market 
     * @param {*} rules game rules
     * @param {*} eventString name of events
     */
    async stateFinder(playerName, cardPlayed, cardAtHand,  noOfCardsWithOpponent, availableMove, inPlayCards, noOfCardsInMarket, rules, eventString="received"){

        this.playerName = playerName

        let agent = null

        if(playerName == this.agentOne.agentName) {
            agent = this.agentOne;
        } else {
            agent = this.agentTwo;
        }

        this.agent = agent;

        //make sure action array is empty for every play
        this.action = []
                
        const query = {
            agentId: this.agent?._id,
            availableMove: availableMove,
        }
        
        if(agent.useCardAtHand)
            query.cardAtHand = cardAtHand
        if(agent.useNoOfCardAtHand)
            query.noOfCardAtHand = cardAtHand.length
        if(agent.useCardInPlay)
            query.cardInPlay = cardPlayed[cardPlayed.length - 1]
        if(agent.useCardPlayed)
            query.cardPlayed = cardPlayed
        if(agent.useNoOfCardPlayed)
            query.noOfCardPlayed = cardPlayed.length
        if(agent.useNoOfCardsInMarket)
            query.noOfCardsInMarket = noOfCardsInMarket
        if(agent.useNoOfCardsWithOpponent)
            query.noOfCardsWithOpponent = noOfCardsWithOpponent
        if(agent.useRules)
            query.rules = rules


        const state = await States.findOne(query);


        if(!state) {

            await this.stateCreater(playerName, cardPlayed, cardAtHand,  noOfCardsWithOpponent, availableMove, inPlayCards, noOfCardsInMarket, rules, eventString, agent)
                
        }   else    {
            
            this.action = [false, state.actions]

            console.log(this.action)
                
            if(playerName === this.playerOneName)
                this.playerOneStateRoundOld.push(state)
            else
                this.playerTwoStateRoundOld.push(state)
            
            super.emit(eventString)

        }

    }



    /**
     * This method creates a state and save it to an angent in the database 
     * it also save it to the correspondingn state array 
     * @param {*} playerName name of current agent
     * @param {*} cardPlayed last card played
     * @param {*} cardAtHand array of cards of current agent
     * @param {*} noOfCardsWithOpponent number of cards with opponent
     * @param {*} availableMove array moves that the player can make
     * @param {*} inPlayCards array of cards played
     * @param {*} noOfCardsInMarket number of cards in market 
     * @param {*} rules game rules
     * @param {*} eventString name of events
     */

    async stateCreater(playerName, cardPlayed, cardAtHand, noOfCardsWithOpponent, availableMove, inPlayCards, noOfCardsInMarket, rules, eventString, agent){
        
        this.cardAtHand = cardAtHand
        this.noOfCardsWithOpponent = noOfCardsWithOpponent
        this.inPlayCards = inPlayCards
        this.cardPlayed = cardPlayed
        this.noOfCardsInMarket = noOfCardsInMarket
        this.availableMove = availableMove
        this.rules = rules
        this.eventString = eventString

        this.output = []
        
        //set inital values of zeros for output
        for(let i = 0; i < availableMove.length; i++){
            this.output.push(0)
        }


        const state = {
            agentId: this.agent,
            userId: this.user,
            availableMove:   [...this.availableMove],
            actions:   [...this.output],
        }

        
        if(agent.useCardAtHand)
            state.cardAtHand = cardAtHand
        if(agent.useNoOfCardAtHand)
            state.noOfCardAtHand = cardAtHand.length
        if(agent.useCardInPlay)
            state.cardInPlay = cardPlayed[cardPlayed.length - 1]
        if(agent.useCardPlayed)
            state.cardPlayed = cardPlayed
        if(agent.useNoOfCardPlayed)
            state.noOfCardPlayed = cardPlayed.length
        if(agent.useNoOfCardsInMarket)
            state.noOfCardsInMarket = noOfCardsInMarket
        if(agent.useNoOfCardsWithOpponent)
            state.noOfCardsWithOpponent = noOfCardsWithOpponent
        if(agent.useRules)
            state.rules = rules

        this.action = [true, this.output]
                
        if(playerName === this.playerOneName)
            this.playerOneStateRoundNew.push(state)
        else
            this.playerTwoStateRoundNew.push(state)
            
        super.emit(eventString)
        
    }

    /**
     * This method initialise actions for newly created states 
     * @deprecated not used
     * @param {*} availableMove array of moves for playing agent
     * @param {*} playerName name of playing agent
     */
    actionCreater(availableMove, playerName){
        
        const query = { availableMove: availableMove };
        
        this.output = [];
        
        //set inital values of zeros for output
        for(let i = 0; i < availableMove.length; i++){
            this.output.push(0);
        }

        this.states = [];

        const playerStates = States(playerName)

        //find state with similar cars and moves
        playerStates.find(query, (error, data) =>{

            this.states = data

            if(error) console.log("error: " + error)
                       
            super.emit('action')

        })
        
    }

    /**
     * This method adds the elements two arrays and return the sum
     * @param {*} array1 first array
     * @param {*} array2 second array
     * @returns  sum of array
     */
    sumArray(array1, array2){

        let result = []

        for(let i = 0; i < array1.length; i++){
            result.push(array1[i] + array2[i])
        }

        return result
    }

    /**
     * This method multiply an array with a scaler value
     * @param {*} array array to be multiplied
     * @param {*} num number to multiply array with
     * @returns array of results
     */
    multiplyArray(array, num){

        let result = []

        for(let i = 0; i < array.length; i++){
            result.push(array[i] * num)
        }

        return result
    }

    findState(states, state) {

        //+---------------------------------------------------------------------------+
        //|    This method receives two arguments states and state, and uses the      |
        //|    state object to search the states array return the state object        |
        //|    if found                                                               |
        //+---------------------------------------------------------------------------+

        return states.find(function(el) {

            let cardAtHand = true
            let noOfCardAtHand = true
            let cardInPlay = true
            let cardPlayed = true
            let noOfCardsInMarket = true
            let noOfCardsWithOpponent = true
            let noOfCardPlayed = true
            let rules = true

            if(agent.useCardAtHand)
                cardAtHand = compareArray(el.cardAtHand, state.cardAtHand)

            if(agent.useNoOfCardAtHand)
                noOfCardAtHand = el.noOfCardAtHand == state.noOfCardAtHand
    
            if(agent.useCardInPlay)
                cardInPlay = el.cardInPlay == state.cardInPlay 

            if(agent.useCardPlayed)
                cardPlayed = compareArray(el.cardPlayed, state.cardPlayed)

            if(agent.useNoOfCardPlayed)
                noOfCardPlayed = el.noOfCardPlayed == state.noOfCardPlayed

            if(agent.useNoOfCardsInMarket)
                noOfCardsInMarket = el.noOfCardsInMarket == state.noOfCardsInMarket

            if(agent.useNoOfCardsWithOpponent)
                noOfCardsWithOpponent = el.noOfCardsWithOpponent == state.noOfCardsWithOpponent

            if(agent.useRules)
                rules = el.rules == state.rules

  
            let condition = compareArray(el.availableMove, state.availableMove) && cardAtHand && noOfCardAtHand && rules
                            && cardInPlay && cardPlayed && noOfCardPlayed && noOfCardsInMarket && noOfCardsWithOpponent
 
            return condition

        })

    }


    /**
     * This method give the 
     * @param {*} prevAction 
     * @param {*} currAction 
     * @param {*} learningRate 
     * @param {*} discountRate 
     * @returns 
     */
    learn(prevAction, currAction, learningRate = 0.01, discountRate = 1){

        const maxReward = 100
        
        return prevAction + learningRate * (currAction + discountRate * maxReward - prevAction)

    }

    /**
     * This uses the state object to search the states
     * @param {*} states array of states object
     * @param {*} state state object
     * @returns array of filtered state that matched the conditions
     */
    filterState(states, state, agent) {

        return states.filter(function(el) {

            let cardAtHand = true
            let noOfCardAtHand = true
            let cardInPlay = true
            let cardPlayed = true
            let noOfCardsInMarket = true
            let noOfCardsWithOpponent = true
            let noOfCardPlayed = true
            let rules = true

            if(agent.useCardAtHand)
                cardAtHand = compareArray(el.cardAtHand, state.cardAtHand)

            if(agent.useNoOfCardAtHand)
                noOfCardAtHand = el.noOfCardAtHand == state.noOfCardAtHand
    
            if(agent.useCardInPlay)
                cardInPlay = el.cardInPlay == state.cardInPlay 

            if(agent.useCardPlayed)
                cardPlayed = compareArray(el.cardPlayed, state.cardPlayed)

            if(agent.useNoOfCardPlayed)
                noOfCardPlayed = el.noOfCardPlayed == state.noOfCardPlayed

            if(agent.useNoOfCardsInMarket)
                noOfCardsInMarket = el.noOfCardsInMarket == state.noOfCardsInMarket

            if(agent.useNoOfCardsWithOpponent)
                noOfCardsWithOpponent = el.noOfCardsWithOpponent == state.noOfCardsWithOpponent

            if(agent.useRules)
                rules = el.rules == state.rules

  
            let condition = compareArray(el.availableMove, state.availableMove) && cardAtHand && noOfCardAtHand && rules
                            && cardInPlay && cardPlayed && noOfCardPlayed && noOfCardsInMarket && noOfCardsWithOpponent
 
            return condition
        
        })

    }

}


/**
 * This function compares two one dimensional arrays and return true if  
 * they are thesame else false it takes an arrays as the first and      
 * second argument  
 *  
 * @param {*} array1 array of items
 * @param {*} array2 array of items
 * @returns boolean true or false
 */

function compareArray(array1, array2){

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

module.exports = GameEngine