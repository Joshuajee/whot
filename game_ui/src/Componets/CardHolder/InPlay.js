/**
 * @author Joshua Evuetapha
 * @copyright (C) 2022 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */


import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import chooseCard from "../../GameLogic/chooseCard";
import CardNumber from "./CardNumber";




const InPlay = (props) => {

    const { card, cardNumber } = props;

    const { height, width, isLandscape } = useSelector((state) => state);

    const [cardSize, setCardSize] = useState(0);
    const [style, setStyle] = useState({});
    const [need, setNeed] = useState(null);

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

    useEffect(() => {

        const index = card.indexOf(":") + 1;
        const cardNumber = parseInt(card.slice(index, card.length));

        if (cardNumber === 20)
            setNeed(card.slice(0, index - 1));
        else 
            setNeed(null);

    }, [card]);

    return(
        <div style={style}>
            { need && 
                <div className="needed-card" 
                    style={{top: cardSize / 1.6, width: cardSize}}>
                    {need} 
                </div>
            }

            { chooseCard(card, cardSize) }
            <CardNumber cardNumber={cardNumber} />
        </div>
        )
}

export default InPlay
