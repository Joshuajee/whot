/*
 * Copyright (C) 2021 Joshua Evuetapha
 * Twitter : @evuetaphajoshua
 * Github : @Joshuajee
 * This program is distributed under the MIT license
 */


import React from "react"
import axios from "axios"

import {canPlay, checkPlayResponse, referee, goMarket} from  "../GameLogic/logics"

import InPlay  from "../Componets/CardHolder/InPlay";
import Market from "../Componets/CardHolder/Market";
import Player from "../Componets/CardHolder/Player";

import Need from "../Componets/Need"




let rules = {"holdOn":{"active":true, "card":1, "defend":false},
            "pickTwo":{"active":true, "card":2, "defend":false},
            "pickThree":{"active":true, "card":5, "defend":false}, 
            "suspension":{"active":true, "card":8, "defend":false},
            "generalMarket":{"active":true, "card":14, "defend":false}
        } 

class GamePlay extends React.Component{


    constructor(){

        super()

        //for Agent

        this.state = {
            isLoading:true,
            opponetIsPlaying:true,
            gameState:null,
            isNeeded:false,
            needActive:false, 
            neededCard: ""
        }

         
        this.playCard = this.playCard.bind(this)
        this.needed = this.needed.bind(this)

    }

    componentDidMount(){

        let url = window.location.href 
  
        let index = url.indexOf("/:") + 2
        let user = url.slice(index, url.length)

        axios.post("/api/game", {"agentName":user, "user":"Guest", rule:rules}).then((res)=>{
            console.log(res)  

            this.setState({
                isLoading:false,
                opponetIsPlaying:false,
                gameState:res.data
            })

        })

        

    }

    needed(card){

        this.setState({
            isNeeded:false
        })


        let request = {"gameState":this.state.gameState, "playerMove":"whot:20", "need":true, neededCard:card, rules:rules}
    
            axios.post("/api/play", request).then((res)=>{
                
                console.log(res.data) 
                
                if(res.data[0][0] !== "z:goMarket"){

                    this.setState({
                        needActive:false,
                        neededCard : card
                    })

                }

                let response = res.data

                let index = this.state.gameState.playerOne.cardAtHand.indexOf("whot:20")
                this.state.gameState.playerOne.cardAtHand.splice(index, 1)
                this.state.gameState.cardPlayed.push("whot:20")
            
                //check the type of response gotten from server
                checkPlayResponse(response, rules, this.state.gameState.playerTwo.cardAtHand, this.state.gameState.playerOne.cardAtHand, this.state.gameState.cardPlayed, this.needActive, this.state.gameState.market)

                this.setState({
                    opponetIsPlaying:false
                })
        
            })

    }

    playCard(card) {

        if(card === "z:goMarket"){

            this.setState({
                opponetIsPlaying:true
            })

            goMarket(this.state.gameState.playerOne.cardAtHand, this.state.gameState.market)

            this.setState({
                opponetIsPlaying:false
            })

        }else{

    
            let playGame = canPlay(card[0], this.state.gameState.cardPlayed[this.state.gameState.cardPlayed.length - 1], this.state.needActive)

            this.setState({
                isNeeded : playGame[1],
                needActive : playGame[1]
            })

            if(playGame[0] && playGame[1]){

                this.setState({
                    isNeeded : true,
                    needActive : true
                })

            }else if(playGame[0]){

                this.setState({
                    opponetIsPlaying:true
                })

                alert(card)
                
                
                let request = {"gameState":this.state.gameState, "playerMove":card[0], "need":playGame[1], rules:rules}
        
                axios.post("/api/play", request).then((res)=>{
                    
                    let response = res.data
                    
                    referee(card, rules, this.state.gameState.playerOne.cardAtHand, this.state.gameState.playerTwo.cardAtHand, this.state.gameState.cardPlayed, this.state.gameState.market)


                    //check the type of response gotten from server
                    checkPlayResponse(response, rules, this.state.gameState.playerTwo.cardAtHand, this.state.gameState.playerOne.cardAtHand, this.state.gameState.cardPlayed, this.needActive, this.state.gameState.market)

                    this.setState({
                        opponetIsPlaying:false
                    })
                    
                })
            
            }else{

                alert("illegal move")
    
            }

        }
        
      
    }

    render(){

        let height = window.innerHeight

        const style = {height: height * 0.9}


        if(this.state.isLoading) return(<div>Loading</div>)

        let playerCard = this.state.gameState.playerOne.cardAtHand

        let opponetCard = this.state.gameState.playerTwo.cardAtHand

        let inPlay = this.state.gameState.cardPlayed[this.state.gameState.cardPlayed.length - 1]

        var gameObjects = null

        if(this.state.opponetIsPlaying){

            gameObjects = <div>
                            <Player top={0.2} angle={180} cards={opponetCard} action={this.playCard} />
                            <Player top={0.8} angle={0} cards={playerCard} action={this.playCard}  />
                            <InPlay className="center" cards={inPlay} />
                            <Market action={this.playCard} />
                          </div>
       
        }else{
            
            gameObjects = <div>
                                <Player top={0.2} angle={180} cards={opponetCard} action={this.playCard} />
                                <Player top={0.8} angle={0} cards={playerCard} action={this.playCard}  />
                                <InPlay className="center" cards={inPlay}/>
                                <Market action={this.playCard} />
                           </div>
       
        }

        if(this.state.isNeeded){

            gameObjects = <Need  height = {height} need={this.needed}/> 

        }else{

            gameObjects = <div>
                                <Player top={0.2} angle={180} cards={opponetCard} action={this.playCard} />
                                <Player top={0.8} angle={0} cards={playerCard} action={this.playCard}  />
                                <InPlay className="center" cards={inPlay}/>
                                <Market action={this.playCard} />
                          </div>
        }


        return(<div>
                
                <center id="game-table" style={style} className="game-table">
                    {gameObjects}
                </center>
            </div>
            )

    }

}

export default GamePlay