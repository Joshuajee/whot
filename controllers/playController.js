const catchAsync = require("./../utils/catchAsync");
const Agents = require("./../models/agents");


//this route starts the game
exports.start = (req, res) => {
    console.log(req.body.rules)
    req.game.startGame(req.body.rules, res, req.body.start)
};

//this route plays the game
exports.play = (req, res) => {
    req.game.humanPlay(req.body, res);
};

//this route plays the game
exports.save = (req, res) => {
    req.game.save(req.body, res);
};

//this route fetch the Agents  from leaderboard
exports.agents  = catchAsync(async(req, res) =>{

    let skip = parseInt(req.params.skip)

    Agents.find().select("agentName wins losses points createdBy createdOn").sort("-points").limit(20).skip(skip)
    .exec((error, response)=>{
        console.log(response)
        res.send(response)
    })

});

exports.agents = catchAsync(async(req, res) => {

    const agents = await Agents.find();

    res.json({status: 'success', data: agents});

});

exports.createAgent = catchAsync(async(req, res, next) => {

    let agentData = req.body.agent 

    const agent = await Agents.findOne({agentName:agentData.agentName});

    if (agent) return

    await Agents.create({
        agentName: agentData.agentName,
        canGoMarket: agentData.canGoMarket,
        canNeedAnyCard: agentData.canNeedAnyCard,
        useCardAtHand: agentData.cardAtHand,
        useNoOfCardAtHand: agentData.noOfCardAtHand,
        useCardInPlay: agentData.cardInPlay,
        useCardPlayed: agentData.cardPlayed,
        useNoOfCardPlayed: agentData.noOfCardPlayed,
        useNoOfCardsInMarket: agentData.noOfCardsInMarket,
        useNoOfCardsWithOpponent: agentData.noOfCardsWithOpponent,
        useAvailableMove: agentData.availableMove,
        useRules: agentData.rules,
    })

    res.json({msg: "Agent Saved", "success": true})

});

exports.leaderboard = catchAsync(async (req, res, next) =>{

    const skip = parseInt(req.params.skip)

    const agents =  await Agents.find().select("agentName wins losses points createdBy createdOn").sort("-points").limit(20).skip(skip);
    
    res.json({ status: "success", data: agents});

});