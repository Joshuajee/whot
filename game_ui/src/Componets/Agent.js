import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserCircle } from '@fortawesome/free-solid-svg-icons'
import Button from "./Button"
import axios from 'axios'

 

function Agent(props) {

    return(
        <div className="agents">

            <table>
                <tr>
                    <td>
                        <FontAwesomeIcon size="5x" color={"gray"} icon={faUserCircle} /> 
                    </td>

                    <td>
                        Name {props.agentName} <br/>
                        Wins  {props.wins} <br/>
                        Loss {props.losses} <br/>
                        points {parseFloat(props.points.toPrecision(6))} <br/>
                        <button 
                            onClick={() => play(props.agentName)} 
                            class={"btn-play"}>
                                Play Agent
                        </button>
                    </td>
                </tr>
            </table>

        </div>
        )
}

function play(agentName) {
    let rules = {"holdOn":{"active":true, "card":1, "defend":false},
    "pickTwo":{"active":true, "card":2, "defend":false},
    "pickThree":{"active":true, "card":5, "defend":false}, 
    "suspension":{"active":true, "card":8, "defend":false},
    "generalMarket":{"active":true, "card":14, "defend":false}
   } 
    axios.post("/api/game", {agentName, "user":"Guest", rule:rules}).then((error,  response)=>{
        console.log(response)
    })
    
}

export default Agent