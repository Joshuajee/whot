/**
 * @author Joshua Evuetapha
 * @copyright (C) 2022 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */

import { useEffect, useState } from "react";
import chooseCard from "../../GameLogic/chooseCard";
import CardNumber from "./CardNumber"

const Market = (props) =>  {

    const { height, width, playable, action, cardNumber, isLandscape } = props;
    const [style, setStyle] = useState({});
    const [cardSize, setCardSize] = useState(0)

    useEffect(() => {

        const style = {
            position:"absolute",
            top:    (height / 2) - cardSize,
            left:   width * 0.05
        }

        if (isLandscape) {
            setCardSize(height / (4 * 1.5));
        } else {
            setCardSize(width / (4 * 1.5));
            style.top = (width / 2) - cardSize;
            style.left = height * 0.15;
        }

        setStyle(style);

    }, [height, width, isLandscape, cardSize]);

    if(playable)
        return(
            <div style={style}>
                <span onClick={() => action(["z:goMarket"])}>{ chooseCard("ff", cardSize) }</span>
                <CardNumber cardNumber={cardNumber} />
            </div>
            )
    else
        return(
            <div style={style}>
                <span>{ chooseCard("ff", cardSize) }</span>
                <CardNumber cardNumber={cardNumber} />
            </div>
            )

}



export default Market
