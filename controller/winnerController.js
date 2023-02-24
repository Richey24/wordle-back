const UserScore = require('../models/UserScore')
const Winner = require('../models/Winners');

exports.getWeeklyWinners = async (req, res) => {

    var date = new Date();

    if (req.body.date === undefined) {
        const date = new Date();
        const firstDay = new Date(date.setDate(date.getDate() - date.getDay()));
		const lastDay = new Date(date.setDate(date.getDate() - date.getDay() + 6));
		const winners = await Winner.find({ date: {"$gte": firstDay.toISOString().split('T')[0], "$lt": lastDay.toISOString().split('T')[0]} })
		res.status(200).json(winners);
    } else {
    	const date = new Date(req.body.date);
        const firstDay = new Date(date.setDate(date.getDate() - date.getDay()));
		const lastDay = new Date(date.setDate(date.getDate() - date.getDay() + 6));
		const winners = await Winner.find({ date: {"$gte": firstDay.toISOString().split('T')[0], "$lt": lastDay.toISOString().split('T')[0]} })
		res.status(200).json(winners);
    }

}


exports.weeklyWinner = async () => {

	console.log('RUNNING WEEKLY WINNSER')
	
	const today = new Date();
	const parseDate = today.toISOString().split('T')[0];

   // ✅ Get the first day of the current week (Sunday)
	const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));

   // ✅ Get the last day of the current week (Saturday)
	const lastDay = new Date(today.setDate(today.getDate() - today.getDay() + 6));

   //check if game level exist
	const highScore = await UserScore.find({ created_at: {"$gte": firstDay.toISOString().split('T')[0], "$lt": lastDay.toISOString().split('T')[0]} })

	const saveWinners = highScore.forEach((values, keys) => {

		const winner = new Winner({
			user: values.user,
			date: parseDate,
			rank: keys + 1
		});

		winner.save();
	})

	return saveWinners;
}
