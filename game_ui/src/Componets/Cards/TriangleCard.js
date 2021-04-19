/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2021 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */

 

import Triangle from "../Shapes/Triangle"
import Text from "../Shapes/Text"

function TriangleCard(props) {

    let size = props.size

    let width = size
    let height = size * 1.5

    //parameters for the big triangle
    let XA = width * 0.05
    let YA = height * 0.7
    let XB = width * 0.5
    let YB = height * 0.2
    let XC = width * 0.95
    let YC = height * 0.7

    //parameters for the top small triangle
    let firstXA = width * 0.03
    let firstYA = height * 0.21
    let firstXB = width * 0.1
    let firstYB = height * 0.12
    let firstXC = width * 0.17
    let firstYC = height * 0.21

    //parameters for the bottom small triangle
    let lastXA = width * 0.825
    let lastYA = height * 0.756
    let lastXB = width * 0.9
    let lastYB = height * 0.84
    let lastXC = width * 0.9775
    let lastYC = height * 0.756

    //parameters for the top small triangle number
    let topNumberMarginLeft = width * 0.01
    let topNumberMarginTop = height * 0.12

    //parameters for the top small triangle number
    let bottomNumberMarginLeft = width * 0.01
    let bottomNumberMarginTop = height * 0.18

    //fomt size calculation
    let fontSizeNumber = size / 5

    //number rotate for bottom number
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
                color={"brown"} />

            <Triangle 
                XA={firstXA} 
                YA={firstYA} 
                XB={firstXB} 
                YB={firstYB} 
                XC={firstXC} 
                YC={firstYC} />

            <Triangle 
                XA={XA} 
                YA={YA} 
                XB={XB} 
                YB={YB} 
                XC={XC} 
                YC={YC} />

            <Triangle 
                XA={lastXA} 
                YA={lastYA} 
                XB={lastXB} 
                YB={lastYB} 
                XC={lastXC} 
                YC={lastYC} />

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

export default TriangleCard