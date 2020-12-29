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


    let XCenter = width / 2
    let top = height * 0.2
    let XTop = height * 0.42
    let XTopLeft = width * 0.1
    let XTopRight = width * 0.9
    let bottom = height * 0.75
    let XBottomLeft = width * 0.2
    let XBottomRight = width * 0.8

    let XCenter = width / 2
    let top = height * 0.2
    let XTop = height * 0.42
    let XTopLeft = width * 0.1
    let XTopRight = width * 0.9
    let bottom = height * 0.75
    let XBottomLeft = width * 0.2
    let XBottomRight = width * 0.8
 


    return(
        <svg className="card" width={width} height={height}>

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
                XCenter={XCenter} 
                top={top} 
                XTop={XTop}
                XTopLeft={XTopLeft}
                XTopRight={XTopRight}
                bottom={bottom}
                XBottomLeft={XBottomLeft} 
                XBottomRight={XBottomRight}

                />
        
        </svg>
        )
}

export default StarCard