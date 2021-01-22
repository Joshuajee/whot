import React from "react"
import chooseCard from "../../GameLogic/chooseCard";

class Player extends React.Component {

    
    render(){

        let width = window.innerWidth
        let height = window.innerHeight
        let cardSize = height/10
        let angle = this.props.angle
        let margin = (width / 2) - cardSize * 0.6666666667 - width * 0.2

        const style = {
            position:"absolute",
            top:height * this.props.top - cardSize,
            left: margin,
            align:"center",
            width: (width - margin * 2),
            transform: "rotate(" + angle + "deg)"
            
        }


        return(
            <div style={style} className="in-play">
            {displayCards(this.props.cards, cardSize, this.props.action)}
            </div>
            )
    }


}


function displayCards(cards, cardSize, action) {
    
    let cardArray = []

    for(let i = 0; i < cards.length; i++){
        cardArray.push(<span onClick = {() => action(cards[i])}> { chooseCard(cards[i], cardSize) } </span>)
    }

    return cardArray
}

export default Player