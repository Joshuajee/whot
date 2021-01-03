import Text from "../Shapes/Text";

function CardCover(props) {

    let size = props.size
    let width = size
    let height = size * 1.5

    let marginLeftOne = width / 5
    let marginTopOne = height / 2.1

    let marginLeftTwo = width / 5
    let marginTopTwo = height / 1.9

    return(
        <svg className="card card-cover" width={width} height={height}>

            <Text 
                x={0} y={0} z={0}
                marginLeft={marginLeftOne} 
                marginTop={marginTopOne} 
                text={"Whot"}
                fontSize={25}
                color={"white"} />

            <Text 
                x={180} y={50} z={80}
                marginLeft={marginLeftTwo} 
                marginTop={marginTopTwo} 
                text={"Whot"}
                fontSize={25}
                color={"white"} />


        </svg>
        )
}

export default CardCover