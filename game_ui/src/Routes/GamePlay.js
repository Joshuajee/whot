import React from "react"
import InPlay  from "../Componets/CardHolder/InPlay";
import Market from "../Componets/CardHolder/Market";
import Player from "../Componets/CardHolder/Player";
import Cards from "../GameEnv/cards"
import {shuffle, goMarket} from "../GameLogic/logics";

const card = [...Cards.cards]

class GamePlay extends React.Component{


    constructor(){

        super()
 
        this.market = [...shuffle(card)]

        this.player = []
        this.opponent = []
        this.cardPlayed = []
        this.rules = []

        goMarket(this.player, this.market, 3)
        goMarket(this.opponent, this.market, 3)
        goMarket(this.cardPlayed, this.market, 1)


        //for Agent

        this.state = {
            cardPlayed : this.cardPlayed,
            cardInPlay : null,
            noOfCardInMarket : this.market.length,
            noOfCardsWithOpponet: this.player.length,
            cardAtHand: this.opponent,
            availableMove:null,
            rules:{}
        }

        this.opponentState = {
            cardPlayed : this.cardPlayed,
            cardInPlay : null,
            noOfCardInMarket : this.market.length,
            noOfCardsWithOpponet: this.player.length,
            cardAtHand: this.opponent,
            availableMove:null,
            rules:{}
        }
    }



    render(){
    
        let height = window.innerHeight

        const style = {height: height * 0.9}

        return(<div>
                <center id="game-table" style={style} className="game-table">
                    <Player top={0.2} angle={180} cards={this.opponent} postion={this.state} />
                    <Player top={0.8} angle={0} cards={this.player} postion={this.opponentState.cardPlayed} />
                    <InPlay className="center" cards="star:8" />
                    <Market />
                </center>
            </div>
        )
    }

}

export default GamePlay