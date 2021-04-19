/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2021 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */


import React from "react"

import  "../Styles/modal.css"

class Modal extends React.Component{


    render(){
        let visibility = this.props.visibility
        let close = this.props.close

        
        return(
            <div>

                <div className={"modal " + visibility}>

                    <div className={"modal-content"}>

                        <span className="close" onClick={() => close("cccc")}>&times;</span>
                        
                        <center>{this.props.text}</center>
                    
                    </div>

                </div>

            </div>
        )

    }

}


export default Modal