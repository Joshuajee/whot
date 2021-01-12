import chooseCard from "../../businessLogic/chooseCard";

function InPlay(props) {
    

    return(
        <center className="in-play">
            { chooseCard(props.cards, 12000)}
        </center>
        )

}

export default InPlay
