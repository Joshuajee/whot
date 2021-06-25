function FormInput(props){

    let identifier = props.identifier

    if(props.type === "text")
        return(
            <div class="row">

                <div class="col-25"> <label for={identifier}>{props.label}</label> </div>

                <div class="col-75">

                    <input type="text" required id={identifier} name={identifier} onChange={props.onChange} placeholder="eg Joe" />
                
                </div>

            </div>
        )

    if(props.yes)
    return(
        <div class="row">

            <div class="col-25"><label for={identifier}>{props.label}</label></div>

            <div class="col-75">

                <select id={identifier} name={identifier} onChange={props.onChange} >
                    
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                
                </select>

            </div>

        </div>
        
    )

    return(
        <div class="row">

            <div class="col-25"><label for={identifier}>{props.label}</label></div>

            <div class="col-75">

                <select id={identifier} name={identifier} onChange={props.onChange} >
                    
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                
                </select>

            </div>

        </div>
        
    )
}

export default FormInput