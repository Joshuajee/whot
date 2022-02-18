import { GAME_STATE, PLAYER_ONE_STATE, PLAYER_TWO_STATE } from "../constants/action-types";


export function updateGameState(payload) {
  console.log("Update GAME STATE", payload)
  return { type: GAME_STATE, payload };
}

export function updatePlayerOneState(payload) {
  console.log("Update Player One State", payload)
  return { type: PLAYER_ONE_STATE, payload };
}

export function updatePlayerTwoState(payload) {
  console.log("Update Player Two State", payload)
  return { type: PLAYER_TWO_STATE, payload };
}

