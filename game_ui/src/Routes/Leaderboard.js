/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2022 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */



import React, { useState, useEffect } from "react";
import Start from "../Componets/Background/Start";
import Agent from "../Componets/Agent";
import axios from "axios";
//import { useSelector, useDispatch } from "react-redux";

import Loader from "../Componets/Loader";
//import { increase } from "../Redux/actions";

const Leaderboard = () =>  {

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [agents, setAgents] = useState(null);
/*
    const counter = useSelector((state) => state.counter);

    const dispatch = useDispatch();

    console.log(counter)
*/

    useEffect(() => {

        setIsLoading(true);

        axios.get("/api/v1/leaderboard/0").then( res => {

            setData(res?.data?.data)
            setIsLoading(false)

        }, err => {

        });

    }, []);

    useEffect(() => {
        const agents = [];
    
        for (let i = 0; i < data?.length; i++) {
    
            agents.push(
                <Agent agentName={data[i].agentName} 
                    points={data[i].points}                             
                    wins={data[i].wins}
                    losses={data[i].losses} />);
        }

        setAgents(agents);

    }, [data]);

    
    if(isLoading) return (<Loader />);

    return(
        <div>

            <Start />

            <div className="leaderboard">

                {agents}

            </div>
            
        </div>
    )
}

export default React.memo(Leaderboard);