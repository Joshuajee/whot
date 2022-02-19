const catchAsync = require("./catchAsync");
const guest = require("./../cards/user.json");
const { GamePlaying } = require("./../game_env/gameStart");
const Agents = require("./../models/agents");


exports.game = catchAsync(async(req, res, next) => {
  

    const agent = Agents.findOne({ agentName: req.body.agentName });

    if (!agent) return

    const gameStart = new GamePlaying(req.body.user, req.body.agentName, req.body.rules, [guest, agent], 0, 1)

    req.game = gameStart;

    next();

});