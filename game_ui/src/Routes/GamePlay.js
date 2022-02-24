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
import Modal from "../Componets/Modal";

import { useSelector, useDispatch } from "react-redux";
import { removeLast, updateGameState, updatePlayerOneActions, updatePlayerOneStates, updatePlayerTwoActions } from "../Redux/actions";
import { Redirect, useParams } from "react-router";

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
        playerTwoActions, height, width, isLandscape   } = useSelector((state) => state);

    const dispatch = useDispatch();

    const [playerOneData, setPlayerOneData] = useState({});
    const [playerTwoData, setPlayerTwoData] = useState({});
    const [modal, setModal] = useState(null)
    const [isNeeded, setIsNeeded] =  useState(false);
    const [playerCard, setPlayerCard] = useState([]);
    const [opponetCard, setOpponetCard] = useState([]);
    const [inPlay, setInplay] = useState([]);
    const [cardPlayed, setCardPlayed] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [opponetIsPlaying, setOpponetIsPlaying] = useState(false);
    const [opponetMoves, setOpponetMoves] = useState([]);
    const [style, setStyle] = useState({});
    const [gameArea, setGameArea] = useState({});
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {

        if(isLandscape) {

            setStyle({});
            setGameArea({height: height * 0.97, width: width * 0.98 });

        } else {

            setStyle({transform: 'rotate(90deg)'});
            setGameArea({height: width * 0.98, width: height * 0.96 });

        }

    }, [isLandscape, height, width]);

    useEffect(() => {

        //alert((gameState?.playerTwo?.name !== user))

        if (!gameState) {
            setIsLoading(true);
            axios.post("/api/v1/start", {agentName: user, user: "Guest", rules: rules, start: 5}).then((res)=>{  

                const data = res.data;

                dispatch(updateGameState(data.gameState));

                setPlayerOneData(data.playerInfo);

                setPlayerTwoData(data.agentInfo);

                setIsLoading(false);

                setOpponetIsPlaying(false);

                setOpponetMoves(data.moves);

            },err => {

                console.log(err);

                setModal({ type: 'Network Error',  text: err});
            });
        }

    }, [dispatch, gameState, user]);

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
    
        }, err =>{

            //undo last move
            undoMove(gameState, card, playerOneStates, playerOneActions, dispatch);

            //remove loader and transfer game control back to player
            setIsLoading(false);
            setOpponetIsPlaying(false);
    
            setModal({ type: 'Network Error',  text: err});   
            
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
                
            }, err =>{

                //undo last move
                undoMove(gameState, card, playerOneStates, playerOneActions, dispatch);

                //remove loader and transfer game control back to player
                setIsLoading(false);
                setOpponetIsPlaying(false);

                setModal({ type: 'Network Error',  text: err});

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

                        }, err => {

                            //undo last move
                            undoMove(gameState, card, playerOneStates, playerOneActions, dispatch);

                            //remove loader and transfer game control back to player
                            setIsLoading(false);
                            setOpponetIsPlaying(false);

                            setModal({ type: 'Network Error',  text: err});

                        })

                    }else{

                        setIsLoading(false)

                    }

                }
            
            }else{

                setIsLoading(false);

                setModal({ type: 'Error',  text: "illegal move"});
    
            }

        }        
      
    }

    useEffect(() => {

        if(gameState) {

            setPlayerCard(gameState.playerOne.cardAtHand);

            setOpponetCard(gameState.playerTwo.cardAtHand);

            setInplay(gameState.cardPlayed[gameState.cardPlayed.length - 1]);

            setCardPlayed(gameState.cardPlayed);

        }

    }, [gameState]);

    useEffect(() => {
        if(gameState) {
            checkGameState(gameState, playerOneStates, playerOneActions, playerTwoStates, playerTwoActions, dispatch, setModal);
        }
    }, [gameState, playerOneStates, playerOneActions, playerTwoStates, playerTwoActions, dispatch]);

    useEffect(() => {

        if (gameState) {
            if (gameState?.playerTwo?.name !== user) {
                setRedirect(gameState?.playerTwo?.name);
            }
        }

    }, [redirect, gameState, user]);


    return(
        <div style={style}>

            { redirect && <Redirect to={`/game/${redirect}`}/> }

            {
                isLoading ? 

                    (<div style={gameArea} className="game-table">
                        <Loader height={height} width={width} isLandscape={isLandscape} />
                    </div>) :

                    (<div style={gameArea} className="game-table">

                        <Player top={0.2} angle={180} cards={opponetCard} action={playCard} playable={false} />

                        <Player top={0.8} angle={0} cards={playerCard} action={playCard} playable={!opponetIsPlaying} isPlayerOne />
            
                        { inPlay && <InPlay  className="center" card={inPlay} cardNumber={cardPlayed?.length} />  }

                        <Market action={playCard} playable={!opponetIsPlaying} cardNumber={gameState?.market?.length} />
                    
                    </div>)

            }

            { isNeeded && <Need need={needed} /> }

            { modal && <Modal close={setModal} content={modal} /> }

        </div>

    )

}


export default GamePlay;