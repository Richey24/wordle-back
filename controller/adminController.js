const { User }  = require('../schema');

// This function get dashboard statistic
exports.dashboard = async ( req, res) => {

	let response = []
	let countries  = []

	const onlineUser = await User.find({ onlineStatus: true })
	const totalUser = await User.find({})

	totalUser.forEach((values, keys) => {
		// check if in array
		if (!countries.includes(values.country[0])) {
			countries.push(values.country[0])
		}
	})

	res.status(201).json({ 
		onlineUsers: onlineUser.length, 
		userCount: totalUser.length, 
		countryCount: countries.length 
		// incentivesCount: 0
   })
}
