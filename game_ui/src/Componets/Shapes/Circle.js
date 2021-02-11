/*
 * Copyright (C) 2021 Joshua Evuetapha
 * Twitter : @evuetaphajoshua
 * Github : @Joshuajee
 * This program is distributed under the MIT license
 */



function Circle(props) {

    return(
        <svg>
            <g fill="brown">
                <circle cx={props.marginLeft} cy={props.marginTop} r={props.radius} />
            </g>
        </svg>
        )
}

export default Circle