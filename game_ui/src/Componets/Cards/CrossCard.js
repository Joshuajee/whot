import Cross from "../Shapes/Cross";

function CrossCard(props) {

    let size = props.size

    let width = size
    let height = size * 1.5
    let cWidth = width * 0.7
    let cHeight = height * 0.4
    let marginLeft = (width - cWidth) / 2
    let marginTop = (height - cHeight) / 2

    let firstCWidth = width * 0.7 * 0.2
    let firstCHeight = height * 0.4 * 0.2
    let firstMarginLeft = (width - cWidth) * 0.2 / 2
    let firstMarginTop = (height - cHeight) * 0.5 / 2

    let lastCWidth = width * 0.7 * 0.2
    let lastCHeight = height * 0.4 * 0.2
    let lastMarginLeft = (width - cWidth) * 5.5 / 2
    let lastMarginTop = (height - cHeight) * 2.5 / 2

    return(
        <svg className="card" width={width} height={height}>

            <Cross 
                width={firstCWidth} 
                height={firstCHeight} 
                marginLeft={firstMarginLeft} 
                marginTop={firstMarginTop} />

            <Cross 
                width={cWidth} 
                height={cHeight} 
                marginLeft={marginLeft} 
                marginTop={marginTop} />
            
            <Cross 
                width={lastCWidth} 
                height={lastCHeight} 
                marginLeft={lastMarginLeft} 
                marginTop={lastMarginTop} />
            
        
        </svg>
        )
}

export default CrossCard