/*
 * Copyright (C) 2021 Joshua Evuetapha
 * Twitter : @evuetaphajoshua
 * Github : @Joshuajee
 * This program is distributed under the MIT license
 */



import React from "react"
import Start from "../Componets/Background/Start";
import Agent from "../Componets/Agent";
import axios from "axios"

class Leaderboard extends React.Component {

    constructor(){

        super()

        this.state = {
            isLoading:true,
            response:{}
        }


    }

    componentDidMount(){
        axios.get("/api/leaderboard/0").then((response) =>{
            console.log(response)
            this.setState({
                isLoading:false,
                response:response.data
            })
        })
    }
    
    render(){

        if(this.state.isLoading) return (<div>Loading</div>)
        let data = this.state.response
        let agents = []
        for (let i = 0; i < data.length; i++) {
            agents.push(<Agent agentName={data[i].agentName} 
                            points={data[i].points} 
                            wins={data[i].wins}
                            losses={data[i].losses} />)
        }

        return(
            <div>

                <Start />

                <div className="leaderboard">

                    {agents}

                </div>
                
            </div>
        )
    }

}

export default Leaderboard