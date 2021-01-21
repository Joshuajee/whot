const mongoose = require("mongoose");


var agentSchema = new mongoose.Schema({ 
    agentName: {type: String, default: "unknown"},
    createdBy:{type: String, default: "Guest"}, 
    wins: {type: Number, default:0}, 
    losses: {type: Number, default: 0},
    points: {type: Number, default: 0},  
    botWins: {type: Number, default:0}, 
    botLosses: {type: Number, default: 0},
    botPoints: {type: Number, default: 0},  
    humanWins: {type: Number, default:0}, 
    humanLosses: {type: Number, default: 0},
    humanPoints: {type: Number, default: 0},  
    createdOn: {type: Date, default: Date.now}, 
});

module.exports = mongoose.model("agents", agentSchema)