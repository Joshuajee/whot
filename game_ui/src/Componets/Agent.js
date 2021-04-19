/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2021 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserCircle } from '@fortawesome/free-solid-svg-icons'
import Button from "./Button"

 

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
                        <Button text={"Play Agent"}  class={"btn-play"} link={"/game/:" + props.agentName} />
    
                    </td>
                </tr>
            </table>

        </div>
        )
}


export default Agent