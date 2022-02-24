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
import { useDispatch, useSelector } from "react-redux";
import { updatePlayerOneCardIndex, updatePlayerTwoCardIndex } from "../../Redux/actions";

const CARD_PADDING = 1.1;


const Player = (props) => {

    const { cards, action, playable, isPlayerOne, angle } = props;

    const { height, width, isLandscape, playerOneCardIndex, playerTwoCardIndex, gameState } = useSelector((state) => state);

    const [start, setStart] = useState(0);
    const [margin, setMargin] =  useState(0);
    const [cardSpaceAvailable, setCardSpaceAvailable] = useState(0);
    const [style, setStyle] = useState({});
    const [left, setLeft] = useState(null);
    const [right, setRight] = useState(null);
    const [cardSize, setCardSize] = useState(0);
    const [top, setTop] =  useState(0);
    const [noOfCardsThatCanBeDisplayed, setNoOfCardsThatCanBeDisplayed] =  useState(0);
    const [navStyle, setNavStyle] = useState({});
    const [noOfVisibelCards, setNoOfVisibleCards] = useState(0);
    const [playerCards, setPlayerCard] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {

        if (isPlayerOne) {
            setStart(playerOneCardIndex);
        } else {
            setStart(playerTwoCardIndex);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlayerOne]);

    useEffect(() => {

        if (isPlayerOne) {
            dispatch(updatePlayerOneCardIndex(start));
        } else {
            dispatch(updatePlayerTwoCardIndex(start));
        }

    }, [start, isPlayerOne, dispatch]);

    useEffect(() => {

        if (isLandscape) {
            setCardSize(height / (4 * 1.5));
        } else {
            setCardSize(width / (4 * 1.4));
        }

    }, [width, height, isLandscape, gameState]);

    useEffect(() => {

        if (isLandscape) {

            setTop(props.top * height - cardSize);
            setCardSpaceAvailable((width * 0.8));
            
        } else {

            setTop(props.top * width - cardSize);
            setCardSpaceAvailable((height * 0.8));

        }

    }, [props.top, width, height, cardSize, isLandscape]);

    useEffect(() => {

        setNoOfCardsThatCanBeDisplayed(Math.floor(cardSpaceAvailable / (cardSize * CARD_PADDING)));
        setNavStyle({height: cardSize * 1.5});

    }, [cardSize, cardSpaceAvailable]);

    useEffect(() => {
        setNoOfVisibleCards(Math.floor(noOfCardsThatCanBeDisplayed > cards.length) ? cards.length : noOfCardsThatCanBeDisplayed);
    }, [noOfCardsThatCanBeDisplayed, cards.length]);

    useEffect(() => {

        if (isLandscape) {

            setMargin((width - (cardSize * CARD_PADDING * noOfVisibelCards)) / 2);
            
        } else {

            setMargin((height - (cardSize * CARD_PADDING * noOfVisibelCards)) / 2);

        }


    }, [cardSize, isLandscape, noOfVisibelCards, width, height]);
    

    console.log(angle, " available ", cardSpaceAvailable)

    console.log(angle, " margin ", margin)

    console.log(angle, " cards ", cards.length)

    console.log(angle, " No of cards Displayed ", noOfCardsThatCanBeDisplayed)

    console.log(angle, " No of v cards ", noOfVisibelCards)

    useEffect(() => {

        const style = {
            position: "absolute",
            top: top,
            left: margin,
            width: (cardSize * CARD_PADDING * noOfVisibelCards),  
            height: cardSize
        };

        setStyle(style);

    }, [cardSize, margin, top, isLandscape, noOfVisibelCards, cards.length]);

    useEffect(() => {

        if(start < cards.length - noOfVisibelCards) {

            setRight(<span style={{top:100}} onClick={() =>  setStart(start + 1)  } >
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

    }, [navStyle, start, cards.length, noOfVisibelCards]);

    useEffect(() => {

        const cardArray = [];

        cards.sort();
    
        for(let i = start; i < cards.length; i++){
           
            if((i + 1 - start) * CARD_PADDING* cardSize >= cardSpaceAvailable) break
            
            if(playable)
                cardArray.push(<span  key={i} onClick = {() => action([cards[i]])}> { chooseCard(cards[i], cardSize) } </span>)
            else
                cardArray.push(<span key={i} > { chooseCard(cards[i], cardSize) } </span>)
        }

        setPlayerCard(cardArray)

    }, [start, cards, cardSpaceAvailable, action, cardSize, playable]);

    console.log(angle, cardSpaceAvailable, ' --- ', start)

    return(
        <div style={style}>

            {left}

            {   playerCards }

            {right}

            <CardNumber style={{}} cardNumber={cards.length} />

        </div>)
    
}

export default Player;
