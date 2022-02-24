/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2021 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */



import SquareCard from "../Componets/Cards/SquareCard";
import CircleCard from "../Componets/Cards/CircleCard";
import CrossCard from "../Componets/Cards/CrossCard";
import TriangleCard from "../Componets/Cards/TriangleCard";
import StarCard from "../Componets/Cards/StarCard";
import WhotCard from "../Componets/Cards/WhotCard";
import CardCover from "../Componets/Cards/CardCover";


const chooseCard = (card, cardSize, need=false) => {

    
    const index = card.indexOf(":");
    const number = card.slice(index + 1, card.length);
    const shape = card.slice(0, index);

    if(parseInt(number) === 20) return(<WhotCard size={cardSize} number={number} />);

    switch(shape){

        case "star":
            return(<StarCard size={cardSize} number={number} need={need} />);
        case "circle":
            return(<CircleCard size={cardSize} number={number} />);
        case "square":
            return(<SquareCard size={cardSize} number={number} />);
        case "cross":
            return(<CrossCard size={cardSize} number={number} />);
        case "triangle":
            return(<TriangleCard size={cardSize} number={number} />);
        case "whot":
            return(<WhotCard size={cardSize} number={number} />);
        default:
            return(<CardCover size={cardSize}  />)

    }

}

export default chooseCard