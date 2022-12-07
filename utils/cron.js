const cron = require("node-cron")
const User = require("../schema")

const resetScore = () => {
    cron.schedule("0 0 * * *", async () => {
        const users = await User.find({})
        users.forEach(async (user) => {
            await User.findByIdAndUpdate(user._id, { dailyWQS: 0 })
            await User.findByIdAndUpdate(user._id, { dailyBQS: 0 })
            await User.findByIdAndUpdate(user._id, { dailyBGS: 0 })
            await User.findByIdAndUpdate(user._id, { dailyHS: 0 })
        })
    })
}

module.exports = resetScore