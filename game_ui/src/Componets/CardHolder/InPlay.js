/*
 * Copyright (C) 2021 Joshua Evuetapha
 * Twitter : @evuetaphajoshua
 * Github : @Joshuajee
 * This program is distributed under the MIT license
 */



import chooseCard from "../../GameLogic/chooseCard";




function InPlay(props) {
    
    let width = window.innerWidth
    let height = window.innerHeight
    let cardSize = height/10

    const style = {
        position:"absolute",
        top:height/2 - cardSize,
        left:width/2 - cardSize * 0.6666666667
    }

    return(
        <div style={style}>
            { chooseCard(props.cards, cardSize) }
        </div>
        )

}

export default InPlay
