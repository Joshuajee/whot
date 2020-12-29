import Circle from "../Shapes/Circle";

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

    return(
        <svg className="card" width={width} height={height}>

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
        
        </svg>
        )
}

export default CircleCard