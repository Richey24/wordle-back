const Activity = require('../models/Activity');
const Level = require('../models/GameLevel');
const UserScore = require('../models/UserScore')
/**
 * This function create game activie for each games
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.createActivity = async (req, res) => {

	let response = false;

   let score = await this.calculateScore(req.body.levels, req.body.time, req.body.score);
   let user = req.userData

   console.log(user)

	const activity = new Activity({
		user_id: user.id,
		score: score,
		levels: req.body.levels,
		status: req.body.status,
		game: req.body.game,
		time: req.body.time,
		date: new Date(),
	});

	let data = await activity.save();

	if (req.body.status) {
	   console.log('check status')
		response = await this.levelUserUp(user.id, req.body.game)
	}

	res.status(201).json({data: data, levels: response})     
}

/**
 * This function all gaming acivities
 * TODO: pagination is need 
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getActivity = async (req, res) => {

	const activities = await Activity.find({}).populate("user_id");

	console.log(activities)
	res.status(201).json({activities});
}

exports.updateHighScore = async () => {

	const weekly = []

	const today = new Date();

	// ✅ Get the first day of the current week (Sunday)
	const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));

	// ✅ Get the last day of the current week (Saturday)
	const lastDay = new Date(today.setDate(today.getDate() - today.getDay() + 6));

	console.log(firstDay); // 👉️ Sunday August 7 2022
	console.log(lastDay); // 👉️ Saturday August 13 202

	const highScore = UserScore.findOne({user_id: userId}, (err, obj) => {
		if (obj === null) {
			console.log("create highscores")
			
		}
	})

	const highscore = prototype.find({})
}

exports.getUserLevel  = async ( req,res ) => {}

/**
 * This function calculate the user score
 * @param  {[type]} levels        [description]
 * @param  {[type]} timeCompleted [description]
 * @param  {[type]} score         [description]
 * @return {[type]}               [description]
 */
exports.calculateScore = async function(levels, timeCompleted, score) {

	let result = 0;

	if (levels <= 5 ) {
		result = parseInt(timeCompleted) + parseInt(score)
	}

	if (levels > 5 && levels < 11) {
		result = ( parseInt(timeCompleted) * 2 ) + parseInt(score);
	}

	if (levels > 10 && levels < 16) {
		result = ( parseInt(timeCompleted) * 3 ) + parseInt(score);
	}

	console.log(result)
	return result;
}

/**
 * This function check if the user game level exist then create or update
 * @return {[type]} [description]
 */
exports.levelUserUp = async (userId, game) => {

	//check if game level exist
	const level = Level.findOne({user_id: userId},  function(err, obj) { 
		console.log(obj)

		 if (obj === null) {
			 	console.log('creating levels data')
				const gameLevel = new Level({
					user_id: userId,
					game: game,
					level: 1,
				});
				gameLevel.save();
		 } else {
		 			console.log('updating user data')
			 	const gameLevel = Level.findByIdAndUpdate(obj._id, {
					level: obj.level + 1
				}, (err, data) => {
					console.log(err)
					console.log(data)
				})
				gameLevel.updateOne();
		 }
	  }
	)

}