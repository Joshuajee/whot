/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2021 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */



const mongoose = require("mongoose");


const agentSchema = new mongoose.Schema({ 
    agentName: {
        type: String,
        unique: [true, "Agent Name already exist"],
        required: [true, "Agent Name must have a name"],
        minlength: [3, "Name too short atleast 3 characters"],
        maxlength: [10, "Name too long atmost 10 characters"],
        default: 'Guest'
    },
    createdBy:{type: String, default: "Guest"}, 
    rounds: {type: Number, default: 0},
    canGoMarket: {type: Boolean, default: true},
    canNeedAnyCard: {type: Boolean, default: false},
    wins: {type: Number, default:0}, 
    losses: {type: Number, default: 0},
    points: {type: Number, default: 0}, 
    botRounds: {type: Number, default:0}, 
    botWins: {type: Number, default:0}, 
    botLosses: {type: Number, default: 0},
    botPoints: {type: Number, default: 0},
    humanRounds: {type: Number, default:0},  
    humanWins: {type: Number, default:0}, 
    humanLosses: {type: Number, default: 0},
    humanPoints: {type: Number, default: 0},
    learningRate: {type: Number, default: 0.01},
    useCardAtHand: {type: Boolean, default: false},
    useCardInPlay: {type: Boolean, default: false},
    useCardPlayed: {type: Boolean, default: false},
    useNoOfCardAtHand: {type: Boolean, default: false},
    useNoOfCardPlayed: {type: Boolean, default: false},
    useNoOfCardsInMarket: {type: Boolean, default: false},
    useNoOfCardsWithOpponent: {type: Boolean, default: false},
    useAvailableMove: {type: Boolean, default: true},
    useRules: {type: Boolean, default: true},   
    createdOn: {type: Date, default: Date.now}, 
}, { timestamps: true });

module.exports = mongoose.model("Users", agentSchema)