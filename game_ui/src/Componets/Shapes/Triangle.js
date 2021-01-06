function Triangle(props) {

    let XA = props.XA
    let YA = props.YA
    let XB = props.XB
    let YB = props.YB
    let XC = props.XC
    let YC = props.YC

    return(
        <svg>
            <g fill="brown">
                <polygon points= {XA + "," + YA + "," + XB + "," + YB + "," + XC + "," + YC}  />
            </g>
        </svg>
        )
}

export default Triangle