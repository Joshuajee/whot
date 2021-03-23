/*
 * Copyright (C) 2021 Joshua Evuetapha
 * Twitter : @evuetaphajoshua
 * Github : @Joshuajee
 * This program is distributed under the MIT license
 */


import Start from "../Componets/Background/Start";
import Button from "../Componets/Button";
import chooseCard from "../GameLogic/chooseCard";

import Loader from "../Componets/Loader"

function Options() {

    return(
        <center style={{padding:10}}>

            {chooseCard("ee", 350)}
            <Loader />
            
        </center>
    )

}

export default Options