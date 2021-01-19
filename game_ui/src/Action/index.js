import axios from "axios"
import agents from "../../../models/agents"
import {START_GAME} from "./types"


const startGame = () =>{
    return function (dispatch) {
        axios.get("/agents")
    }
}