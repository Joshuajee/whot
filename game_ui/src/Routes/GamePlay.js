import InPlay  from "../Componets/CardHolder/InPlay";

function GamePlay() {

    let width = window.screen.availWidth
    let height = window.screen.availHeight

    return(<div>
            <center className="game-table">
                <InPlay className="center" cards="star:8" />
            </center>
        </div>
    )

}

export default GamePlay