const express = require("express");
const playController = require("../controllers/playController");
const { game } = require("../utils/middleWares");

const router = express.Router();

router.route("/create-agent").post(playController.createAgent);
router.route("/leaderboard/:skip").get(playController.leaderboard);
router.route("/agents").get(playController.agents);

router.use(game);

router.route("/start").post(playController.start);
router.route("/play").post(playController.play);
router.route("/save").post(playController.save);


module.exports = router;
