import { GAME_STATE } from "../constants/action-types";


export function gameState(payload) {
  console.log("GAME STATE", payload)
  return { type: GAME_STATE, payload };
}


export function increase(payload) {
  console.log("increment-counter", payload)
  return { type: 'increment-counter', payload };
}
