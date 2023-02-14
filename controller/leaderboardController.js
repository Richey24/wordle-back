const Activity = require("../models/Activity");
const { User } = require('../schema');


/**
 * This function get user leadboard for each week
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getWeeklyLeaderboards = async (req, res) => {

	let response = [];
	const users = await User.find({}).then((users) => {
	   users.forEach( async (values, keys) => {
	        const scores = await this.getWeeklyScores()
	        	let params = {
					username: values.username,
					email: values.email,
					tribe: values.tribe[0],
					country: values.country[0],
			   		score: scores
			  }

			response.push(params);
			
		})
	});

	// console.log(activities);

  

	console.log(response)

	res.status(201).json({response});
}

/**
 * This function get each user scores within a week
 * @param  {[type]} userId [description]
 * @return {[type]}        [description]
 */
exports.getWeeklyScores = async () => {
	new Promise(async (resolve, reject) => {
		let response = 10

		const activities = await Activity.find().then((res) => {
			res.forEach((values, keys) => {
				response = values.score
			})
		})
		console.log(response)
		resolve(response)
		return response
	})

} 