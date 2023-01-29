const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoutes");
const resetScore = require("./utils/cron");
const swordRoutes = require("./routes/swordRoutes");
const auditRoutes = require("./routes/auditRoutes");
const quizRoutes = require("./routes/quizRoutes");
const scoreRoutes = require("./routes/scoreRoutes");
const wordRoutes = require("./routes/wordRoute");
const subRoutes = require("./routes/subRoute");
require("dotenv").config({ path: ".env" })
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const port = process.env.PORT || 5000;

try {
    // mongoose.connect(process.env.MONGO_URL, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    // });
    app.listen(port, () => console.log(`listening at ${port}`));
    resetScore()
} catch (error) {
    console.log(error);
}

app.get("/", (req, res) => res.send("Hello world"))
app.use("/user", userRoute)
app.use("/sword", swordRoutes)
app.use("/audit", auditRoutes)
app.use("/quiz", quizRoutes)
app.use("/score", scoreRoutes)
app.use("/word", wordRoutes)
app.use("/sub", subRoutes)