/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2021 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */



function Square(props) {

    return(
        <svg >
            <g fill="brown" className="center">
                <rect x={props.marginLeft} y={props.marginTop} width={props.width} height={props.height}/>
            </g>
        </svg>
        )
}

export default Square