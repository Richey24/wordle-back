const mongoose = require('mongoose');
const notificationSchema = mongoose.Schema({

	reciever: {
		type: mongoose.Schema.Types.Object,
		ref: "User"
	},

	sender: {
		type: mongoose.Schema.Types.Object,
		ref: "User"
	},

	created_at: {
		type: Date
	},

	content: {
		type: String
	},

	is_read: {
		type: Boolean,
    	default: false
	}
})

const notification = mongoose.model('Notification',notificationSchema)
module.exports = notification;