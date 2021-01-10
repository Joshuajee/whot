import Start from "../Componets/Background/Start";
import Button from "../Componets/Button";


function Home() {

    return(
        <center>

            <Start />

            <div className="start-button">

                <Button text={"Start Game"} link={"/startgame"} class={"btn-start"}/>

                <Button text={"Options"} link={"/options"}  class={"btn-options"}/>

                <Button text={"Leaderboard"} link={"/leaderboard"} class={"btn-leader"}/>

                <Button text={"Settings"} link={"/settings"} class={"btn-settings"}/>
                
            </div>
            
        </center>
    )

}

export default Home