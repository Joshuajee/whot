import SquareCard from "../Cards/SquareCard";
import CircleCard from "../Cards/CircleCard";
import CrossCard from "../Cards/CrossCard";
import TriangleCard from "../Cards/TriangleCard";
import StarCard from "../Cards/StarCard";
import WhotCard from "../Cards/WhotCard";
import CardCover from "../Cards/CardCover";
import Cards from "../../GameEnv/cards";

function Start(props) {

    let cards =  shuffle(Cards.cards)
    let componet = []


    for (let i = 0; i < cards.length; i++) {
        
        let index = cards[i].indexOf(":")
        let number = parseInt(cards[i].slice(index + 1, cards[i].length))
        let shape = cards[i].slice(0, index)

        console.log(shape)

        switch(shape){

            case "star":
                componet.push(<StarCard size={100} number={number} />)
            break

            case "circle":
                componet.push(<CircleCard size={100} number={number} />)
            break

            case "square":
                componet.push(<SquareCard size={100} number={number} />)
            break

            case "cross":
                componet.push(<CrossCard size={100} number={number} />)
            break

            case "triangle":
                componet.push(<TriangleCard size={100} number={number} />)
            break

            case "whot":
                componet.push(<WhotCard size={100} number={number} />)
            break
            default:
                componet.push(<CardCover size={100}  />)

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