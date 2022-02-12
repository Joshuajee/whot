/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2021 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */



import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

import chooseCard from "../../GameLogic/chooseCard"

import CardNumber from "./CardNumber"


class Player extends React.Component {

    constructor(){

        super()

        this.state = {
            start:0,
        }
    }

    
    render(){

        let width = window.innerWidth
        let height = window.innerHeight
        let cardSize = height / (4 * 1.5)

        let margin = width * 0.05

        let top = this.props.top * height - cardSize

        let cardSpaceAvailable = width  - margin * 2

        let noOfCardsThatCanBeDisplayed = cardSpaceAvailable / (cardSize * 1.1)

        let style = {
            position: "absolute",
            top: top,
            left: margin,
            align: "center",
            width: cardSpaceAvailable,  
            height: cardSize,
        }

        let navStyle = {
            height: cardSize  * 1.5
        }
        
        

        let left = null
        let right = null

        if(this.state.start > 0 && this.state.start < this.props.cards.length - noOfCardsThatCanBeDisplayed){
            
            left =  <span onClick={() =>  { this.setState({start: this.state.start - 1}) } } >
                        <FontAwesomeIcon style={navStyle} color={"blue"} icon={faArrowLeft} /> 
                    </span>
            
            right = <span onClick={() => { if(this.state.start < this.props.cards.length - noOfCardsThatCanBeDisplayed) this.setState({start: this.state.start + 1}) } } >
                        <FontAwesomeIcon style={navStyle} color={"blue"} icon={faArrowRight} /> 
                    </span>

        }else if(this.state.start > 0){

            left =  <span style={{top:100}} onClick={() =>  { this.setState({start: this.state.start - 1}) } } >
                        <FontAwesomeIcon style={navStyle} color={"blue"} icon={faArrowLeft} /> 
                    </span>

        }else if(this.state.start < this.props.cards.length - noOfCardsThatCanBeDisplayed){
            
            right = <span style={{top:100}} onClick={() => { if(this.state.start < this.props.cards.length - noOfCardsThatCanBeDisplayed) this.setState({start: this.state.start + 1}) } } >
                        <FontAwesomeIcon style={navStyle} color={"blue"} icon={faArrowRight} /> 
                    </span>

        }


        return(
            <div style={style} className="player">

                {left}
                {this.displayCards(this.props.cards.sort(), cardSize, this.props.action, this.state.start)}  
                {right}

                <CardNumber cardNumber={this.props.cards.length} />
                
            </div>
            )
    }
    

    displayCards(cards, cardSize, action, start=0) {
    
        let cardArray = []
    
        let width = window.innerWidth
        
        let margin = width * 0.05
        let cardSpaceAvailable = width  - margin * 2
    
        for(let i = start; i < cards.length; i++){
           
            if((i + 1 - start) * 1.1 * cardSize >= cardSpaceAvailable) break
            
            if(this.props.playable)
                cardArray.push(<span onClick = {() => action([cards[i]])}> { chooseCard(cards[i], cardSize) } </span>)
            else
            cardArray.push(<span> { chooseCard(cards[i], cardSize) } </span>)
        }
    
        return cardArray
    }
    


}


export default Player