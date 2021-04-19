/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2021 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */



if(process.env.NODE_ENV === "production"){
    module.exports = {
        DataBaseURI: process.env.DATABASE_URI
    }
}else{
    module.exports = require("./dev")
}