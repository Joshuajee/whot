/**
 * @author Joshua Evuetapha
 * @copyright (C) 2022 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */



import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import chooseCard from "../../GameLogic/chooseCard";

import CardNumber from "./CardNumber";


const Player = (props) => {

    const { cards, action, playable, index } = props;

    const [start, setStart] = useState(index);
    const [width] = useState(window.innerWidth);
    const [margin] =  useState(width * 0.05);
    const [cardSpaceAvailable] = useState(width  - margin * 2);
    const [style, setStyle] = useState({});
    const [left, setLeft] = useState(null);
    const [right, setRight] = useState(null);
    const [height] =  useState(window.innerHeight);
    const [cardSize] = useState(height / (4 * 1.5));

    const [top] =  useState(props.top * height - cardSize);

    const [noOfCardsThatCanBeDisplayed] =  useState(cardSpaceAvailable / (cardSize * 1.1));
    const [navStyle] = useState({height: cardSize * 1.5});
    
 

    useEffect(() => {
        

        const style = {
            position: "absolute",
            top: top,
            left: margin,
            align: "center",
            width: cardSpaceAvailable,  
            height: cardSize,
        };

        setStyle(style);

    }, [cardSize, cardSpaceAvailable, margin, top]);

    useEffect(() => {

        if(start < cards.length - noOfCardsThatCanBeDisplayed) {

            setRight(<span style={{top:100}} onClick={() => { if(start < cards.length - noOfCardsThatCanBeDisplayed) { setStart(start + 1) } } } >
                        <FontAwesomeIcon style={navStyle} color={"blue"} icon={faArrowRight} /> 
                    </span>);
        
        } else {
            setRight(null)
        }

        if (start !== 0) {

            setLeft(<span style={{top:100}} onClick={() =>  { setStart(start - 1) }  } >
                        <FontAwesomeIcon style={navStyle} color={"blue"} icon={faArrowLeft} /> 
                    </span>);
        } else {
            setLeft(null);
        }

    }, [navStyle, start, cards, noOfCardsThatCanBeDisplayed]);


    const displayCards = (cards, cardSize, action, start=0) => {
    
        const cardArray = [];
    
        for(let i = start; i < cards.length; i++){
           
            if((i + 1 - start) * 1.1 * cardSize >= cardSpaceAvailable) break
            
            if(playable)
                cardArray.push(<span  key={i} onClick = {() => action([cards[i]])}> { chooseCard(cards[i], cardSize) } </span>)
            else
                cardArray.push(<span key={i} > { chooseCard(cards[i], cardSize) } </span>)
        }

        return cardArray;

   }

    return(
        <div style={style} className="player">

            {left}
            {displayCards(cards.sort(), cardSize, action, start)}  
            {right}

            <CardNumber cardNumber={cards.length} />
            
        </div>)
    
}


export default Player;