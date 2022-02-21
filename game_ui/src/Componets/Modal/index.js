import { useState, useEffect } from "react";

const Modal = (props) => {

    const { content, close, height, width, isLandscape } = props;

    const {type, text} = content;

    const [style, setStyle] = useState({});

    useEffect(() => {

        if (isLandscape) {
            setStyle({height: height, width: width});
        } else {
            setStyle({height: width, width: height});
        }
    
    }, [width, height, isLandscape]);

    return (
        <div className={"modal"} style={style} >

            <div className={"modal-content"}>

                <div className="close" onClick={() => close(null)}>   &times;    </div>

                <h2> {type} </h2>
                
                <p> {text} </p>
            
            </div>

        </div>
    );
}

export default Modal