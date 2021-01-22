import React from "react"
import axios from "axios"

import {canPlay} from  "../GameLogic/logics"

import InPlay  from "../Componets/CardHolder/InPlay";
import Market from "../Componets/CardHolder/Market";
import Player from "../Componets/CardHolder/Player";



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
            gameState:null
        }

        this.playCard = this.playCard.bind(this)

    }

    componentDidMount(){

        

        axios.post("/api/game", {"agentName":"Jee", "user":"Guest", rule:rules}).then((res)=>{
            console.log(res)  
            this.setState({
                isLoading:false,
                opponetIsPlaying:false,
                gameState:res.data
            })
        })

        

    }

    playCard(card) {

        if(canPlay(card, this.state.gameState.cardPlayed[this.state.gameState.cardPlayed.length - 1])){

            this.setState({
                opponetIsPlaying:true
            })

            axios.post("/api/play", {"gameState":this.state.gameState, "cardPlayed":card, rule:rules}).then((res)=>{
                
                console.log(res)  

                let index = this.state.gameState.playerOne.cardAtHand.indexOf(card)
                this.state.gameState.playerOne.cardAtHand.splice(index, 1)
                this.state.gameState.cardPlayed.push(card)


                this.setState({
                    opponetIsPlaying:false
                })
        
            })

        }else{
            alert("illegal move")
        }
        
      
    }

    render(){

        let height = window.innerHeight

        const style = {height: height * 0.9}


        if(this.state.isLoading) return(<div>Loading</div>)

        let playerCard = this.state.gameState.playerOne.cardAtHand

        let opponetCard = this.state.gameState.playerTwo.cardAtHand

        let inPlay = this.state.gameState.cardPlayed[this.state.gameState.cardPlayed.length - 1]

        if(this.state.opponetIsPlaying){

            var gameObjects = <div>
                                    <Player top={0.2} angle={180} cards={opponetCard} action={this.playCard} />
                                    <Player top={0.8} angle={0} cards={playerCard} action={this.playCard}  />
                                    <InPlay className="center" cards={inPlay} />
                                    <Market />
                              </div>
       
        }else{
            
            var gameObjects = <div>
                                   <Player top={0.2} angle={180} cards={opponetCard} action={this.playCard} />
                                   <Player top={0.8} angle={0} cards={playerCard} action={this.playCard}  />
                                   <InPlay className="center" cards={inPlay}/>
                                   <Market />
                             </div>
       
        }


        return(
                <center id="game-table" style={style} className="game-table">
                    {gameObjects}
                </center>
            )

    }

}

export default GamePlay