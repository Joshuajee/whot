import chooseCard from "../../businessLogic/chooseCard";

function Player(props) {
    

    return(
        <center className="player">
            { chooseCard(props.cards, 12000)}
        </center>
        )

}

export default Player
