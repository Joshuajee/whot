/*
 * Copyright (C) 2021 Joshua Evuetapha
 * Twitter : @evuetaphajoshua
 * Github : @Joshuajee
 * This program is distributed under the MIT license
 */


//import Start from "../Componets/Background/Start";
//import Button from "../Componets/Button";
import chooseCard from "../../GameLogic/chooseCard"

//import Loader from "../Componets/Loader"

function Whot() {

    let cardWidth = 350
    let left = (window.innerWidth / 2) - (cardWidth / 2)
    let top = (window.innerHeight / 2) - (cardWidth * 1.5 / 2)

    return(
            <center className="whot-background" style={{top:top, left:left}}>

                {chooseCard("", cardWidth)}
        
            </center>
    )

}

export default Whot