import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { updateGameState } from "../../Redux/actions";

const Modal = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const { content, close } = props;

    const { height, width, isLandscape } = useSelector((state) => state);

    const {type, text, endGame} = content;

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

                { endGame && (
                    <div> 
                        <button onClick={() =>  {
                            dispatch(updateGameState(null));
                            history.goBack();
                            }}>Back</button> 
                        <button onClick={() => {
                            dispatch(updateGameState(null));
                            close(null);
                        }}>Play Again</button>
                    </div>
                )}
            
            </div>

        </div>
    );
}

export default Modal