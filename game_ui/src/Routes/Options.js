import Start from "../Componets/Background/Start";
import Button from "../Componets/Button";
import chooseCard from "../GameLogic/chooseCard";

function Options() {

    return(
        <center style={{padding:10}}>

            {chooseCard("ee", 350)}
            
        </center>
    )

}

export default Options