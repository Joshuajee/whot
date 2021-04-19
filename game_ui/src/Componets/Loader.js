/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2021 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */



import chooseCard from "../GameLogic/chooseCard"
import Cards from "../GameEnv/cards/index.json"

var cards = [...Cards.cards]

function Loader(props) {

    let width = window.innerWidth
    let height = window.innerHeight
    let cardSize = height/5

    let cardIndex = Math.floor(Math.random() * cards.length)

    const style = {
        position:"absolute",
        top:height/2 - cardSize,
        left:width/2 - cardSize * 0.6666666667
    }

    return(
        <div style={style} className="loader">
            {chooseCard(cards[cardIndex], cardSize)}
        </div>
        )
}

export default Loader