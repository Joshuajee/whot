import Start from "../Componets/Background/Start";
import Button from "../Componets/Button";


function Options() {

    return(
        <center>

            <Start />

            <div className="start-button">

                <Button text={"Start Game"} class={"btn-start"}/>

                <Button text={"Options"} class={"btn-options"}/>

                <Button text={"Leaderboard"} class={"btn-leader"}/>

                <Button text={"Settings"} class={"btn-settings"}/>
                
            </div>
            
        </center>
    )

}

export default Option