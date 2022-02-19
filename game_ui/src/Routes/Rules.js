/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2022 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */


import Whot from "../Componets/Background/Whot"


const Rules = () => {


    return(

            <div>
                <Whot />

                <center style={{marginTop:"30vh"}}>

                    <table>

                        <thead>

                            <tr> <th> Action </th> <th> Card Number </th> <th> Active </th> <th> Defend </th> </tr>

                        </thead>
                        
                        <tbody>

                            <tr> <td> Hold On </td> <td> 1 </td> <td> Yes </td> <td> No </td> </tr>
                            <tr> <td> Pick Two </td> <td> 2 </td> <td> Yes </td> <td> No </td> </tr>
                            <tr> <td> Pick Three </td> <td> 5 </td> <td> Yes </td> <td> No </td> </tr>
                            <tr> <td> Suspension </td> <td> 8 </td> <td> Yes </td> <td> No </td> </tr>
                            <tr> <td> General Market </td> <td> 14 </td> <td> Yes </td> <td> No </td> </tr>

                        </tbody>

                    </table>

                </center>

            </div>
    )

}

export default Rules