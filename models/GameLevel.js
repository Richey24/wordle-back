const mongoose = require('mongoose');
const gameLevelSchema = mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.Object,
		ref: "User"
	},
	game:{
		type: String
	},

	level: {
		type: Number
	}
});

const GameLevel = mongoose.model("GameLevel", gameLevelSchema);
module.exports = GameLevel;