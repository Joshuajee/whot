function Button(props) {

    return(
        <div>
            <button className={props.class} >
                {props.text}
            </button>
        </div>
        )
}

export default Button