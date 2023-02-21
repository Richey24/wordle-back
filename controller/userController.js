const { User } = require("../schema")
const UserScore = require("../models/UserScore");

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