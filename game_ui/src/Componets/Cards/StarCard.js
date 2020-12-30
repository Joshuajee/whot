import Star from "../Shapes/Star";

function StarCard(props) {

    let size = props.size

    let width = size
    let height = size * 1.5

    let XCenter = width / 2
    let top = height * 0.2
    let XTop = height * 0.42
    let XTopLeft = width * 0.1
    let XTopRight = width * 0.9
    let bottom = height * 0.75
    let XBottomLeft = width * 0.2
    let XBottomRight = width * 0.8

    let firstXCenter = width * 0.2
    let firstTop = height * 0.14
    let firstXTop = height * 0.19
    let firstXTopLeft = width * 0.08
    let firstXTopRight = width * 0.32 
    let firstBottom = height * 0.28 
    let firstXBottomLeft = width * 0.12
    let firstXBottomRight = width * 0.28

    let lastXCenter = width  * 0.8
    let lastTop = height * 0.86
    let lastXTop = height * 0.81
    let lastXTopLeft = width * 0.92
    let lastXTopRight = width * 0.68
    let lastBottom = height * 0.72
    let lastXBottomLeft = width * 0.88
    let lastXBottomRight = width * 0.72
 


    return(
        <svg className="card" width={width} height={height}>

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
        
        </svg>
        )
}

export default StarCard