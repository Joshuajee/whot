import Start from "../Componets/Background/Start";
import Button from "../Componets/Button";


function Home() {


    let height = window.innerHeight * 0.25

    const style = {
        marginTop:height
    }

    return(
        <center>

            <Start />

            <div style={style}>

                <Button text={"Play Game"} link={"/leaderboard"} class={"btn-start"}/>

                <Button text={"Options"} link={"/options"}  class={"btn-options"}/>

                <Button text={"Leaderboard"} link={"/leaderboard"} class={"btn-leader"}/>

                <Button text={"Settings"} link={"/settings"} class={"btn-settings"}/>
                
            </div>
            
        </center>
    )

}

export default Home