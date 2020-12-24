const mongoose = require("mongoose")


//schema for state as a subdocument of agent
var stateSchema = new mongoose.Schema({ 
    cardAtHand:{type:Array, default:[]},
    cardInPlay:{type:String, default:""},
    cardPlayed:{type:Array, default:[]},
    noOfCardsInMarket:{type:Number, default:0},
    noOfCardsWithOpponent:{type:Number, default:0},
    availableMove:{type:Array, default:[]},
    actions:{type:Array, default:[]},
    rules: {type: Object, default: {"holdOn":true, 
                                    "pickTwo":true, 
                                    "pickThree":true, 
                                    "suspension":true,
                                    "generalMarket":true, 
                                    "need":true, 
                                    "endGame":true}}, 
    createdOn: {type: Date, default: Date.now}, 
    lastUpdatedOn: {type: Date, default: Date.now}, 
});

module.exports =  stateSchema