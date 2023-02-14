const mongoose = require('mongoose');
const activitySchema = mongoose.Schema({

	user_id: {
		type: mongoose.Schema.Types.Object,
		ref: "User"
	},

	score: {
		type: Number,
		required: [true, "User score is required"]
	}, 

	levels: {
		type: Number,
	    default: 1
	}, 

	date: {
		type: Date,
	},
	status: { type: Boolean },

	game: {
	   type: String
	},

	time: { type: Number }
});


const activity = mongoose.model("Activity", activitySchema);
module.exports = activity;
