/**
 * @author Joshua Evuetapha
 * @copyright (C) 2022 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */

import chooseCard from "../../GameLogic/chooseCard";
import CardNumber from "./CardNumber"

const Market = (props) =>  {
    
    let width = window.innerWidth
    let height = window.innerHeight
    let cardSize = height / (4 * 1.5)

    const style = {
        position:"absolute",
        top:    height / 2 - cardSize,
        left:   width * 0.05
    }

    if(props.playable)
        return(
            <div style={style}>
                    <span onClick={() => props.action(["z:goMarket"])}>{ chooseCard("ff", cardSize) }</span>
                    <CardNumber cardNumber={props.cardNumber} />
            </div>
            )
    else
        return(
            <div style={style}>
                    <span>{ chooseCard("ff", cardSize) }</span>
                    <CardNumber cardNumber={props.cardNumber} />
            </div>
            )

}



export default Market
