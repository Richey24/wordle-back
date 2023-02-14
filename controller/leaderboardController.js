const { User } = require('../schema');
const UserScore = require('../models/UserScore');

/**
 * This function get user leadboard for each week
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getWeeklyLeaderboards = async (req, res) => {

  	const today = new Date();
	const parseDate = today.toISOString().split('T')[0];

   // ✅ Get the first day of the current week (Sunday)
	const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));

   // ✅ Get the last day of the current week (Saturday)
	const lastDay = new Date(today.setDate(today.getDate() - today.getDay() + 6));

	if (req.body.offset) {
		const highScore = await UserScore.find({ created_at: {"$gte": firstDay.toISOString().split('T')[0], "$lt": lastDay.toISOString().split('T')[0]} }).sort({ score: -1 }) 
	}
	
	const highScore = await UserScore.find({ created_at: {"$gte": firstDay.toISOString().split('T')[0], "$lt": lastDay.toISOString().split('T')[0]} }).sort({ score: -1 })
	res.status(201).json({ leadboard: highScore})
}

