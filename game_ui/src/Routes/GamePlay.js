/*
 * Copyright (C) 2021 Joshua Evuetapha
 * Twitter : @evuetaphajoshua
 * Github : @Joshuajee
 * This program is distributed under the MIT license
 */


import React from "react"
import axios from "axios"

import {canPlay, checkPlayResponse, createState,
        referee, goMarket, checkGameState, 
        checkGameChanges, availableMove, cardIndex} from  "../GameLogic/logics"

import InPlay  from "../Componets/CardHolder/InPlay";
import Market from "../Componets/CardHolder/Market";
import Player from "../Componets/CardHolder/Player";

import Need from "../Componets/CardHolder/Need"
import Loader from "../Componets/Loader"
import Modal from "../Componets/Modal"

import {EventEmitter} from "events"


var cardPlayedCards = [0]
var marketCards = [0]

let rules = {"holdOn":{"active":true, "card":1, "defend":false},
            "pickTwo":{"active":true, "card":2, "defend":false},
            "pickThree":{"active":true, "card":5, "defend":false}, 
            "suspension":{"active":true, "card":8, "defend":false},
            "generalMarket":{"active":true, "card":14, "defend":false}
        } 

class GamePlay extends React.Component{


    constructor(){

        super()

        this.state = {
            isLoading:true,
            opponetIsPlaying:false,
            isNeeded:false,
            gameState:{"playerOne":{
                            "cardAtHand":[""],
                            "name":""
                        },
                        "playerTwo":{
                            "cardAtHand":[""],
                            "name":""
                        },
                    "market":[""],
                    "cardPlayed":[],
                    rules: rules
            },
            playerOneCardIndex : 0,
            playerTwoCardIndex : 0,
            change : true,
            playerOneStates : [],
            playerTwoStates : [],
            visibility : "hide-modal",   
        }


         
        this.playCard = this.playCard.bind(this)
        this.needed = this.needed.bind(this)

        this.events = new EventEmitter()

        this.events.on("play", ()=>{

            this.setState({ change : this.state.change ? false : true })
  
        })

        this.events.on("play-end", ()=>{

            this.setState({ opponetIsPlaying : false })
            
        })

    }

    componentDidMount(){

        let url = window.location.href 
  
        let index = url.indexOf("/:") + 2
        let user = url.slice(index, url.length)

        axios.post("/api/game", {"agentName":user, "user":"Guest", rules:rules}).then((res)=>{
            
            console.log(res)  

            this.setState({isLoading:false, opponetIsPlaying:false, gameState:res.data})

        })

    }


    close(close){

        //alert(this.state.visibility)
        //this.setState({visibility : "hide-modal" })
        //this.setState({isNeeded : false, isLoading : true})
    }

    needed(card){

        let availableMoves = availableMove(this.state.gameState.playerOne.cardAtHand, this.state.gameState.cardPlayed[this.state.gameState.cardPlayed.length - 1])

        this.state.playerOneStates.push(createState(this.state.gameState, availableMoves, true))

        card.push(cardIndex(availableMoves, card[0]))

        this.setState({isNeeded : false, isLoading : true, opponetIsPlaying : true})
 
        let request = {"gameState":this.state.gameState, "playerMove":card, rules:rules}
    
        let index = this.state.gameState.playerOne.cardAtHand.indexOf("whot:20")
        this.state.gameState.playerOne.cardAtHand.splice(index, 1)
        this.state.gameState.cardPlayed.push(card[0])

        axios.post("/api/play", request).then((res)=>{
            
            let response = res.data

        
            //check the type of response gotten from server
            checkPlayResponse(response, this.state.gameState, this.events, this.state.playerTwoStates)

            //remove loader from screen and transfer game control to player
            this.setState({opponetIsPlaying : false, isLoading : false })
    
        }).catch((error) =>{

            //remove the last card played
            this.state.gameState.cardPlayed.pop()

            //return whot back to player
            this.state.gameState.playerOne.cardAtHand.push("whot:20")

            //remove loader from the screen and transfer game control back to player
            this.setState({isLoading : false, opponetIsPlaying : false, visibility : "show-modal"})


            alert(error)

        })

    }

    playCard(card) {

        
        let availableMoves = availableMove(this.state.gameState.playerOne.cardAtHand, this.state.gameState.cardPlayed[this.state.gameState.cardPlayed.length - 1])

        card.push(cardIndex(availableMoves, card[0]))

        this.state.playerOneStates.push(createState(this.state.gameState, availableMoves, true))

        this.setState({ isLoading : true })

        console.log("State 1")

        console.log(this.state.playerOneStates)

        console.log("State 2")

        console.log(this.state.playerTwoStates)

        if(card[0] === "z:goMarket"){

            this.setState({opponetIsPlaying : true})

            goMarket(this.state.gameState.playerOne.cardAtHand, this.state.gameState.market)

            this.setState({opponetIsPlaying:false, isLoading:true})

            let request = {"gameState":this.state.gameState, "playerMove":"z:goMarket", rules:rules}
        
            axios.post("/api/play", request).then((res)=>{
                
                let response = res.data

                //remove loader from screen and transfer game control back to opponent
                this.setState({isLoading : false, opponetIsPlaying : true})

                //check the type of response gotten from server
                checkPlayResponse(response, this.state.gameState, this.events, this.state.playerTwoStates)
                
            }).catch((error) =>{

                //add card taken from market to player back to market
                this.state.gameState.market.push(this.state.gameState.playerOne.cardAtHand[this.state.gameState.playerOne.cardAtHand.length - 1])

                //remove the card taken from market from player
                this.state.gameState.playerOne.cardAtHand.pop()
                
                //undo last state
                this.state.playerOneStates.pop()

                //remove loader from the screen and transfer game control back to player
                this.setState({isLoading : false, opponetIsPlaying : false, visibility : "show-modal"})

                alert(error)

            })

        }else{

    
            let playGame = canPlay(card[0], this.state.gameState.cardPlayed[this.state.gameState.cardPlayed.length - 1])

            this.setState({isNeeded : playGame[1]})

            if(playGame[0]){

                if(playGame[1]){

                    this.setState({isNeeded : true, isLoading : false})

                    //remove last state
                    this.state.playerOneStates.pop()

                }else{
                    
                    let sendMove = referee(card, rules, this.state.gameState.playerOne.cardAtHand, this.state.gameState.playerTwo.cardAtHand, this.state.gameState.cardPlayed, this.state.gameState.market)
                   
                    let request = {"gameState":this.state.gameState, "playerMove":card[0], rules:rules}
                    
                    if(sendMove){

                        axios.post("/api/play", request).then((res)=>{
                            
                            let response = res.data

                            //remove loader from screen and transfer game control back to opponent
                            this.setState({isLoading : false, opponetIsPlaying : true})

                            //handle response gotten from server 
                            checkPlayResponse(response, this.state.gameState, this.events, this.state.playerTwoStates)
     
                        }).catch((error) =>{

                            //add card taken from player back to player
                            this.state.gameState.playerOne.cardAtHand.push(card[0])

                            //undo last game played
                            this.state.gameState.cardPlayed.pop()

                            //undo last state update
                            this.state.playerOneStates.pop()

                            //remove loader and transfer game control back to player
                            this.setState({isLoading : false, opponetIsPlaying : false, visibility : "show-modal"})

                            alert(error)

                        })

                    }else{

                        this.setState({isLoading:false})

                    }

                }
            
            }else{

                this.setState({isLoading : false})

                alert("illegal move")
    
            }

        }
        
      
    }

    render(){

        checkGameState(this.state.gameState)

        let height = window.innerHeight

        if(this.state.isLoading) return(<center id="game-table"  className="game-table"><Loader /> </center>)

        let playerCard = this.state.gameState.playerOne.cardAtHand

        let opponetCard = this.state.gameState.playerTwo.cardAtHand

        let inPlay = this.state.gameState.cardPlayed[this.state.gameState.cardPlayed.length - 1]

        let gameObjects = null 

        let checkChanges = checkGameChanges(this.state.gameState, cardPlayedCards, marketCards)

        if(checkChanges){

            gameObjects = <div>
                                <Player top={0.2} angle={180} cards={opponetCard} action={this.playCard}    playable={false} index={this.state.playerTwoCardIndex} />
                                <Player top={0.8} angle={0} cards={playerCard} action={this.playCard} playable={!this.state.opponetIsPlaying} index={this.state.playerOneCardIndex}/>
                                <InPlay className="center" cards={inPlay} cardNumber={this.state.gameState.cardPlayed.length}/>
                                <Market action={this.playCard} playable={!this.state.opponetIsPlaying} cardNumber={this.state.gameState.market.length} />
                            </div>

        }

        if(this.state.isNeeded){
            gameObjects = <Need  height = {height} need={this.needed}/> 
        }

        console.log("states")

        console.log(this.state.gameState)

        return(
            <div>
            {
            //    <Modal text={"Network Error"} close={this.close} visibility={this.state.visibility} />
            }
                <center id="game-table"  className="game-table">

                    {gameObjects}

                </center>

            </div>
    
            )

    }

}

export default GamePlay