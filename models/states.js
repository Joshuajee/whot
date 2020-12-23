const mongoose = require("mongoose")


//schema for state as a subdocument of agent
var stateSchema = new mongoose.Schema({ 
    cardAtHand:{type:Array, default:[]},
    cardInPlay:{type:Array, default:[]},
    actions:{type:Array, default:[]},
    rules: {type: Array, default: []}, 
    createdOn: {type: Date, default: Date.now}, 
    lastUpdatedOn: {type: Date, default: Date.now}, 
});

module.exports =  stateSchema