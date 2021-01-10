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