import SquareCard from "../Cards/SquareCard";
import CircleCard from "../Cards/CircleCard";
import CrossCard from "../Cards/CrossCard";
import TriangleCard from "../Cards/TriangleCard";
import StarCard from "../Cards/StarCard";
import WhotCard from "../Cards/WhotCard";
import CardCover from "../Cards/CardCover";
import Cards from "../../GameEnv/cards";

var cards = Cards.cards
cards.push("cover:20")

function Start(props) {

    let width = window.screen.availWidth
    let height = window.screen.availHeight

    let area = width * height

    let cardSize = area/(56 * 56 * 6)

    console.log("height " + height + " width " + width + " area " + area + " space " + cardSize)

    cards =  shuffle(cards)

    let componet = []

    for (let i = 0; i < cards.length; i++) {
        
        let index = cards[i].indexOf(":")
        let number = parseInt(cards[i].slice(index + 1, cards[i].length))
        let shape = cards[i].slice(0, index)

        switch(shape){

            case "star":
                componet.push(<StarCard size={cardSize} number={number} />)
            break

            case "circle":
                componet.push(<CircleCard size={cardSize} number={number} />)
            break

            case "square":
                componet.push(<SquareCard size={cardSize} number={number} />)
            break

            case "cross":
                componet.push(<CrossCard size={cardSize} number={number} />)
            break

            case "triangle":
                componet.push(<TriangleCard size={cardSize} number={number} />)
            break

            case "whot":
                componet.push(<WhotCard size={cardSize} number={number} />)
            break
            default:
                componet.push(<CardCover size={cardSize}  />)

        }
        
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