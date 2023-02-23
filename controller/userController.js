const { User } = require("../schema")
const UserScore = require("../models/UserScore");
const Activity = require("../models/Activity");

/**
 * This function login user information
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getUserInformation = async (req, res) => {

     const user = req.userData;
	 const info = await User.findById(user.id)

	 return await res.json(info);
}

exports.getUserGameData = async (req, res) => {
	 
	 const user = req.userData;

	 const today = new Date();

      // ✅ Get the first day of the current week (Sunday)
	 const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));

      // ✅ Get the last day of the current week (Saturday)
	 const lastDay = new Date(today.setDate(today.getDate() - today.getDay() + 6));

      //check if game level exist
	 const highScore = await UserScore.findOne({ user: user.id, created_at: {"$gte": firstDay.toISOString().split('T')[0], "$lt": lastDay.toISOString().split('T')[0]} }) 
	 
	 return await res.json(highScore);
}

exports.getAllUser = async (req, res) => {

	// const offset = req.body.offset;
	// const page = req.body.page;
	const users = await User.find({})
	return res.status(200).json({ users: users })
}

/**
 * This function limit user access per games if their not subscribe user the activity log
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.limitUserAccess = async(req, res) => {

	const game = 'Crossword Puzzle';
	const userId = req.userData.id;

	const user = await User.findById(userId);

	if (!user) {
	   return;
	}

	if (user.paid === false) {

		var min_date = new Date();
          var max_date = new Date();

		min_date.setHours(0,0,0,0);
		max_date.setHours(23,59,59,999);

	     const activity = await Activity.findOne({user_id: userId, date: { "$gte": min_date, "$lt": max_date}})
	     console.log(activity )
	     if (activity)  {
	     	
	     	let response = {
	     		paid: false,
	     		gamePlay: true

	     	}

	     	res.status(200).json(response)
	     	return
	     } else {

	     	let response = {
	     		paid: false,
	     		gamePlay: false
	     	}

	     	res.status(200).json(response)
	     	return
	     }
	}

	let response = {
		paid: true,
		gamePlay: true
	}

	res.status(200).json(response)
}