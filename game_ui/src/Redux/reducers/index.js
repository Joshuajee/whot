import {    EMPTY, GAME_STATE, HEIGHT, IS_LANDSCAPE, PLAYER_ONE_ACTION, PLAYER_ONE_INDEX, PLAYER_ONE_STATE, PLAYER_TWO_ACTION, PLAYER_TWO_INDEX, PLAYER_TWO_STATE, REMOVE_LAST, WIDTH,   } from "../constants/action-types";
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
    height: window.innerHeight,
    width: window.innerWidth,
    isLandscape: true
};
  
function rootReducer(state = initialState, action) {

    console.log("Action Type", action.type)

    const payload = action.payload

    switch (action.type) {
        case GAME_STATE:
            return { ...state, gameState: payload }
        case PLAYER_ONE_STATE:
            return { ...state, playerOneStates: [...state.playerOneStates, payload] }
        case PLAYER_TWO_STATE:
            return { ...state, playerTwoStates: [...state.playerTwoStates, payload] }
        case PLAYER_ONE_ACTION:
            return { ...state, playerOneActions: [...state.playerOneActions, payload] }
        case PLAYER_TWO_ACTION:
            return { ...state, playerTwoActions: [...state.playerTwoActions, payload] }
        case PLAYER_ONE_INDEX:
            return { ...state, playerOneCardIndex: payload }
        case PLAYER_TWO_INDEX:
            return { ...state, playerTwoIndex: payload }
        case REMOVE_LAST:
            payload.pop();
            return { ...state, payload }
        case EMPTY:

            state.playerOneActions = [];
            state.playerOneStates = [];
            state.playerTwoActions = [];
            state.playerTwoStates = [];

            return state
        case HEIGHT:
            return { ...state, height: payload }
        case WIDTH:
            return { ...state, width: payload }
        case IS_LANDSCAPE:
            return { ...state, isLandscape: payload }
        default:
            return state
    }
};
  

export default rootReducer;