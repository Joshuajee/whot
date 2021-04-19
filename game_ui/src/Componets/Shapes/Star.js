/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2021 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */



function Star(props) {

    let XCenter = props.XCenter
    let top = props.top
    let XTop = props.XTop
    let XTopLeft = props.XTopLeft
    let XTopRight = props.XTopRight
    let bottom = props.bottom
    let XBottomLeft = props.XBottomLeft
    let XBottomRight = props.XBottomRight

    return(
        <svg>
            <g fill="brown">
                <polygon points = {XCenter + "," + 
                    top + ","  + XBottomLeft + "," 
                    + bottom + "," + XTopRight + ","
                    + XTop + "," + XTopLeft + "," 
                    + XTop + "," + XBottomRight 
                    + "," + bottom} />
            </g>
        </svg>
        ) 
}

export default Star