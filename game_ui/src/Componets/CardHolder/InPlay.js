/**
 * @author Joshua Evuetapha
 * @copyright (C) 2022 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */


import { useState, useEffect } from "react";
import chooseCard from "../../GameLogic/chooseCard";
import CardNumber from "./CardNumber";




const InPlay = (props) => {

    const { height, width, isLandscape } = props;

    const [cardSize, setCardSize] = useState(0);
    const [style, setStyle] = useState({});

    useEffect(() => {

        
        const style = {
            position: "absolute",
            top: (height / 2) - cardSize,
            left: (width / 2) - (cardSize * 0.6666666667)
        };

        if (isLandscape) {
            setCardSize(height / (4 * 1.5));
        } else {
            setCardSize(width / (4 * 1.5));
            style.top = (width / 2) - cardSize;
            style.left = (height / 2) - (cardSize * 0.6666666667)
        }

        setStyle(style);

    }, [height, width, cardSize, isLandscape]);

    return(
        <div style={style}>
            { chooseCard(props.cards, cardSize) }
            <CardNumber cardNumber={props.cardNumber} />
        </div>
        )

}

export default InPlay
