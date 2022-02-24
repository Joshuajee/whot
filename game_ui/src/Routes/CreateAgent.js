/**
 * @author Joshua Evuetapha
 * @copyright (C) 2022 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */


import { useState } from "react";
import Start from "../Componets/Background/Start";
import FormInput from "../Componets/FormInput";
import "../Styles/form.css";
import axios from "axios";
import Loader from "../Componets/Loader";


const form = {
    agentName: "",
    availableMove: true,
    canGoMarket: true,
    canNeedAnyCard: true,
    cardAtHand: false,
    noOfCardAtHand: false,
    cardInPlay: false,
    cardPlayed: false,
    noOfCardPlayed: false,
    noOfCardsInMarket: false,
    noOfCardsWithOpponent: false,
    rules: false
}
 
const CreateAgent = () => {

    const [formData, setFormData] = useState(form);
    const [isLoading, setIsLoading] = useState(false);



    function handleEvent(e){

        const name = e.target.name
        const value = e.target.value

        setFormData(e => {
            e[name] = value;
            return e;
        })

    }

    function submit(e){

        e.preventDefault();

        setIsLoading(false);
    
        axios.post('/api/v1/create-agent', {agent: formData}).then((res)=>{
            
            alert(res.data.msg)

            setIsLoading(true);

            if(res.data.status){

            }

        })

    }


    if(isLoading) return (<Loader />);
    
    return(
        <>
 
            <Start />
            
            <div class="container">

                <form method="post" action='/api/create-agent'>

                    <div class="row">
                        <h3>Create Agent</h3>
                    </div>

                    <FormInput label="Agent Name" type={"text"} identifier={"agentName"} onChange={handleEvent} />

                    

                    <div class="row">

                        <h5>Agent Settings</h5> <br/> 

                        <p>
                            select yes if you want the agent to considered these fields while learning
                        </p>
                        
                    </div>

                    
                    <div class="row">

                        <div class="col-25">

                            <label for="avialableMove">Available Move</label>
                        
                        </div>

                        <div class="col-75">
                        
                            <select id="avialableMove" name="avialableMove" disabled>
                                
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            
                            </select>

                        </div>

                    </div>

                    <FormInput label="Can Go Market" type={"select"} identifier={"canGoMarket"} onChange={handleEvent} yes />

                    <FormInput label="Can Need Any Card" type={"select"} identifier={"canNeedAnyCard"} onChange={handleEvent} yes />

                    <FormInput label="Cards At Hand" type={"select"} identifier={"cardAtHand"} onChange={handleEvent} />

                    <FormInput label="No Cards At Hand" type={"select"} identifier={"noOfCardAtHand"} onChange={handleEvent} />

                    <FormInput label="Card In Play" type={"select"} identifier={"cardInPlay"} onChange={handleEvent} />

                    <FormInput label="Card Played" type={"select"} identifier={"cardPlayed"} onChange={handleEvent} />

                    <FormInput label="No Cards Played" type={"select"} identifier={"noOfCardPlayed"} onChange={handleEvent} />

                    <FormInput label="Number Of Cards In Market" type={"select"} identifier={"noOfCardsInMarket"} onChange={handleEvent} />

                    <FormInput label="Number Of Cards With Opponent" type={"select"} identifier={"noOfCardsWithOpponent"} onChange={handleEvent} />

                    <FormInput label="Rules" type={"select"} identifier={"rules"} onChange={handleEvent} />

                    <div class="row" style={{marginTop:20}}>   <input type="submit" value="Submit" onClick={submit}/> </div>

                </form>

            </div>
            
        </>
     )
 
 }
 
 export default CreateAgent