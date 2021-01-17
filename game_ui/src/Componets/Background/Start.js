import Cards from "../../GameEnv/cards";
import chooseCard from "../../GameLogic/chooseCard";
import shuffle from "../../GameLogic/logics";

var cards = Cards.cards
cards.push("cover:20")

function Start() {

    let width = window.innerWidth
    let height = window.innerHeight

    let area = width * height

    let size = width / 10

    let cardSize = size

    cards =  shuffle(cards)

    let componet = []

    for (let i = 0; i < cards.length; i++) {
    
        componet.push(chooseCard(cards[i], cardSize))

    }
   

    return(
        <div className="start-page" >
            {componet}
        </div>
        )
}



export default Start