/**
 * @author Joshua Evuetapha
 * @copyright (C) 2022 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */


import React, { useEffect, useState } from "react";
import axios from "axios";

import {canPlay, checkPlayResponse, createState,
        referee, goMarket, checkGameState,  availableMove, 
        cardIndex, undoMove} from  "../GameLogic/logics";

import InPlay  from "../Componets/CardHolder/InPlay";
import Market from "../Componets/CardHolder/Market";
import Player from "../Componets/CardHolder/Player";
import Need from "../Componets/CardHolder/Need";
import Loader from "../Componets/Loader";
//import Modal from "../Componets/Modal";

import { useSelector, useDispatch } from "react-redux";
import { removeLast, updateGameState, updatePlayerOneActions, updatePlayerOneStates, updatePlayerTwoActions } from "../Redux/actions";
import { useParams } from "react-router";

const rules = {"holdOn":{"active":true, "card":1, "defend":false},
            "pickTwo":{"active":true, "card":2, "defend":false},
            "pickThree":{"active":true, "card":5, "defend":false}, 
            "suspension":{"active":true, "card":8, "defend":false},
            "generalMarket":{"active":true, "card":14, "defend":false},
            "marketFinishGameEnd" : false
        } 

const GamePlay = () => {

    const { user } = useParams();

    const { gameState, playerOneStates, playerOneActions, playerTwoStates, 
        playerTwoActions, playerOneCardIndex, playerTwoCardIndex
        } = useSelector((state) => state);

    const dispatch = useDispatch();

    const [height, setHeight] = useState(window.innerHeight);
    const [width, setWidth] = useState(window.innerWidth);
    const [playerOneData, setPlayerOneData] = useState({});
    const [playerTwoData, setPlayerTwoData] = useState({});
    //const [error, setError] = useState(null)
    const [isNeeded, setIsNeeded] =  useState(false);
    const [playerCard, setPlayerCard] = useState([]);
    const [opponetCard, setOpponetCard] = useState([]);
    const [inPlay, setInplay] = useState([]);
    const [cardPlayed, setCardPlayed] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [opponetIsPlaying, setOpponetIsPlaying] = useState(false);
    const [opponetMoves, setOpponetMoves] = useState([]);
    const [isLandscape, setIsLandscape] = useState(true);
    const [style, setStyle] = useState({});
    const [gameArea, setGameArea] = useState({});

    useEffect(() => {

        window.onresize = () => {
            setHeight(window.innerHeight);
            setWidth(window.innerWidth);
        }

        window.onorientationchange = () => {
            setHeight(window.innerHeight);
            setWidth(window.innerWidth);
        }

    }, []);

    useEffect(() => {

        if(height > width) {

            setIsLandscape(false);
            setStyle({transform: 'rotate(90deg)'});
            setGameArea({height: width * 0.98, width: height * 0.96 });

        } else {

            setIsLandscape(true);
            setStyle({});
            setGameArea({height: height * 0.97, width: width * 0.98 });

        }

    }, [height, width]);


    useEffect(() => {

        axios.post("/api/v1/start", {agentName: user, user: "Guest", rules: rules, start: 5}).then((res)=>{  

            const data = res.data;

            dispatch(updateGameState(data.gameState));

            setPlayerOneData(data.playerInfo);

            setPlayerTwoData(data.agentInfo);

            setIsLoading(false);

            setOpponetIsPlaying(false);

            setOpponetMoves(data.moves);

        }).catch(error => {

            console.log(error)
    
            alert(error)
        })

    }, [dispatch, user]);

    useEffect(() => {

        if(opponetMoves.length){
            
            //check the type of response gotten from server
            checkPlayResponse(opponetMoves, gameState, playerTwoStates, playerTwoData, dispatch, setOpponetIsPlaying);

            opponetMoves.forEach(element => {

                if(element[1] >= 0) {
                    dispatch(updatePlayerTwoActions(element));
                }

            });

            setOpponetMoves([]);
      
        }   

    }, [gameState, opponetMoves, playerTwoActions, playerTwoData, playerTwoStates, dispatch]);


    const needed = (card) => {

        let availableMoves = availableMove(gameState.playerOne.cardAtHand, gameState.cardPlayed[gameState.cardPlayed.length - 1])

        const state = createState(gameState, availableMoves, true, playerOneData);

        dispatch(updatePlayerOneStates(state));

        card.push(cardIndex(availableMoves, card[0]))

        dispatch(updatePlayerOneActions(card));

        setIsLoading(true);
        setIsNeeded(false);
        setOpponetIsPlaying(false);
 
        const request = {agentName:  user, user: "Guest", gameState, playerMove: card, rules:rules}
    
        const index = gameState.playerOne.cardAtHand.indexOf("whot:20");
        const newGameState = {...gameState};

        newGameState.playerOne.cardAtHand.splice(index, 1);
        newGameState.cardPlayed.push(card[0]);

        dispatch(updateGameState(newGameState));

        axios.post("/api/v1/play", request).then((res)=>{
            
            const response = res.data

            //check the type of response gotten from server
            checkPlayResponse(response, gameState, playerTwoStates, playerTwoData, dispatch, setOpponetIsPlaying)

            //remove loader from screen and transfer game control to player
            setOpponetIsPlaying(false);
            setIsLoading(false);

            dispatch(updatePlayerTwoActions(...response));
    
        }).catch((error) =>{

            //undo last move
            undoMove(gameState, card, playerOneStates, playerOneActions, dispatch);

            //remove loader and transfer game control back to player
            setIsLoading(false);
            setOpponetIsPlaying(false);

            alert(error)
            
        });

    };

    const playCard = (card) => {

        const availableMoves = availableMove(gameState.playerOne.cardAtHand, gameState.cardPlayed[gameState.cardPlayed.length - 1])

        card.push(cardIndex(availableMoves, card[0]))

        dispatch(updatePlayerOneActions(card));

        const state = createState(gameState, availableMoves, true, playerOneData);

        dispatch(updatePlayerOneStates(state));

        setIsLoading(true);

        if(card[0] === "z:goMarket"){

            setOpponetIsPlaying(true);

            goMarket(gameState, gameState.playerOne.name, 1, dispatch);

            setOpponetIsPlaying(false);

            setIsLoading(true);

            const request = {agentName: user, user: "Guest", gameState, playerMove: "z:goMarket", rules}
        
            axios.post("/api/v1/play", request).then((res)=>{
                
                let response = res.data

                //remove loader from screen and transfer game control back to opponent
                setIsLoading(false);
                setOpponetIsPlaying(true);
 
                //check the type of response gotten from server

                checkPlayResponse(response, gameState, playerTwoStates, playerTwoData, dispatch, setOpponetIsPlaying);

                dispatch(updatePlayerTwoActions(...response));
                
            }).catch((error) =>{

                //undo last move
                undoMove(gameState, card, playerOneStates, playerOneActions, dispatch);

                //remove loader and transfer game control back to player
                setIsLoading(false);
                setOpponetIsPlaying(false);

                alert(error);

            });

        }   else    {
    
            const playGame = canPlay(card[0], gameState.cardPlayed[gameState.cardPlayed.length - 1])

            setIsNeeded(playGame[1]);

            if(playGame[0]){

                if(playGame[1]){

                    setIsNeeded(true);
                    setIsLoading(false);

                    //remove last state
                    dispatch(removeLast(playerOneStates));
                    dispatch(removeLast(playerOneActions));

                }   else    {
                    
                    const sendMove = referee(gameState, card, "Guest", dispatch);
                   
                    const request = { agentName: user, user: "Guest", gameState: gameState, playerMove:card[0], rules}
                    
                    if(sendMove) {

                        axios.post("/api/v1/play", request).then((res)=>{
                            
                            const response = res.data

                            //remove loader from screen and transfer game control back to opponent
                            setIsLoading(false);
                            setOpponetIsPlaying(true);

                            //handle response gotten from server 
                            checkPlayResponse(response, gameState, playerTwoStates, playerTwoData, dispatch, setOpponetIsPlaying);
     
                            dispatch(updatePlayerTwoActions(...response));

                        }).catch((error) => {

                            //undo last move
                            undoMove(gameState, card, playerOneStates, playerOneActions, dispatch);

                            //remove loader and transfer game control back to player
                            setIsLoading(false);
                            setOpponetIsPlaying(false);

                            alert(error)

                        })

                    }else{

                        setIsLoading(false)

                    }

                }
            
            }else{

                setIsLoading(false);

                alert("illegal move")
    
            }

        }
        
      
    }

    useEffect(() => {

        setPlayerCard(gameState.playerOne.cardAtHand);

        setOpponetCard(gameState.playerTwo.cardAtHand);

        setInplay(gameState.cardPlayed[gameState.cardPlayed.length - 1]);

        setCardPlayed(gameState.cardPlayed);

    }, [gameState]);

    useEffect(() => {
        checkGameState(gameState, playerOneStates, playerOneActions, playerTwoStates, playerTwoActions, dispatch);
    }, [gameState, playerOneStates, playerOneActions, playerTwoStates, playerTwoActions, dispatch])


    if (isLoading) return(<center  style={gameArea} className="game-table"><Loader /> </center>)

    return(
        <div style={style}>
        {
        //    <Modal text={"Network Error"} close={close} visibility={visibility} />
        }
            <center style={gameArea} className="game-table">

                <div style={gameArea}>

                    <Player top={0.2} isLandscape={isLandscape} angle={180} height={height} width={width} cards={opponetCard} action={playCard} playable={false} index={playerTwoCardIndex} />

                    <Player top={0.8} isLandscape={isLandscape}  angle={0} height={height} width={width} cards={playerCard} action={playCard} playable={!opponetIsPlaying} index={playerOneCardIndex}/>
        
                    { inPlay && <InPlay isLandscape={isLandscape} height={height} width={width} className="center" cards={inPlay} cardNumber={cardPlayed?.length} />  }

                    <Market action={playCard} isLandscape={isLandscape} height={height} width={width} playable={!opponetIsPlaying} cardNumber={gameState.market.length} />
                
                </div>

            </center>

            { isNeeded && <Need need={needed}/> }

        </div>

    )

}


export default GamePlay;