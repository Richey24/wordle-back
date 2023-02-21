const mongoose = require('mongoose');
const winnerSchema = mongoose.Schema({

	user: {
		type: mongoose.Schema.Types.Object,
		ref: "User"
	},

	date: {
		type: Date,
		required: [ true ]
	},

	rank: {
		type: Number,
	}
})

const winner = mongoose.model('Winner', winnerSchema);
module.exports = winner;