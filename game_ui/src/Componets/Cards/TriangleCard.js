import Triangle from "../Shapes/Triangle"
import Text from "../Shapes/Text"

function TriangleCard(props) {

    let size = props.size

    let width = size
    let height = size * 1.5

    let XA = width * 0.05
    let YA = height * 0.7
    let XB = width * 0.5
    let YB = height * 0.2
    let XC = width * 0.95
    let YC = height * 0.7

    let firstXA = width * 0.15 * 0.2
    let firstYA = height * 0.7 * 0.3
    let firstXB = width * 0.5 * 0.2
    let firstYB = height * 0.2 * 0.6
    let firstXC = width * 0.85 * 0.2
    let firstYC = height * 0.7 * 0.3

    let lastXA = width * 0.15 * 5.5
    let lastYA = height * 0.7 * 1.08
    let lastXB = width * 0.5 * 1.8 
    let lastYB = height * 0.2 * 4.2
    let lastXC = width * 0.85 * 1.15
    let lastYC = height * 0.7 * 1.08

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