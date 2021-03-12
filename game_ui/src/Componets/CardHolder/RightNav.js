/*
 * Copyright (C) 2021 Joshua Evuetapha
 * Twitter : @evuetaphajoshua
 * Github : @Joshuajee
 * This program is distributed under the MIT license
 */


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'


function RightNav(props) {
    
    let width = window.innerWidth
    let height = window.innerHeight
    let cardSize = height / 10
    let margin = (width / 2) + cardSize * 0.6666666667 - width * 0.2


    const style = {
        position:"absolute",
        top:height * props.top - cardSize,
        right: margin,
        align:"center",
        width: (width - margin * 2)
    }

    return(
        <div style={style}>
            <span onClick={() => props.action("right")}>
            <FontAwesomeIcon size="3x" color={"blue"} icon={faArrowLeft} /> 
            </span>
        </div>
        )

}



export default RightNav