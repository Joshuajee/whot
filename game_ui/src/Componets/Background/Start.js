import Cards from "../../GameEnv/cards";
import chooseCard from "../../businessLogic/chooseCard";

var cards = Cards.cards
cards.push("cover:20")

function Start(props) {

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

function shuffle(array){

    let currIndex = array.length

    while (0 !== currIndex) {
        
        //pick an element not prevously selected
        let randIndex = Math.floor(Math.random() * currIndex)
        currIndex--

        //swap it with the current element
        let tempVal  = array[currIndex]
        array[currIndex] = array[randIndex]
        array[randIndex] = tempVal
    
    }

    return array
}

export default Start