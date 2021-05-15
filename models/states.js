/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2021 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */


const mongoose = require("mongoose")


//schema for state as a subdocument of agent
var stateSchema = new mongoose.Schema({ 
    agentName: {type: String, default:"Guest"},
    cardAtHand: {type: Array},
    cardInPlay: {type: String},
    cardPlayed: {type: Array},
    noOfCardAtHand: {type: Number},
    noOfCardPlayed: {type: Number},
    noOfCardsInMarket: {type: Number},
    noOfCardsWithOpponent: {type: Number},
    availableMove: {type: Array},
    actions: {type: Array, default:[]},
    rules: {type: Object, default: {"holdOn":{"active":true, "card":1, "defend":false},
                                    "pickTwo":{"active":true, "card":2, "defend":false},
                                    "pickThree":{"active":true, "card":5, "defend":false}, 
                                    "suspension":{"active":true, "card":8, "defend":false},
                                    "generalMarket":{"active":true, "card":14, "defend":false}
                                }, 
    createdOn: {type: Date, default: Date.now()}, 
    lastUpdatedOn: {type: Date, default: Date.now()}
    }
})

module.exports = (name) => mongoose.model(name + "_states", stateSchema)


/*

//schema for state as a subdocument of agent
var stateSchema = new mongoose.Schema({ 
    agentName:{type:String, default:"Guest"},
    cardAtHand:{type:Array, default:[]},
    cardInPlay:{type:String, default:""},
    cardPlayed:{type:Array, default:[]},
    noOfCardsInMarket:{type:Number, default:0},
    noOfCardsWithOpponent:{type:Number, default:0},
    availableMove:{type:Array, default:[]},
    actions:{type:Array, default:[]},
    rules: {type: Object, default: {"holdOn":{"active":true, "card":1, "defend":false},
                                    "pickTwo":{"active":true, "card":2, "defend":false},
                                    "pickThree":{"active":true, "card":5, "defend":false}, 
                                    "suspension":{"active":true, "card":8, "defend":false},
                                    "generalMarket":{"active":true, "card":14, "defend":false}
                                }, 
    createdOn: {type: Date, default: Date.now}, 
    lastUpdatedOn: {type: Date, default: Date.now}
    }
})

*/