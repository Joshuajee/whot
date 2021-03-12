/*
 * Copyright (C) 2021 Joshua Evuetapha
 * Twitter : @evuetaphajoshua
 * Github : @Joshuajee
 * This program is distributed under the MIT license
 */


import chooseCard from "../../GameLogic/chooseCard";

function Market(props) {
    
    let width = window.innerWidth
    let height = window.innerHeight
    let cardSize = height/10

    const style = {
        position:"absolute",
        top:height/2 - cardSize,
        left:width/2 - cardSize * 0.6666666667 - width * 0.2
    }

    return(
        <div style={style}>
            <span onClick={() => props.action("z:goMarket")}>{ chooseCard("ff", cardSize) }</span>
        </div>
        )

}



export default Market
