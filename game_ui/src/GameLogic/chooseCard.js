import SquareCard from "../Componets/Cards/SquareCard";
import CircleCard from "../Componets/Cards/CircleCard";
import CrossCard from "../Componets/Cards/CrossCard";
import TriangleCard from "../Componets/Cards/TriangleCard";
import StarCard from "../Componets/Cards/StarCard";
import WhotCard from "../Componets/Cards/WhotCard";
import CardCover from "../Componets/Cards/CardCover";


function chooseCard(card, cardSize){

    


    let index = card.indexOf(":")
    let number = parseInt(card.slice(index + 1, card.length))
    let shape = card.slice(0, index)

    switch(shape){

        case "star":
            return(<StarCard size={cardSize} number={number} />)
        case "circle":
            return(<CircleCard size={cardSize} number={number} />)
        case "square":
            return(<SquareCard size={cardSize} number={number} />)
        case "cross":
            return(<CrossCard size={cardSize} number={number} />)
        case "triangle":
            return(<TriangleCard size={cardSize} number={number} />)
        case "whot":
            return(<WhotCard size={cardSize} number={number} />)
        default:
            return(<CardCover size={cardSize}  />)

    }

}

export default chooseCard