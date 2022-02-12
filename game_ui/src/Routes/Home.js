/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2021 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */



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

                <Button text={"Rules"} link={"/rules"}  class={"btn-rules"}/>

                <Button text={"Leaderboard"} link={"/leaderboard"} class={"btn-leader"}/>

                <Button text={"Create Agent"} link={"/create-agent"} class={"btn-create"}/>

                <Button text={"Settings"} link={"/settings"} class={"btn-settings"}/>
                
            </div>
            
        </center>
    )

}

export default Home