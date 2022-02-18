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
import { updateGameState } from "../Redux/actions";

const url = window.location.href
  
const index = url.indexOf("/:") + 2
const user = url.slice(index, url.length)

const rules = {"holdOn":{"active":true, "card":1, "defend":false},
            "pickTwo":{"active":true, "card":2, "defend":false},
            "pickThree":{"active":true, "card":5, "defend":false}, 
            "suspension":{"active":true, "card":8, "defend":false},
            "generalMarket":{"active":true, "card":14, "defend":false},
            "marketFinishGameEnd" : false
        } 

const GamePlay = () => {

    const { gameState, playerOneStates, playerOneActions, playerTwoStates, 
        playerTwoActions, playerOneCardIndex, playerTwoCardIndex
        } = useSelector((state) => state);

    const dispatch = useDispatch();


    const [playerOneData, setPlayerOneData] = useState({});
    const [playerTwoData, setPlayerTwoData] = useState({});
    //const visibility = "hide-modal"; 
    const [isNeeded, setIsNeeded] =  useState(false);
    const [playerCard, setPlayerCard] = useState([]);
    const [opponetCard, setOpponetCard] = useState([]);
    const [inPlay, setInplay] = useState([]);
    const [cardPlayed, setCardPlayed] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [opponetIsPlaying, setOpponetIsPlaying] = useState(false);
    const [opponetMoves, setOpponetMoves] = useState([]);


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

    }, [dispatch]);

    useEffect(() => {

        if(opponetMoves.length){
            
            //check the type of response gotten from server
            checkPlayResponse(opponetMoves, gameState, playerTwoStates, playerTwoData, dispatch, setOpponetIsPlaying);

            //playerTwoActions.push(...opponetMoves);

            setOpponetMoves([]);
      
        }   

    }, [gameState, opponetMoves, playerTwoActions, playerTwoData, playerTwoStates, dispatch]);


    const needed = (card) => {

        let availableMoves = availableMove(gameState.playerOne.cardAtHand, gameState.cardPlayed[gameState.cardPlayed.length - 1])

        //playerOneStates.push(createState(gameState, availableMoves, true, playerOneData))

        card.push(cardIndex(availableMoves, card[0]))

        playerOneActions.push(card)

        setIsLoading(true);
        setIsNeeded(false);
        setOpponetIsPlaying(false);
 
        let request = {agentName:  user, user: "Guest", gameState, playerMove: card, rules:rules}
    
        let index = gameState.playerOne.cardAtHand.indexOf("whot:20")
        gameState.playerOne.cardAtHand.splice(index, 1)
        gameState.cardPlayed.push(card[0])

        axios.post("/api/v1/play", request).then((res)=>{
            
            const response = res.data

            //check the type of response gotten from server
            checkPlayResponse(response, gameState, playerTwoStates, playerTwoData, dispatch, setOpponetIsPlaying)

            //remove loader from screen and transfer game control to player
            setOpponetIsPlaying(false);
            setIsLoading(false);

            //playerTwoActions.push(...response)
    
        }).catch((error) =>{

            //undo last move
            undoMove(gameState, card, dispatch);

            //remove loader and transfer game control back to player
            setIsLoading(false);
            setOpponetIsPlaying(false);

            alert(error)
            
        });

    };

    const playCard = (card) => {

        const availableMoves = availableMove(gameState.playerOne.cardAtHand, gameState.cardPlayed[gameState.cardPlayed.length - 1])

        card.push(cardIndex(availableMoves, card[0]))

        //playerOneActions.push(card)

        //playerOneStates.push(createState(gameState, availableMoves, true, playerOneData))

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

                //playerTwoActions.push(...response)
                
            }).catch((error) =>{

                //undo last move
                undoMove(gameState, card, dispatch);

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
                    //playerOneStates.pop()
                    //playerOneActions.pop()

                }else{
                    
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
     
                            //playerTwoActions.push(...response)

                        }).catch((error) => {

                            //undo last move
                            undoMove(gameState, card, dispatch);

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
        checkGameState(gameState, dispatch);
    }, [gameState, dispatch])

    if (isLoading) return(<center id="game-table"  className="game-table"><Loader /> </center>)

    return(
        <div>
        {
        //    <Modal text={"Network Error"} close={close} visibility={visibility} />
        }
            <center id="game-table"  className="game-table">

                <div>
                    
                    <Player top={0.2} angle={180} cards={opponetCard} action={playCard} playable={false} index={playerTwoCardIndex} />
                    <Player top={0.8} angle={0} cards={playerCard} action={playCard} playable={!opponetIsPlaying} index={playerOneCardIndex}/>
                    
                    { inPlay && <InPlay className="center" cards={inPlay} cardNumber={cardPlayed?.length} />  }

                    <Market action={playCard} playable={!opponetIsPlaying} cardNumber={gameState.market.length} />

                </div>

            </center>

            { isNeeded && <Need need={needed}/> }

        </div>

    )

}


export default GamePlay