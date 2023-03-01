const mongoose = require('mongoose');
const userScoreSchema = mongoose.Schema({

	user: {
		type: mongoose.Schema.Types.Object,
		ref: "User"
	},

	game: {
		type: String
	},

	created_at: {
		type: Date,
	},

	score: {
		type: Number
	}, 

	game_level: {
		type: Number
	}
})

const userScore = mongoose.model('UserScore', userScoreSchema);
module.exports = userScore;
