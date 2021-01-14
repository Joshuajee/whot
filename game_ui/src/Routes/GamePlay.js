import InPlay  from "../Componets/CardHolder/InPlay";
import Market from "../Componets/CardHolder/Market";
import Player from "../Componets/CardHolder/Player";

function GamePlay() {

    return(<div>
            <center id="game-table" className="game-table">
                <Player top={0.2} angle={180} cards={["triangle:2", "star:2", "whot:20"]} />
                <Player top={0.8} angle={0} cards={["square:14", "cross:5", "circle:10"]} />
                <InPlay className="center" cards="star:8" />
                <Market />
            </center>
        </div>
    )

}

export default GamePlay