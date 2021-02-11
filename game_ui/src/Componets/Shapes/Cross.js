/*
 * Copyright (C) 2021 Joshua Evuetapha
 * Twitter : @evuetaphajoshua
 * Github : @Joshuajee
 * This program is distributed under the MIT license
 */



function Cross(props) {

    return(
        <svg >
            <g fill="brown">
                <rect x={props.marginLeft + props.width / 4} y={props.marginTop} width={props.width / 2} height={props.height}/>
                <rect x={props.marginLeft} y={props.marginTop + props.height / 4} width={props.width} height={props.height / 2}/>
            </g>
        </svg>
        )
}

export default Cross