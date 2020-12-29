import Square from "../Shapes/Square";
import Triangle from "../Shapes/Triangle";

function TriangleCard(props) {

    let size = props.size

    let width = size
    let height = size * 1.5

    let XA = width * 0.05
    let YA = height * 0.7
    let XB = width * 0.5
    let YB = height * 0.2
    let XC = width * 0.95
    let YC = height * 0.7

    let firstXA = width * 0.15 * 0.2
    let firstYA = height * 0.7 * 0.3
    let firstXB = width * 0.5 * 0.2
    let firstYB = height * 0.2 * 0.6
    let firstXC = width * 0.85 * 0.2
    let firstYC = height * 0.7 * 0.3

    let lastXA = width * 0.15 * 5.5
    let lastYA = height * 0.7 * 1.08
    let lastXB = width * 0.5 * 1.8 
    let lastYB = height * 0.2 * 4.2
    let lastXC = width * 0.85 * 1.15
    let lastYC = height * 0.7 * 1.08

    return(
        <svg className="card" width={width} height={height}>

            <Triangle 
                XA={firstXA} 
                YA={firstYA} 
                XB={firstXB} 
                YB={firstYB} 
                XC={firstXC} 
                YC={firstYC} />

            <Triangle 
                XA={XA} 
                YA={YA} 
                XB={XB} 
                YB={YB} 
                XC={XC} 
                YC={YC} />

            <Triangle 
                XA={lastXA} 
                YA={lastYA} 
                XB={lastXB} 
                YB={lastYB} 
                XC={lastXC} 
                YC={lastYC} />
        
        </svg>
        )
}

export default TriangleCard