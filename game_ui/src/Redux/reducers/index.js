import {    GAME_STATE  } from "../constants/action-types";

const initialState = {
    gameState: null,
    counter: 0
};
  
function rootReducer(state = initialState, action) {

    console.log("Action Type", action.type)

    const payload = action.payload

    switch (action.type) {
        case GAME_STATE:
            return { ...state, gameState: payload }
        case 'increment-counter':
            return { ...state, counter: payload }
        default:
            return state
    }
};
  

export default rootReducer;