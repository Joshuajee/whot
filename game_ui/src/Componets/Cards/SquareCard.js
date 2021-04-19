/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2021 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */



import Square from "../Shapes/Square"
import Text from "../Shapes/Text";

function SquareCard(props) {

    let size = props.size

    let width = size
    let height = size * 1.5
    let cWidth = width * 0.7
    let cHeight = height * 0.4
    let marginLeft = (width - cWidth) / 2
    let marginTop = (height - cHeight) / 2

    let firstCWidth = marginLeft * 0.8
    let firstCHeight = marginLeft * 0.8
    let firstMarginLeft = marginLeft * 0.2
    let firstMarginTop = marginLeft * 1.6

    let lastCWidth = marginLeft * 0.8
    let lastCHeight = marginLeft * 0.8
    let lastMarginLeft = cWidth + marginLeft
    let lastMarginTop = height - marginLeft * 2.4

    let topNumberMarginLeft = width * 0.01
    let topNumberMarginTop = height * 0.12

    let bottomNumberMarginLeft = width * 0.01
    let bottomNumberMarginTop = height * 0.18

    let fontSizeNumber = size / 5

    let rotateY = width * 0.5
    let rotateZ = width * 0.8


    return(
        <svg className="card" width={width} height={height}>

            <Text 
                x={0} y={0} z={0}
                marginLeft={topNumberMarginLeft} 
                marginTop={topNumberMarginTop} 
                text={props.number}
                fontSize={fontSizeNumber} 
                color={"brown"}/>

            <Square 
                width={firstCWidth} 
                height={firstCHeight} 
                marginLeft={firstMarginLeft} 
                marginTop={firstMarginTop} />

            <Square 
                width={cWidth} 
                height={cHeight} 
                marginLeft={marginLeft} 
                marginTop={marginTop} />

            <Square 
                width={lastCWidth} 
                height={lastCHeight} 
                marginLeft={lastMarginLeft} 
                marginTop={lastMarginTop} />

            <Text 
                x={180} y={rotateY} z={rotateZ}
                marginLeft={bottomNumberMarginLeft} 
                marginTop={bottomNumberMarginTop} 
                text={props.number}
                fontSize={fontSizeNumber} 
                color={"brown"}/>
        
        </svg>
        )
}

export default SquareCard