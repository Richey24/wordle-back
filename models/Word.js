const mongoose = require('mongoose');
const wordSchema = mongoose.Schema({
	word: {
		type: String
	},
	count: {
		type: Number
	}
});


const Word = mongoose.model("Word", wordSchema);
module.exports = Word;