const Activity = require('../models/Activity');
const Level = require('../models/GameLevel');

/**
 * This function create game activie for each games
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.createActivity = async (req, res) => {

   const user = req.userData;

	// const activity = new Activity({
	// 	score: req.body.score,
	// 	levels: req.body.levels, // get user levels by user id
	// 	status: req.body.status,
	// 	game_id: req.body.game_id,
	// 	time: req.body.time 
	// });

  	// let data = await activity.save();
	res.status(201).json({data: user})
}

exports.getUserActivity = async (req, res) => {}

exports.getUserLevel    = async ( req,res ) => {}

