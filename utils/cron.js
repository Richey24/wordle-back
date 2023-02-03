const cron = require("node-cron")
const { User, Score } = require("../schema")

const resetScore = () => {
    cron.schedule("5 8 * * 0", async () => {
        const users = await User.find({})
        users.forEach(async (user) => {
            await User.findByIdAndUpdate(user._id, { dailyWQS: 0 })
            await User.findByIdAndUpdate(user._id, { dailyBQS: 0 })
            await User.findByIdAndUpdate(user._id, { dailyHS: 0 })
            await User.findByIdAndUpdate(user._id, { playedHang: false })
            await User.findByIdAndUpdate(user._id, { playedTrivial: false })
            await User.findByIdAndUpdate(user._id, { playedBible: false })
        })
        await Score.deleteMany({})
    })
}

module.exports = resetScore