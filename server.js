const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose");
const cron = require("node-cron");

const resetScore = require("./utils/cron");
const { Cart, User } = require("./schema");
const failedSubMail = require("./mail/failedSubMail");
const Seeder = require('./seeders/wordsSeeder');
const http = require('http');
const app = express()
const { Server } = require("socket.io");
const port = process.env.PORT || 5000;

require("dotenv").config({ path: ".env" })

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use((req, res, next) => {
    if (req.originalUrl === '/webhook') {
        next();
    } else {
        express.json()(req, res, next);
    }
});

// Remove Try and catch block, moongoose has its own functionality for catching error
// Try, Catch was an over engineering
mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(() => {
        console.log("Database is connected");
    })
    .catch(err => {
        console.log({ database_error: err });
    });


const server = app.listen(port, () => {
    console.log('Application started on port 5000!');
});

// Socket IO funtionality that tracks online users
const socketIo = new Server(server, {
    cors: {
        origin: '*', // Allow any origin for testing purposes. This should be changed on production.
    },
});


const users = {};
socketIo.on('connection', (socket) => {

    // Read message recieved from client.
    socket.on('login', (userId) => {
        console.log(userId)

        const user = User.findByIdAndUpdate(userId, { onlineStatus: true }, (err, data) => {
            console.log(err)
            console.log(data)
        })

        const response = user.updateOne()
        users[socket.id] = userId;
    });


    socket.on('disconnect', (userId) => {
        console.log('disconnect user')
        console.log('disconneted user: ' + users[socket.id])
        // console.log('user ' + userId + ' disconnected');
        const user = User.findByIdAndUpdate(users[socket.id], { onlineStatus: false }, (err, data) => {
            console.log(err)
            console.log(data)
        })
        const response = user.updateOne()

        // remove saved socket from users object
        delete users[socket.id];
    });
});
// End Socket IO functionality

resetScore()


// Routes
const activityRoutes = require('./routes/activityRoutes');
const leaderRoutes = require('./routes/leaderboardRoutes');
const scoreRoutes = require("./routes/scoreRoutes");
const swordRoutes = require("./routes/swordRoutes");
const auditRoutes = require("./routes/auditRoutes");
const quizRoutes = require("./routes/quizRoutes");
const wordRoutes = require("./routes/wordRoute");
const userRoute = require("./routes/userRoutes");
const subRoutes = require("./routes/subRoute");
const adminRoutes = require("./routes/adminRoutes");
const winnerRoutes = require('./routes/winnerRoutes');
const notificationRoutes = require('./routes/notificationRoutes')
const hebrewRoutes = require('./routes/hebrewRoutes')

app.get("/", (req, res) => res.send("Hello world"))
app.use("/user", userRoute)
app.use("/sword", swordRoutes)
app.use("/audit", auditRoutes)
app.use("/quiz", quizRoutes)
app.use("/score", scoreRoutes)
app.use("/word", wordRoutes)
app.use("/sub", subRoutes)
app.use("/hebrew", hebrewRoutes)

app.use("/api/user", userRoute)
app.use("/api/activities", activityRoutes)
app.use("/api/leaderboard", leaderRoutes)
app.use('/api/highscores', activityRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/weekly-winners', winnerRoutes)
app.use('/api/gameplay-count', userRoute)
app.use('/api/notifications', notificationRoutes)

//Stripe 
const stripe = require("stripe")(process.env.STRIPE_KEY)
const YOUR_DOMAIN = "https://israelbiblecamp.world/subscription"

app.post('/create-checkout-session', async (req, res) => {
    const { email, plan, id } = req.query
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: plan === "monthly" ? process.env.MONTHLY : process.env.YEARLY,
                quantity: 1,
            },
        ],
        mode: 'subscription',
        success_url: `${YOUR_DOMAIN}?success=true`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });
    await Cart.create({ sessionID: session.id, email: email, plan: plan, userID: id })

    res.redirect(303, session.url);
});


app.post("/cancel/sub/:id", async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({ message: "id is required" })
        }
        const user = await User.findById(id)
        await User.findByIdAndUpdate(id, { subscriptionID: "" })
        await stripe.subscriptions.update(user.subscriptionID, { cancel_at_period_end: true })
        return res.status(200).json({ message: "subscription cancelled successfully" })
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
})

app.post("/webhook", express.raw({ type: 'application/json' }), async (req, res) => {
    const payload = req.body;
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(payload, sig, process.env.endpointSecret);
    } catch (err) {
        console.log(err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object;
            if (session.payment_status === 'paid') {
                const customer = await Cart.findOne({ sessionID: session.id })
                const expiryDate = customer.plan === "monthly" ? new Date(new Date().setMonth(new Date().getMonth() + 1)) : new Date(new Date().setMonth(new Date().getMonth() + 12))
                await User.findOneAndUpdate({ email: customer.email }, { paid: true, expiryDate: expiryDate, customerID: session.customer, subscriptionID: session.subscription, plan: customer.plan })
            }
            break;
        }
        case "checkout.session.async_payment_succeeded": {
            const session = event.data.object;
            const customer = await Cart.findOne({ sessionID: session.id })
            const expiryDate = customer.plan === "monthly" ? new Date(new Date().setMonth(new Date().getMonth() + 1)) : new Date(new Date().setMonth(new Date().getMonth() + 12))
            await User.findOneAndUpdate({ email: customer.email }, { paid: true, expiryDate: expiryDate, customerID: session.customer, subscriptionID: session.subscription, plan: customer.plan })
        }
        case "checkout.session.async_payment_failed": {
            const session = event.data.object;
            const customer = await Cart.findOne({ sessionID: session.id })
            // failedSubMail(customer.email)
            break
        }
        case "invoice.payment_succeeded": {
            const invoice = event.data.object;
            const user = await User.findOne({ customerID: invoice.customer })
            const expiryDate = user.plan === "monthly" ? new Date(new Date().setMonth(new Date().getMonth() + 1)) : new Date(new Date().setMonth(new Date().getMonth() + 12))
            await User.findOneAndUpdate({ customerID: invoice.customer }, { expiryDate: expiryDate })
        }
        case "invoice.payment_failed": {
            const invoice = event.data.object;
            const user = await User.findOne({ customerID: invoice.customer })
            // failedSubMail(user.email)
        }
        case "customer.subscription.deleted": {
            const session = event.data.object;
            await User.findOneAndUpdate({ customerID: session.customer }, { paid: false, customerID: "" })
        }
        default:
            break;
    }
})

// Cron Job functionality 
const winnerController = require('./controller/winnerController');

cron.schedule("* * * * * 6", function () {
    console.log("---------------------");
    winnerController.weeklyWinner()
});

