import { EMPTY, GAME_STATE, HEIGHT, IS_LANDSCAPE, PLAYER_ONE_ACTION, PLAYER_ONE_INDEX, PLAYER_ONE_STATE, PLAYER_TWO_ACTION, PLAYER_TWO_INDEX, PLAYER_TWO_STATE, REMOVE_LAST, WIDTH } from "../constants/action-types";


export function updateGameState(payload) {
  console.log("Update GAME STATE", payload)
  return { type: GAME_STATE, payload };
}

export function updatePlayerOneStates(payload) {
  console.log("Update Player One States", payload)
  return { type: PLAYER_ONE_STATE, payload };
}

export function updatePlayerTwoStates(payload) {
  console.log("Update Player Two States", payload)
  return { type: PLAYER_TWO_STATE, payload };
}

export function updatePlayerOneActions(payload) {
  console.log("Update Player One Actions", payload)
  return { type: PLAYER_ONE_ACTION, payload };
}

export function updatePlayerTwoActions(payload) {
  console.log("Update Player Two Actions", payload)
  return { type: PLAYER_TWO_ACTION, payload };
}

export function removeLast(payload) {
  console.log("Remove Last", payload)
  return { type: REMOVE_LAST, payload };
}

export function empty() {
  console.log("Empty ");
  return { type: EMPTY };
}

export function setHeight(payload) {
  console.log("set Height", payload)
  return { type: HEIGHT, payload };
}

export function setWidth(payload) {
  console.log("Set Width", payload)
  return { type: WIDTH, payload };
}

export function setIsLandscape(payload) {
  console.log("Set Is Landscape", payload)
  return { type: IS_LANDSCAPE, payload };
}


export function updatePlayerOneCardIndex(payload) {
  console.log("Update Player One Card Index", payload)
  return { type: PLAYER_ONE_INDEX, payload };
}

export function updatePlayerTwoCardIndex(payload) {
  console.log("Update Player Two Card Index", payload)
  return { type: PLAYER_TWO_INDEX, payload };
}