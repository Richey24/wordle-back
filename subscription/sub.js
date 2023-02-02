const { User } = require("../schema")

const stripe = require("stripe")(process.env.STRIPE_KEY)

const subUser = async (req, res) => {
    const { email, name, paymentMethod, plan } = req.body
    const customer = await stripe.customers.create({
        payment_method: paymentMethod.id,
        email: email,
        name: name,
        invoice_settings: {
            default_payment_method: paymentMethod.id
        }
    })
    await User.findOneAndUpdate({ email: email }, { customerID: customer.id })

    if (plan === "monthly") {
        const theSub = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ plan: process.env.MONTHLY }],
            expand: ["latest_invoice.payment_intent"]
        })
        const status = theSub.latest_invoice.payment_intent.status
        const clientSecret = theSub.latest_invoice.payment_intent.client_secret
        if (status !== "requires_action") {
            const oneMonthDate = new Date(new Date().setMonth(new Date().getMonth() + 1))
            await User.findOneAndUpdate({ email: email }, { expiryDate: oneMonthDate, paid: true })
        }
        res.status(200).json({ status: status, clientSecret: clientSecret })
    } else if (plan === "yearly") {
        const theSub = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ plan: process.env.YEARLY }],
            expand: ["latest_invoice_payment_intent"]
        })
        const status = theSub.latest_invoice.payment_intent.status
        const clientSecret = theSub.latest_invoice.payment_intent.client_secret
        if (status !== "requires_action") {
            const oneYearDate = new Date(new Date().setMonth(new Date().getMonth() + 12))
            await User.findOneAndUpdate({ email: email }, { expiryDate: oneYearDate, paid: true })
        }
        res.status(200).json({ status: status, clientSecret: clientSecret })
    }
}

module.exports = subUser