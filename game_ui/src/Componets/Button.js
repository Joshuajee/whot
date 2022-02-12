/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2021 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */



import {Link} from 'react-router-dom'

function Button(props) {

    return(
        <div>
            <Link to={props.link}>
                <button className={props.class} >
                    {props.text}
                </button>
            </Link>
        </div>
        )
}

export default Button