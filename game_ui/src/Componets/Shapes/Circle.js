function Circle(props) {

    return(
        <svg>
            <g fill="brown">
                <circle cx={props.marginLeft} cy={props.marginTop} r={props.radius} />
            </g>
        </svg>
        )
}

export default Circle