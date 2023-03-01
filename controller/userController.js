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
exports.limitUserAccess = async (req, res) => {

	var response = false

	const game = 'Crossword Puzzle';
	const userId = req.userData.id;

	const user = await User.findById(userId);

	if (!user) {
	   return;
	}
	
	const todayStart = new Date(new Date().setHours(0, 0, 0, 0)).toISOString()
	const todayEnd   = new Date(new Date().setHours(23, 59, 59, 999)).toISOString()

	// get activities within the current day
     const activities = await Activity.find({user_id: userId, date: { "$gte": todayStart, "$lt": todayEnd }})

     if (activities.length > 0) {
     	response = {
     		paid: user.paid,
	     	gamePlay: true
     	}
     } else {
     	response = {
     		paid: user.paid,
	     	gamePlay: false
     	}
     }

	res.status(200).json(response)
}

/**
 * This function register yser
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.registerUser = async ( req, res) => {

	   console.log(req.body);
	   const body = req.body;

	   if (!body.username || !body.password || !body.email) {
	       return res.status(400).json({ message: "Send all required information" })
	   }
	   const check = await User.findOne({ email: body.email })
	   if (check) {
	       return res.status(419).json({ message: "This email is already registered" })
	   }
	   const unique = await User.findOne({ username: body.username })
	   if (unique) {
	       return res.status(203).json({ message: "Username already taken" })
	   }

	   const pass = await argon2.hash(body.password)
        body.password = pass
        body.createdAt = new Date()
        const user = await User.create(body)
        const token = jwt.sign({ id: user._id }, "rich", { expiresIn: "10h" })
        const mainUser = await User.findByIdAndUpdate(user._id, { mainToken: token }, { new: true }).select("-password")
        await confirmMail(user.email, user._id, user.firstName)
        res.status(200).json(mainUser)
}



