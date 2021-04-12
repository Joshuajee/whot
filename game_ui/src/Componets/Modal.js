import React from "react"

import  "../Styles/modal.css"

function Modal(props){

    let visibility = props.state.visibility
    
    return(
        <div>

            <div className={"modal " + visibility}>

                <div className={"modal-content"}>

                    <span className="close" onClick={() =>{ visibility = "hide-modal"; alert(visibility)}}>&times;</span>
                    
                    <center>{props.text}</center>
                
                </div>

            </div>

        </div>
    )

}


export default Modal