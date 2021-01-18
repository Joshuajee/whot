import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserCircle } from '@fortawesome/free-solid-svg-icons'

 

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
                    </td>
                </tr>
            </table>

        </div>
        )
}

export default Agent