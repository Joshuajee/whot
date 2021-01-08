import SquareCard from "../Cards/SquareCard";
import CircleCard from "../Cards/CircleCard";
import CrossCard from "../Cards/CrossCard";
import TriangleCard from "../Cards/TriangleCard";
import StarCard from "../Cards/StarCard";
import WhotCard from "../Cards/WhotCard";
import CardCover from "../Cards/CardCover";

function Start(props) {

    return(
        <div className="start-page" >
            <SquareCard size={100} number={1} />
            <CircleCard size={100} number={2} />
            <CrossCard size={100} number={5} />
            <TriangleCard size={100} number={14} />
            <StarCard size={100} number={8} />
            <WhotCard size={100} number={20} />
            <CardCover size={100}  />
        </div>
        )
}

export default Start