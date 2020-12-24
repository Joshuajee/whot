const mongoose = require("mongoose");
const states = require("./states");



var agentSchema = new mongoose.Schema({ 
    agentName: {type: String, default: "unknown"},
    createdBy:{type: String, default: "Guest"}, 
    wins: {type: Number, default:0}, 
    losses: {type: Number, default: 0},
    rewards: {type: Number, default: 0},  
    createdOn: {type: Date, default: Date.now}, 
    states:[states]
});

module.exports = mongoose.model("agents", agentSchema)