import Text from "../Shapes/Text";

function CardCover(props) {

    let size = props.size
    let width = size
    let height = size * 1.5
    let marginLeft = width / 5
    let marginTop = height / 2
    let radius = width / 3

    let firstMarginLeft = width * 0.2 / 2
    let firstMarginTop = height * 0.4 / 2
    let firstRadius = width * 0.2 / 3

    let lastMarginLeft = width * 1.8 / 2
    let lastMarginTop = height * 1.6 / 2
    let lastRadius = width * 0.2 / 3

    return(
        <svg className="card card-cover" width={width} height={height}>

            <Text 
                x={0} y={0} z={0}
                marginLeft={marginLeft} 
                marginTop={marginTop} 
                text={"Whot"}
                fontSize={25}
                color={"white"} />

            <Text 
                x={180} y={50} z={80}
                marginLeft={marginLeft} 
                marginTop={marginTop} 
                text={"Whot"}
                fontSize={25}
                color={"white"} />


        </svg>
        )
}

export default CardCover