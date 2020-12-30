function Text(props) {

    let text = props.text
    let fontSize = props.fontSize
    let x = props.x
    let y = props.y
    let z = props.z
    let color = props.color

    return(
        <svg >
            <g fill={color} className="center" transform={"rotate("+ x +" " + y + " " + z + ")"}>
                <text 
                    x={props.marginLeft} 
                    y={props.marginTop}
                    font-size={fontSize}>
                    {text}
                </text>
            </g>
        </svg>
        )
}

export default Text