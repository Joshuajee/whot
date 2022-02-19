/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2021 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */



import Circle from "../Shapes/Circle"
import Text from "../Shapes/Text"

function CircleCard(props) {

    let size = props.size
    let width = size
    let height = size * 1.5
    let marginLeft = width / 2
    let marginTop = height / 2
    let radius = width / 3

    let firstMarginLeft = width * 0.2 / 2
    let firstMarginTop = height * 0.4 / 2
    let firstRadius = width * 0.2 / 3

    let lastMarginLeft = width * 1.8 / 2
    let lastMarginTop = height * 1.6 / 2
    let lastRadius = width * 0.2 / 3

    let topNumberMarginLeft = width * 0.01
    let topNumberMarginTop = height * 0.12

    let bottomNumberMarginLeft = width * 0.01
    let bottomNumberMarginTop = height * 0.18
 
    let fontSize = size / 5

    let rotateY = width * 0.5
    let rotateZ = width * 0.8


    return(
        <svg className="card" width={width} height={height}>

            <Text 
                x={0} y={0} z={0}
                marginLeft={topNumberMarginLeft} 
                marginTop={topNumberMarginTop} 
                text={props.number}
                fontSize={fontSize} 
                color={"brown"}/>

            <Circle 
                marginLeft={firstMarginLeft} 
                marginTop={firstMarginTop} 
                radius={firstRadius} />

            <Circle 
                marginLeft={marginLeft} 
                marginTop={marginTop} 
                radius={radius} />

            <Circle 
                marginLeft={lastMarginLeft} 
                marginTop={lastMarginTop} 
                radius={lastRadius} />

            <Text 
                x={180} y={rotateY} z={rotateZ}
                marginLeft={bottomNumberMarginLeft} 
                marginTop={bottomNumberMarginTop} 
                text={props.number}
                fontSize={fontSize} 
                color={"brown"}/>
        
        </svg>
        )
}

export default CircleCard