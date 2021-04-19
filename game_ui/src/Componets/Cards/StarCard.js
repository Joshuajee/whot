/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2021 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */


import Star from "../Shapes/Star"
import Text from "../Shapes/Text";


function StarCard(props) {

    let size = props.size

    let width = size
    let height = size * 1.5

    //parameters for the big center star
    let XCenter = width / 2
    let top = height * 0.2
    let XTop = height * 0.42
    let XTopLeft = width * 0.1
    let XTopRight = width * 0.9
    let bottom = height * 0.75
    let XBottomLeft = width * 0.2
    let XBottomRight = width * 0.8

    //parameters for the top left star
    let firstXCenter = width * 0.24
    let firstTop = height * 0.12
    let firstXTop = height * 0.195
    let firstXTopLeft = width * 0.08
    let firstXTopRight = width * 0.382
    let firstBottom = height * 0.32
    let firstXBottomLeft = width * 0.12
    let firstXBottomRight = width * 0.34

    //parameters for the bottom right star
    let lastXCenter = width  * 0.8
    let lastTop = height * 0.9
    let lastXTop = height * 0.83
    let lastXTopLeft = width * 0.94
    let lastXTopRight = width * 0.66
    let lastBottom = height * 0.72
    let lastXBottomLeft = width * 0.9
    let lastXBottomRight = width * 0.7

    //parameters for the top right number
    let topNumberMarginLeft = width * 0.01
    let topNumberMarginTop = height * 0.12

    //parameters for the bottom left number
    let bottomNumberMarginLeft = width * 0.01
    let bottomNumberMarginTop = height * 0.18

    //parameters for the top right number in star
    let topStarNumberMarginLeft = width * 0.21
    let topStarNumberMarginTop = height * 0.25

    //parameters for the bottom left number in star
    let bottomStarNumberMarginLeft = width * 0.17
    let bottomStarNumberMarginTop = height * 0.295

    if(props.number > 4){
        //parameters for the top right number in star
        topStarNumberMarginLeft = width * 0.17
        topStarNumberMarginTop = height * 0.25

        //parameters for the bottom left number in star
        bottomStarNumberMarginLeft = width * 0.14
        bottomStarNumberMarginTop = height * 0.295
    }
    
    //fonts
    let fontSizeNumber = size / 5
    let fontSizeNumberStar = size / 10

    //rotation
    let rotateY = width * 0.5
    let rotateZ = width * 0.8 

    //card number
    let number = parseInt(props.number)
    let number_ = number * 2
    if(props.need){ 
        number = ""
        number_ = ""
    }
        
 

    return(
        <svg className="card" width={width} height={height}>

            <Text 
                x={0} y={0} z={0}
                marginLeft={topNumberMarginLeft} 
                marginTop={topNumberMarginTop} 
                text={number}
                fontSize={fontSizeNumber} 
                color={"brown"} />

            <Star 
                XCenter={firstXCenter} 
                top={firstTop} 
                XTop={firstXTop}
                XTopLeft={firstXTopLeft}
                XTopRight={firstXTopRight}
                bottom={firstBottom}
                XBottomLeft={firstXBottomLeft} 
                XBottomRight={firstXBottomRight}

                />

            <Text
                x={0} y={0} z={0}
                marginLeft={topStarNumberMarginLeft} 
                marginTop={topStarNumberMarginTop} 
                text={number_}
                fontSize={fontSizeNumberStar} 
                color={"white"} />
        
            <Star 
                XCenter={XCenter} 
                top={top} 
                XTop={XTop}
                XTopLeft={XTopLeft}
                XTopRight={XTopRight}
                bottom={bottom}
                XBottomLeft={XBottomLeft} 
                XBottomRight={XBottomRight}

                />

            <Star 
                XCenter={lastXCenter} 
                top={lastTop} 
                XTop={lastXTop}
                XTopLeft={lastXTopLeft}
                XTopRight={lastXTopRight}
                bottom={lastBottom}
                XBottomLeft={lastXBottomLeft} 
                XBottomRight={lastXBottomRight}

                />

            <Text 
                x={180} y={rotateY} z={rotateZ}
                marginLeft={bottomNumberMarginLeft} 
                marginTop={bottomNumberMarginTop} 
                text={number}
                fontSize={fontSizeNumber} 
                color={"brown"}/>

            <Text 
                x={180} y={rotateY} z={rotateZ}
                marginLeft={bottomStarNumberMarginLeft} 
                marginTop={bottomStarNumberMarginTop} 
                text={number_}
                fontSize={fontSizeNumberStar} 
                color={"white"}/>

       
        
        </svg>
        )
}

export default StarCard