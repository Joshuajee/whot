import {    GAME_STATE, PLAYER_ONE_ACTION, PLAYER_ONE_INDEX, PLAYER_ONE_STATE, PLAYER_TWO_ACTION, PLAYER_TWO_INDEX, PLAYER_TWO_STATE,   } from "../constants/action-types";
import defaults from "./../../GameEnv/cards/defaults";

const initials = defaults();

const initialState = {
    gameState: initials.gameState,
    playerOneStates: initials.playerOneStates,
    playerTwoStates: initials.playerTwoStates,
    playerOneActions: initials.playerOneActions,
    playerTwoActions: initials.playerTwoActions,
    playerOneCardIndex: initials.playerOneCardIndex,
    playerTwoCardIndex: initials.playerTwoCardIndex,
};
  
console.log(initialState)
function rootReducer(state = initialState, action) {

    console.log("Action Type", action.type)

    const payload = action.payload

    switch (action.type) {
        case GAME_STATE:
            return { ...state, gameState: payload }
        case PLAYER_ONE_STATE:
            return { ...state, playOneStates: [...state.playOneStates, payload] }
        case PLAYER_TWO_STATE:
            return { ...state, playTwoStates: [...state.playTwoStates, payload] }
        case PLAYER_ONE_ACTION:
            return { ...state, playOneActions: [...state.playOneActions, payload] }
        case PLAYER_TWO_ACTION:
            return { ...state, playTwoActions: [...state.playTwoActions, payload] }
        case PLAYER_ONE_INDEX:
            return { ...state, playerOneIndex: payload }
        case PLAYER_TWO_INDEX:
            return { ...state, playerTwoIndex: payload }
        default:
            return state
    }
};
  

export default rootReducer;