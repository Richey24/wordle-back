const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoutes");
require("dotenv").config({ path: ".env" })
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const port = process.env.PORT || 5000;

try {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    app.listen(port, () => console.log(`listening at ${port}`));
} catch (error) {
    console.log(error);
}

app.get("/", (req, res) => res.send("Hello world"))
app.use("/user", userRoute)
