const mongoose = require("mongoose")


//schema for state as a subdocument of agent
var stateSchema = new mongoose.Schema({ 
    cardAtHand:{type:Array, default:[]},
    cardInPlay:{type:String, default:""},
    cardPlayed:{type:Array, default:[]},
    noOfCardsInMarket:{type:Number, default:0},
    actions:{type:Array, default:[]},
    rules: {type: Array, default: []}, 
    createdOn: {type: Date, default: Date.now}, 
    lastUpdatedOn: {type: Date, default: Date.now}, 
});

module.exports =  stateSchema