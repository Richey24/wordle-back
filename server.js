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
const { Cart, User } = require("./schema");
const failedSubMail = require("./mail/failedSubMail");
require("dotenv").config({ path: ".env" })
const app = express()
const stripe = require("stripe")(process.env.STRIPE_KEY)

// app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
    if (req.originalUrl === '/webhook') {
        next();
    } else {
        express.json()(req, res, next);
    }
});

try {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
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

const YOUR_DOMAIN = "http://localhost:3000/subscription"

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
            console.log(session);
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
            failedSubMail(customer.email)
            break
        }
        case "invoice.payment_succeeded": {
            const invoice = event.data.object;
            const user = await User.find({ customerID: invoice.customer })
            const expiryDate = user.plan === "monthly" ? new Date(new Date().setMonth(new Date().getMonth() + 1)) : new Date(new Date().setMonth(new Date().getMonth() + 12))
            await User.findOneAndUpdate({ customerID: invoice.customer }, { expiryDate: expiryDate })
        }
        case "invoice.payment_failed": {
            const invoice = event.data.object;
            const user = await User.find({ customerID: invoice.customer })
            failedSubMail(user.email)
        }
        default:
            break;
    }
})