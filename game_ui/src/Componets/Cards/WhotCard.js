import Text from "../Shapes/Text"

function WhotCard(props) {

    let size = props.size
    let width = size
    let height = size * 1.5

    let marginLeftOne = width / 5
    let marginTopOne = height / 2.1

    let marginLeftTwo = width / 5
    let marginTopTwo = height / 1.9

    let firstMarginLeft = width * 0.1
    let firstMarginTop = height * 0.25
 
    let lastMarginLeft = width * 0.1 
    let lastMarginTop = height * 0.3

    let topNumberMarginLeft = width * 0.01
    let topNumberMarginTop = height * 0.12

    let bottomNumberMarginLeft = width * 0.01
    let bottomNumberMarginTop = height * 0.18

    let fontSize = size / 4
    let fontSizeSymbol = size / 6
    let fontSizeNumber = size / 5

    let rotateY = width * 0.5
    let rotateZ = width * 0.8

    return(
        <svg className="card" width={width} height={height}>


            <Text 
                x={0} y={0} z={0}
                marginLeft={topNumberMarginLeft} 
                marginTop={topNumberMarginTop} 
                text={20}
                fontSize={fontSizeNumber} 
                color={"brown"}/>

            <Text 
                x={0} y={0} z={0}
                marginLeft={firstMarginLeft} 
                marginTop={firstMarginTop} 
                text={"W"}
                fontSize={fontSizeSymbol} 
                color={"brown"}/>

            <Text 
                x={0} y={0} z={0}
                marginLeft={marginLeftOne} 
                marginTop={marginTopOne} 
                text={"Whot"}
                fontSize={fontSize} 
                color={"brown"}/>

            <Text 
                x={180} y={rotateY} z={rotateZ}
                marginLeft={marginLeftTwo} 
                marginTop={marginTopTwo} 
                text={"Whot"}
                fontSize={fontSize}
                color={"brown"} />


            <Text 
                x={180} y={rotateY} z={rotateZ}
                marginLeft={lastMarginLeft} 
                marginTop={lastMarginTop} 
                text={"W"}
                fontSize={fontSizeSymbol} 
                color={"brown"}/>

            <Text 
                x={180} y={rotateY} z={rotateZ}
                marginLeft={bottomNumberMarginLeft} 
                marginTop={bottomNumberMarginTop} 
                text={20}
                fontSize={fontSizeNumber} 
                color={"brown"}/>


        </svg>
        )
}

export default WhotCard