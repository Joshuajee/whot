/**
 * @author Joshua Evuetapha
 * @copyright (C) 2022 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */


import { useState, useEffect } from "react";
import chooseCard from "../GameLogic/chooseCard";
import Cards from "../GameEnv/cards/index.json";

const cards = [...Cards.cards];


const Loader = (props)  => {

    const { width, height, isLandscape } = props;
    const [cardSize, setCardSize] = useState(0);
    const [style, setStyle] = useState({});
    const cardIndex = Math.floor(Math.random() * cards.length);

    useEffect(() => {

        if (isLandscape) {
            setCardSize(height / 5);
            setStyle({
                position:"absolute",
                top: (height / 2) - cardSize,
                left: (width / 2) - cardSize * 0.6666666667
            });
        } else {
            setCardSize(width / 5);
            setStyle({
                position:"absolute",
                top: (width / 2) - cardSize,
                left: (height / 2) - cardSize * 0.6666666667
            });
        }

    }, [height, width, cardSize, isLandscape]);

    return(
        <div style={style} className="loader">
            {chooseCard(cards[cardIndex], cardSize)}
        </div>
    );
}

export default Loader;