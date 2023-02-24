const Notification = require('../models/Notification');

/**
 * this function generates new notrifications
 * @param  {[type]} userID  [description]
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
exports.createNotification = async (userID, message) => {

	const notify = new Notification({
		user: userID,
		created_at: new Date(),
		reciever: userID,
		content: message,
		sender: adminID,
	})

	notify.save();
}

/**
 * This functiong et user notification
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getUserNotification = async(req, res) => {

	const user = req.userData();
	const notifications = Notification.find({ user: user._id, is_read: false })

	res.status(201).json(notifications);
}

/**
 * This function read user notification
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.readNotification = async(req, res) => {

	const user = req.userData();
	const notification = Notification.findOneAndUpdate(notificationID, {
		is_read: true
	});

	let update = notification.updateOne();

	res.status(201).json(update);
}


