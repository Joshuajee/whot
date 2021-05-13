/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2021 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */



import Start from "../Componets/Background/Start";
import FormInput from "../Componets/FormInput"
import "../Styles/form.css"

import axios from "axios"
 
 
 function CreateAgent() {

    let formData ={
        agentName: "",
        availableMove: true,
        cardAtHand: false,
        noOfCardAtHand: false,
        cardInPlay: false,
        cardsPlayed: false,
        noOfCardPlayed: false,
        noOfCardsInMarket: false,
        noOfCardsWithOpponent: false,
        rules: false
    }

    function handleEvent(e){

        const name = e.target.name
        const value = e.target.value

        formData ={
            agentName: name === "agentName" ? value : formData.agentName,
            availableMove: name === "availableMove" ? value === "true" ? true : false : formData.availableMove,
            cardAtHand: name === "cardAtHand" ? value === "true" ? true : false : formData.cardAtHand,
            noOfCardAtHand: name === "noOfCardAtHand" ? value === "true" ? true : false : formData.noOfCardAtHand,
            cardInPlay: name === "cardInPlay" ? value === "true" ? true : false : formData.cardInPlay,
            cardPlayed: name === "cardPlayed" ? value === "true" ? true : false : formData.cardPlayed,
            noOfCardPlayed: name === "noOfCardPlayed" ? value === "true" ? true : false : formData.noOfCardPlayed,
            noOfCardsInMarket: name === "noOfCardsInMarket" ? value === "true" ? true : false : formData.noOfCardsInMarket,
            noOfCardsWithOpponent: name === "noOfCardsWithOpponent" ? value === "true" ? true : false : formData.noOfCardsWithOpponent,
            rules: name === "rules" ? value === "true" ? true : false : formData.rules
        }


        console.log(formData)


    }

    function submit(e){

        e.preventDefault()

        axios.post('/api/create-agent', {agent: formData}).then((res)=>{
            
            //console.log(res)  
            alert(res.data.msg)

            if(res.data.success){
                /*
                formData ={
                    agentName: name === "agentName" ? value : formData.agentName,
                    availableMove: name === "availableMove" ? value === "true" ? true : false : formData.availableMove,
                    cardAtHand: name === "cardAtHand" ? value === "true" ? true : false : formData.cardAtHand,
                    noOfCardAtHand: name === "noOfCardAtHand" ? value === "true" ? true : false : formData.noOfCardAtHand,
                    cardInPlay: name === "cardInPlay" ? value === "true" ? true : false : formData.cardInPlay,
                    cardPlayed: name === "cardPlayed" ? value === "true" ? true : false : formData.cardPlayed,
                    noOfCardPlayed: name === "noOfCardPlayed" ? value === "true" ? true : false : formData.noOfCardPlayed,
                    noOfCardsInMarket: name === "noOfCardsInMarket" ? value === "true" ? true : false : formData.noOfCardsInMarket,
                    noOfCardsWithOpponent: name === "noOfCardsWithOpponent" ? value === "true" ? true : false : formData.noOfCardsWithOpponent,
                    rules: name === "rules" ? value === "true" ? true : false : formData.rules
                }  

                */

            }
           // this.setState({isLoading:false, opponetIsPlaying:false, gameState:res.data})

        })
    }

    
 
     return(
         <center>
 
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
            
         </center>
     )
 
 }
 
 export default CreateAgent