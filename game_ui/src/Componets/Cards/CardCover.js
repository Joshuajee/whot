/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2021 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */



import Text from "../Shapes/Text";

function CardCover(props) {

    let size = props.size
    let width = size
    let height = size * 1.5

    let marginLeftOne = width / 5
    let marginTopOne = height / 2.1

    let marginLeftTwo = width / 5
    let marginTopTwo = height / 1.9

    let fontSize = size / 4

    let rotateY = width * 0.5
    let rotateZ = width * 0.8


    return(
        <svg className="card card-cover" width={width} height={height}>

            <Text 
                x={0} y={0} z={0}
                marginLeft={marginLeftOne} 
                marginTop={marginTopOne} 
                text={"Whot"}
                fontSize={fontSize}
                color={"white"} />

            <Text 
                x={180} y={rotateY} z={rotateZ}
                marginLeft={marginLeftTwo} 
                marginTop={marginTopTwo} 
                text={"Whot"}
                fontSize={fontSize}
                color={"white"} />


        </svg>
        )
}

export default CardCover