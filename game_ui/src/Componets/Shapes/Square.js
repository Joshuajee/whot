
function Square(props) {

    return(
        <svg >
            <g fill="brown" className="center">
                <rect x={props.marginLeft} y={props.marginTop} width={props.width} height={props.height}/>
            </g>
        </svg>
        )
}

export default Square