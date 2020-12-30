import Text from "../Shapes/Text";

function WhotCard(props) {

    let size = props.size
    let width = size
    let height = size * 1.5
    let marginLeft = width / 5
    let marginTop = height / 2


    let firstMarginLeft = width * 0.1
    let firstMarginTop = height * 0.28
 

    let lastMarginLeft = width * 0.1 
    let lastMarginTop = height * 0.28
 

    return(
        <svg className="card" width={width} height={height}>

            <Text 
                x={0} y={0} z={0}
                marginLeft={firstMarginLeft} 
                marginTop={firstMarginTop} 
                text={"W"}
                fontSize={15} 
                color={"brown"}/>

            <Text 
                x={0} y={0} z={0}
                marginLeft={marginLeft} 
                marginTop={marginTop} 
                text={"Whot"}
                fontSize={25} 
                color={"brown"}/>

            <Text 
                x={180} y={50} z={80}
                marginLeft={marginLeft} 
                marginTop={marginTop} 
                text={"Whot"}
                fontSize={25}
                color={"brown"} />


            <Text 
                x={180} y={50} z={80}
                marginLeft={lastMarginLeft} 
                marginTop={lastMarginTop} 
                text={"W"}
                fontSize={15} 
                color={"brown"}/>


        </svg>
        )
}

export default WhotCard