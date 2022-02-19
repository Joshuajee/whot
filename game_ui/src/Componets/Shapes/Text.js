/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2021 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */



function Text(props) {

    let text = props.text
    let fontSize = props.fontSize
    let x = props.x
    let y = props.y
    let z = props.z
    let color = props.color

    return(
        <svg >
            <g fill={color} transform={"rotate("+ x +" " + y + " " + z + ")"}>
                <text color={color}
                    x={props.marginLeft} 
                    y={props.marginTop}
                    fontSize={fontSize}>
                    {text}
                </text>
            </g>
        </svg>
        )
}

export default Text