const Activity = require('../models/Activity');
const Level = require('../models/GameLevel');
const UserScore = require('../models/UserScore')
const Notification = require('../models/Notification');
const { User } = require('../schema');

/**
 * This function create game activie for each games
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.createActivity = async (req, res) => {

	let response = false;

   let score = await this.calculateCrosswordScore(req.body.levels, req.body.time, req.body.score);
   let user = req.userData


	const activity = new Activity({
		user_id: user.id,
		score: score,
		levels: req.body.levels,
		status: req.body.status,
		game: req.body.game,
		time: req.body.time,
		date: new Date().toISOString().split('T')[0],
	});

	let data = await activity.save();

	if (req.body.status) {
	   console.log('check status')
		response = await this.levelUserUp(user.id, req.body.game, score)
	}

	const message = req.body.game+" played, score is "+score;
   const noti = await this.createNotification(user.id, message)

	res.status(201).json({data: data, levels: response})     
}

/**
 * this function generates new notrifications
 * @param  {[type]} userID  [description]
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
exports.createNotification = async (userID, message) => {

	const user = User.findOne({ admin: true })

	const notify = new Notification({
		created_at: new Date(),
		reciever: userID,
		content: message,
		sender: user._id,
	})

	notify.save();
}



/**
 * This function all gaming acivities
 * TODO: pagination is need 
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getActivity = async (req, res) => {

	const activities = await Activity.find({}).populate("user_id").sort({date: -1});

	console.log(activities)
	res.status(201).json({activities});
}


exports.getUserLevel  = async ( req,res ) => {}

/**
 * This function calculate the user score
 * @param  {[type]} levels        [description]
 * @param  {[type]} timeCompleted [description]
 * @param  {[type]} score         [description]
 * @return {[type]}               [description]
 */
exports.calculateCrosswordScore = async function(levels, timeCompleted, score) {

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
 * [description]
 * @param  {[type]} level         [description]
 * @param  {[type]} timeCompleted [description]
 * @param  {[type]} score         [description]
 * @return {[type]}               [description]
 */
exports.calculateWordleScore = async function (level, timeCompleted, score) {

}

/**
 * This function check if the user game level exist then create or update
 * @return {[type]} [description]
 */
exports.levelUserUp = async (userID, game, score) => {

	const today = new Date();
	const parseDate = today.toISOString().split('T')[0];

   // ✅ Get the first day of the current week (Sunday)
	const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));

   // ✅ Get the last day of the current week (Saturday)
	const lastDay = new Date(today.setDate(today.getDate() - today.getDay() + 6));

   //check if game level exist
	const highScore = await UserScore.findOne({ user: userID, created_at: {"$gte": firstDay.toISOString().split('T')[0], "$lt": lastDay.toISOString().split('T')[0]} }) 
	
	if ( highScore === null ) {
		const saveHighScore = new UserScore({
			user: userID,
			game: game,
			created_at: parseDate,
			game_level: 1,
			score: score
		});

		saveHighScore.save();
	} else {
	      console.log('updating user data')
		 	const updateHighscore =  UserScore.findByIdAndUpdate(highScore._id, {
				game_level: highScore.game_level + 1,
				score: highScore.score + parseInt(score)
			}, (err, data) => {
				console.log(err)
				console.log(data)
			})

			let update = updateHighscore.updateOne();

	}

	return true;
}